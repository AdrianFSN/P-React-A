import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteAd } from "./service";
import Layout from "../../components/layout/Layout";
import Advert from "./components/Advert";
import Button from "../../components/shared/Button";
import { useDispatch, useSelector } from "react-redux";
import { getAdDetail } from "../../store/selectors";
import { loadAdvert, deleteAdvert } from "../../store/actions";

function AdvertPage() {
  const { advertId } = useParams();

  const advert = useSelector((state) => getAdDetail(state, advertId));

  const dispatch = useDispatch();

  const [error, setError] = useState(null);

  const resetError = () => {
    setError(null);
  };

  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const [deletionRequest, setDeletionRequest] = useState(false);

  const showConfirmDeletion = () => {
    setConfirmDeletion(true);
  };
  const requestDeletion = () => {
    setDeletionRequest(true);
    setTimeout(() => {
      handleAdDeletion();
    }, 2000);
  };
  const cancelDeletion = () => {
    setConfirmDeletion(false);
  };

  const handleAdDeletion = async () => {
    dispatch(deleteAdvert(advert.id));
  };

  useEffect(() => {
    dispatch(loadAdvert(advertId));
  }, [advertId, dispatch]);

  return (
    <Layout title="Advert info">
      {advert && (
        <Advert
          id={advert.id}
          name={advert.name}
          price={advert.price}
          sale={advert.sale}
          tags={advert.tags}
          photo={advert.photo}
          showImage={true}
        />
      )}
      {!confirmDeletion && !error && (
        <Button onClick={showConfirmDeletion}>Delete advert</Button>
      )}
      {error && (
        <div
          className="Nodepop-error"
          onClick={resetError}
        >{`${error}. Click this banner to get back`}</div>
      )}
      {confirmDeletion && (
        <div className="AdvertPage-confirm-deletion">
          Are you sure you want to delete this advert?
          <div>
            <Button onClick={requestDeletion}>Delete</Button>
            <Button onClick={cancelDeletion}>Cancel</Button>
          </div>
        </div>
      )}
      {deletionRequest && (
        <div className="Nodepop-success">Deleting advert...</div>
      )}
    </Layout>
  );
}
export default AdvertPage;
