```
const Example = () => {
  const img = 'http://static.asiawebdirect.com/m/bangkok/portals/bangkok-com/shared/teasersL/TOP10/top-10-historical-attractions/teaserMultiLarge/imageHilight/things-to-do-bangkok-L.jpg';
  const listData = [
  {
    img,
    title: 'Experiences',
    subtitle: 'sub title',
    key: 'Experiences',
  },
  {
    img,
    title: 'Tours and Activities',
    subtitle: 'sub title',
    key: 'Tours and Activities',
  },
  {
    img,
    title: 'Transportation',
    key: 'Transportation',
  },
  {
    img,
    title: 'Promotions',
    subtitle: 'sub title',
    key: 'Promotions',
  },
  {
    img,
    title: 'Others',
    key: 'Others',
  },
  ]
  return (
    <div>
      <h3>Full content</h3>
      <CategoryFilter
        activeKeys={['Tours and Activities', 'Others']}
        listData={listData}
        onSelectItem={console.log}
      />

      <h3>Without images</h3>
      <CategoryFilter
        activeKeys={['Experiences', 'Promotions', 'Transportation']}
        listData={listData.map(({img, ...rest}) => rest)}
        onSelectItem={console.log}
      />
    </div>
  )
};
<Example />
```
