# containers guideline

## when to create a container
you need a new page

for example

you want to create `tour/` page

```
/containers/Tour/
```

when you want to create a component that will be used ONLY FOR THIS CONTAINER,
for example `TourReview`

```
/containers/Tour/TourReview
```

when `TourReview` need to be used by other containers also,  
move it to `/components` folder.
([see `/components` README](../components/README.md))
