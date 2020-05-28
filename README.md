## development

copy-paste code below into `<project-root>/.env`

```
API_SERVER=https://api.theasiadev.com
APP_URL=http://localhost:3000
BASE_API_URL=https://api.theasiadev.com
BLOG_URL=https://blog.theasia.com/?json=get_recent_posts&count=6&cat=
GRAPHQL_URL=https://api.theasiadev.com/wwwtheasia_graphql
IMIGIX_URL=https://theasia.imgix.net/sandbox
LOGGING_LEVEL=debug
NODE_ENV=development
SANDBOX=true
SLACK_HOOK_URL=https://hooks.slack.com/services/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
```

install dependencies and run development server
```
npm ci && npm run dev
```
