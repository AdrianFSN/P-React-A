import Button from "../../../components/shared/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  adsCancelDeletion,
  adsConfirmDeletion,
  adsRequestDeletion,
  deleteAdvert,
  uiResetError,
} from "../../../store/actions";
import { getAdsDeletionState, getUi } from "../../../store/selectors";

export default function DeleteAdvert({ advertId }) {
  const dispatch = useDispatch();
  const { error } = useSelector(getUi);
  const { confirmDeletion, deletionRequest } = useSelector(getAdsDeletionState);

  const showConfirmDeletion = () => {
    dispatch(adsConfirmDeletion());
  };
  const requestDeletion = () => {
    dispatch(adsRequestDeletion());
    setTimeout(() => {
      handleAdDeletion();
    }, 2000);
  };
  const cancelDeletion = () => {
    dispatch(adsCancelDeletion());
  };

  const handleAdDeletion = async () => {
    dispatch(deleteAdvert(advertId));
  };

  const resetError = () => {
    dispatch(uiResetError());
  };

  return (
    <section>
      {!confirmDeletion && !error && (
        <Button onClick={showConfirmDeletion}>Delete advert</Button>
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
      {error && (
        <div
          className="Nodepop-error"
          onClick={resetError}
        >{`${error}. Click this banner to get back`}</div>
      )}
    </section>
  );
}
