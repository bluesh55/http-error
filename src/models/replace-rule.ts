class ReplaceRule {
  key: string;
  variableName?: string;
  required?: boolean;
  value?: string;

  constructor(key: string, variableName?: string, required?: boolean, value?: string) {
    this.key = key;
    this.variableName = variableName;
    this.required = required;
    this.value = value;
  }
}

export = ReplaceRule;
