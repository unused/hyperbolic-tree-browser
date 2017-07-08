/*
 * converter for TreemL (Tree XML) to JSON Format that it needed for the layout
 * call with:
 * skosToJson(this.responseXML);
*/

function buildTreeFromSkos(concept, concept_list) {
  // given the concept
  // call for each narrower
  var entry = {id: -1, name: "", children: []};
  var children = []
  var name = concept.name;
  
  if(concept.children.length == 0) {
    entry.id = concept.id;
    entry.name = concept.name;
    entry.children = children;
    return entry;
  }
  
  
  for (var i = 0; i < concept.children.length; i++) {
    //console.log(concept.children[i].name, concept.children[i]);
    // for each child, call the function, and add the returning object to the children list
    var child = null;
    for (var j = 0; j< concept_list.length; j++) {
      if(concept_list[j].id == concept.children[i]) {
        child = concept_list[j];
        break;
      }
    }
    if(child != null) {
      child = buildTreeFromSkos(child, concept_list);
      children.push(child);
    }
    
  }
  entry.id = concept.id;
  entry.name = concept.name;
  entry.children = children;
  return entry;
  
}



function skosToJson(xml) {
  var obj = [];
  json_entries = [];
  //var topNodes = ["skos:ConceptScheme", "skos:Concept", "rdf:Description"];
  var topNodes = ["ConceptScheme", "Concept", "Description", "skos:ConceptScheme", "skos:Concept", "rdf:Description"];
  for (var top_nodes_counter = 0; top_nodes_counter < topNodes.length; top_nodes_counter++) {
    x = xml.getElementsByTagName(topNodes[top_nodes_counter]);
    
    for (var i = 0; i < x.length; i++) {
      var id = -1;
      if (x[i].attributes[0].nodeName == "rdf:about")
        id = x[i].attributes[0].nodeValue;
      
      var entry = {id: -1, name: "", children: []};
      var name = "";
      var children = [];
      
      for (var j = 0; j < x[i].childNodes.length; j++) {
        // firstChild.data ... to get the text of prefLabel
        var childNode = x[i].childNodes[j];
        var nodeName = childNode.nodeName;
        if(nodeName == "#text")
          continue;
        
        //we want prefLabel, Narrow, TopConceptOf, hasTopConcept, ...
        //name = text of title
        if(name == "" && nodeName.indexOf(":title") >= 0) {
          //if(nodeName == "dc:title")
          name = childNode.firstChild.data;
        }
        else if(name == "" && nodeName == "skos:prefLabel") {
          name = childNode.firstChild.data;
        }
        else if(nodeName == "skos:hasTopConcept") {
          var narrower = -1;
          if (childNode.attributes[0].nodeName == "rdf:resource")
            narrower = childNode.attributes[0].nodeValue;
          children.push(narrower);
        }
        else if(nodeName == "skos:narrower") {
          var narrower = -1;
          if (childNode.attributes[0].nodeName == "rdf:resource")
            narrower = childNode.attributes[0].nodeValue;
          children.push(narrower);
        }
      }
      entry.id = id;
      entry.name = name;
      entry.children = children;
      json_entries.push(entry);
      
    }
  }
  
  //console.log(json_entries);
  
  // next step is to order the structure.
  if(json_entries.length <= 0)
    return -1;
  var json_tree = buildTreeFromSkos(json_entries[0], json_entries);
  //console.log("json_tree", json_tree);
  
  return json_tree;
};

export default function(content) { return skosToJson(this.responseXML); }
