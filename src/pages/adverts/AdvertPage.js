import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Advert from "./components/Advert";
import { useDispatch, useSelector } from "react-redux";
import { getAdDetail, getUi } from "../../store/selectors";
import { loadAdvert, uiResetError } from "../../store/actions";
import DeleteAdvert from "./components/DeleteAdvert";

function AdvertPage() {
  const { advertId } = useParams();

  const advert = useSelector((state) => getAdDetail(state, advertId));

  const dispatch = useDispatch();

  const { error } = useSelector(getUi);

  const resetError = () => {
    dispatch(uiResetError());
  };

  useEffect(() => {
    dispatch(loadAdvert(advertId));
  }, [advertId, dispatch]);

  return (
    <Layout title="Advert info">
      {advert && (
        <Advert
          id={advertId}
          name={advert.name}
          price={advert.price}
          sale={advert.sale}
          tags={advert.tags}
          photo={advert.photo}
          showImage={true}
        />
      )}
      <DeleteAdvert advertId={advertId} />
      {error && (
        <div
          className="Nodepop-error"
          onClick={resetError}
        >{`${error}. Click this banner to get back`}</div>
      )}
    </Layout>
  );
}
export default AdvertPage;
