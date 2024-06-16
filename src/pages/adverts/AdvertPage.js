import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { deleteAd, getAdvert } from "./service";
import Layout from "../../components/layout/Layout";
import Advert from "./components/Advert";
import Button from "../../components/shared/Button";

function AdvertPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [advert, setAdvert] = useState(null);

  const [error, setError] = useState(null);

  const resetError = () => {
    setError(null);
    const to = location.state?.from || "/";
    navigate(to, { replace: true });
  };

  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const [deletionRequest, setDeletionRequest] = useState(false);

  useEffect(() => {
    async function getAdvertsFromService() {
      try {
        const advert = await getAdvert(params.advertId);
        setAdvert(advert);
      } catch (error) {
        if (error.response.data.statusCode === 404) {
          navigate("/404");
        }
      }
    }
    getAdvertsFromService();
  }, [params.advertId, navigate]);

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
    try {
      await deleteAd(advert.id);
      navigate("/adverts");
    } catch (error) {
      setError(error.message);
    }
  };

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
