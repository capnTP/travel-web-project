```jsx
class TourCardExample extends React.Component {
  render() {
    const tour = {
      name: 'Bangkok Grand Palace tour & what phrase thailand Asia',
      latestMinimumPrice: 10,
      review: { rating: 4 },
      discountPercent: 20,
      tourMedias: [
        {
          isThumbnail: true,
          detail: {
            absoluteUrl:
              'http://static.asiawebdirect.com/m/bangkok/portals/bangkok-com/homepage/hotels/grand-palace/pagePropertiesImage/grand-palace.jpg',
          },
        },
        {
          isThumbnail: true,
          detail: {
            absoluteUrl:
              'http://static.asiawebdirect.com/m/bangkok/portals/bangkok-com/homepage/hotels/grand-palace/pagePropertiesImage/grand-palace.jpg',
          },
        },
      ],
      city: {
        name: 'Danang',
        country: {
          name: 'vietnam',
        },
      },
    };

    return (
      <div>
        <h3>Normal state</h3>
        <TourCard tour={tour} />

        <h3>Active state</h3>
        <TourCard isActive tour={tour} />
      </div>
    );
  }
};
<TourCardExample />
```
