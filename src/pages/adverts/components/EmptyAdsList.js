import { useNavigate } from "react-router-dom";
import Button from "../../../components/shared/Button";

const EmptyList = () => {
  const navigate = useNavigate();
  const navigateToCreateNewAd = () => {
    navigate("/adverts/new");
  };

  return (
    <section>
      <p>Nothing to see here... Be the first one and publish your advert!</p>
      <Button onClick={navigateToCreateNewAd} $variant="primary">
        Create advert
      </Button>
    </section>
  );
};

export default EmptyList;
