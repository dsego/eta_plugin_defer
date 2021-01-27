## Eta - Defer File

A plugin for the [Eta](https://eta.js.org/) template engine to defer async includes. 
The defered includes are loaded simultaneously with `Promise.all`.

##### Without the plugin
```ejs
<%
const [AsyncComponent1, AsyncComponent2] = await Promise.all([
  includeFile('AsyncComponent.eta', { delay: 200 }),
  includeFile('AsyncComponent.eta', { delay: 300 })
])
%>
<h1>This should take ~300ms</h1>
<%~ AsyncComponent1 %>
<%~ AsyncComponent2 %>
```


##### With the plugin:
```ejs
<h1>Test Page</h1>
<%~ deferFile('async.eta', { delay: 200 }) %>
<%~ deferFile('async.eta', { delay: 300 }) %>

```

