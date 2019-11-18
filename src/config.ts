import path from 'path';
import fs from 'fs';

interface PresentationalErrorConfiguration {
  code: number;
  errorName: string;
  message: string;
  status: number;
}

interface ReplaceRuleConfiguration {
  key: string;
  variableName?: string;
  required?: boolean;
  value?: string;
}

interface MappingConfiguration {
  errorClassName: string;
  default: {
    presentationalErrorName: string;
    replaceRules: Array<ReplaceRuleConfiguration>;
  };
  conditions: Array<{
    variableName: string;
    target: string;
    presentationalErrorName: string;
    replaceRules: Array<ReplaceRuleConfiguration>;
  }>;
}

export interface Configuration {
  presentationalErrors: Array<PresentationalErrorConfiguration>;
  mappings: Array<MappingConfiguration>;
}

const defaultConfig: Configuration = {
  presentationalErrors: [],
  mappings: []
};
const fileName: string = 'errors.json';
const fileTemplate: string = 
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

export interface Configurator {
  initialize(): string;
  load(basePath?: Array<string>): Configuration;
}

export const configurator: Configurator = {
  initialize: () => {
    const filePath = path.resolve('.', fileName);
    const absoluteDir = path.dirname(filePath);
    fs.writeFileSync(filePath, fileTemplate, 'utf8');
    return absoluteDir;
  },
  load: function(basePath: Array<string> = ['.']): Configuration {
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
