import * as d3 from 'd3';

/**
 * Import hierarchical data by type and resource.
 *
 * Usage:
 *   (new HierarchyData('json')).fetch('https://example.com/data.json');
 *   (new HierarchyData('json')).load(<json string>);
 **/
class HierarchyData {
  constructor(type) {
    this.type = type;

    this.load = this.load.bind(this);
    this.convert = this.convert.bind(this);
    this.processStatify = this.processStatify.bind(this);
  }

  set stratify(options) {
    // NOTE: one might check if id and parentId funcs are present.
    this.stratifyFunc = options;
  }

  processStatify(data) {
    if (!this.stratifyFunc) {
      return data;
    }

    return d3.stratify
      .id(this.stratifyFunc.id)
      .parentId(this.stratifyFunc.parentId)(data);
  }

  convert(data) {
    return this[{ json: 'convertJson' }[this.type]](data);
  }

  convertJson(data) {
    return data.json ? data.json() : JSON.parse(data);
  }

  fetch(resource) {
    return fetch(resource)
      .then(this.load);
  }

  load(data) {
    return new Promise((resolve, reject) => resolve(data))
      .then(this.convert)
      .then(this.stratify);
  }
}

export default HierarchyData;
