import styles from "./AdvertsPage.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Advert from "./components/Advert";
import EmptyList from "./components/EmptyAdsList";
import FilterCase from "../../components/shared/FilterCase";
import SelectMenu from "../../components/shared/SelectMenu";
import Button from "../../components/shared/Button";
import SliderRange from "../../components/shared/SliderRange";
import { useDispatch, useSelector } from "react-redux";
import {
  calculateMaxMinPricesAvailable,
  loadAdverts,
  uiResetError,
} from "../../store/actions";
import {
  getListOfAds,
  getMaxPrice,
  getMinPrice,
  getUi,
} from "../../store/selectors";

function AdvertsPage() {
  const dispatch = useDispatch();
  const adverts = useSelector(getListOfAds);
  const { error } = useSelector(getUi);
  const maxPriceAvailable = useSelector(getMaxPrice);
  const minPriceAvailable = useSelector(getMinPrice);

  const [filteredAdverts, setFilteredAdverts] = useState([]);
  const [filterByName, setFilterByName] = useState("");
  const [filterByTag, setFilterByTag] = useState([]);
  const [filterByMaxPrice, setFilterByMaxPrice] = useState(maxPriceAvailable);
  const [filterByMinPrice, setFilterByMinPrice] = useState(minPriceAvailable);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(calculateMaxMinPricesAvailable(adverts));
    setLoading(false);

    if (!loading) {
      setFilterByMaxPrice(maxPriceAvailable);
      setFilterByMinPrice(minPriceAvailable);
    }
  }, [dispatch, adverts, loading, maxPriceAvailable, minPriceAvailable]);

  const resetError = () => {
    dispatch(uiResetError());
  };

  const handleFilterByName = (event) => {
    setFilterByName(event.target.value);
  };

  const handleFilterByTag = (event) => {
    event.preventDefault();
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );

    setFilterByTag(selectedOptions);
  };

  const handleFilterByPriceRange = (event) => {
    setFilterByMinPrice(event[0]);
    setFilterByMaxPrice(event[1]);
  };

  const resetFilters = () => {
    setFilterByName("");
    setFilterByTag([]);
    setFilterByMaxPrice(maxPriceAvailable);
    setFilterByMinPrice(minPriceAvailable);
  };

  useEffect(() => {
    dispatch(loadAdverts());
  }, [dispatch]);

  useEffect(() => {
    if (adverts.length) {
      const filteredAds = adverts.filter((advert) => {
        const resultByName = advert.name
          .toLowerCase()
          .includes(filterByName.toLowerCase());

        const resultByTag =
          filterByTag.length === 0 ||
          filterByTag.every((tag) => advert.tags.includes(tag));
        const resultByPriceRange =
          advert.price <= filterByMaxPrice && advert.price >= filterByMinPrice;

        return resultByName && resultByTag && resultByPriceRange;
      });

      setFilteredAdverts(filteredAds);
    }
  }, [adverts, filterByName, filterByTag, filterByMaxPrice, filterByMinPrice]);

  return (
    <Layout title="List of adverts">
      <div>{loading && <div className="Nodepop-loading">Loading...</div>}</div>
      <section className={styles.filtersSection}>
        <h3>Filters section</h3>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Filter by name:</label>
          <FilterCase
            value={filterByName}
            onChange={handleFilterByName}
            placeholder="Filter by name"
          />
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Filter by category:</label>
          <SelectMenu
            onChange={handleFilterByTag}
            className={styles.filterInput}
            multiple
          />
        </div>
        <label className={styles.filterLabel}>Filter by price:</label>
        <SliderRange
          min={minPriceAvailable}
          max={maxPriceAvailable}
          value={[filterByMinPrice, filterByMaxPrice]}
          className={styles.sliderRange}
          label={`Min price: ${filterByMinPrice} € - Max price: ${filterByMaxPrice} €`}
          onChange={handleFilterByPriceRange}
          allowCross={false}
        ></SliderRange>
        <Button onClick={resetFilters}>Reset filters</Button>
      </section>
      <section>
        {adverts.length ? (
          <ul className={styles.advertsList}>
            {filteredAdverts.map(({ id, photo, ...advert }) => (
              <li key={id}>
                <Link to={`/adverts/${id}`}>
                  <Advert {...advert} />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyList />
        )}
      </section>
      <div>
        {error && (
          <div
            className="Nodepop-error"
            onClick={resetError}
          >{`${error}. Click this banner to get back`}</div>
        )}
      </div>
    </Layout>
  );
}

export default AdvertsPage;
