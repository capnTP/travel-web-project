import { configure } from '@storybook/react';

function loadStories() {
  // NOTE: It would be easier to find the duplicates if we do alphabetical order
  require('../stories/Account/AccountProfile/MyInfo/LanguageSetting');
  require('../stories/Account/AccountReviews/ReviewCard');
  require('../stories/Account/AccountReviews/ReviewForm');
  require('../stories/Account/BookingCard');
  require('../stories/Button');
  require('../stories/ButtonGroup');
  require('../stories/Card');
  require('../stories/Cards/TourCard');
  require('../stories/Cards/Promotion');
  require('../stories/Cards/Review');
  require('../stories/Cards/City');
  require('../stories/Carousal');
  require('../stories/Checkbox');
  require('../stories/Colors');
  require('../stories/Form/InputGroup');
  require('../stories/Form/Star');
  require('../stories/GetWidth.jsx');
  require('../stories/Select');
  require('../stories/ShareFav');
  require('../stories/SocialButtons');
  require('../stories/NewsLetter');
  require('../stories/TextInput');
}

configure(loadStories, module);
