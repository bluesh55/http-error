const path = require('path');
const fs = require('fs');
const defaultConfig = {
  presentationalErrors: [],
  mappings: []
};
const fileName = 'errors.json';
const fileTemplate = 
`{
  "presentationalErrors": [
    {
      "code": 1000,
      "errorName": "ResourceNotFound",
      "message": "\${resource} not found.",
      "status": 404
    }
  ],
  "mappings": [
    {
      "errorClassName": "ObjectNotFoundError",
      "default": {
        "presentationalErrorName": "ResourceNotFound",
        "replaceRules": [
          {
            "key": "resource",
            "variableName": "resourceName",
            "value": "Resource"
          }
        ]
      },
      "conditions": [
        {
          "variableName": "resourceName",
          "target": "Person",
          "presentationalErrorName": "ResourceNotFound",
          "replaceRules": [
            {
              "key": "resource",
              "value": "User"
            }
          ]
        }
      ]
    }
  ]
}
`;

module.exports = {
  initialize: function() {
    const filePath = path.resolve('.', fileName);
    const absoluteDir = path.dirname(filePath);
    fs.writeFileSync(filePath, fileTemplate, 'utf8');
    return absoluteDir;
  },
  load: function(basePath = ['.']) {
    const filePath = path.resolve(...basePath, fileName);
    if (fs.existsSync(filePath)) {
      const config = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      return config;
    } else {
      if (filePath === path.resolve('/', fileName)) {
        return defaultConfig;
      } else {
        return this.load([...basePath, '..'])
      }
    }
  }
};
