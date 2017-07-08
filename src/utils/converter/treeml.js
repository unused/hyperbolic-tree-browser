/*
 * converter for TreemL (Tree XML) to JSON Format that it needed for the layout
 * call with:
 * treeMLToJson(xml).children[1].children[0];
*/

function treeMLToJson(xml) {
  //console.log(xml, xml.nodeType)
  var entry = {name: "", children: []};
  
  if (xml.nodeType == 1) {
    if(xml.attributes.length > 0) {
      // get the first attribute, we use it always as the name
      var attribute = xml.attributes.item(0);
      console.log("getAttr: " + attribute.nodeValue, "ATTRIBUTE: " + attribute.nodeValue);
      if(attribute.nodeValue === "name") {
        attribute = xml.attributes.item(1); //the value, which holds the name of the attribute
        entry.name = attribute.nodeValue;
        console.log("attribute",entry.name);
      }
    }
  }
  
  if(xml.nodeName === "branch") {
    // get name for branch
    entry.name = (xml.firstElementChild.attributes[1].nodeValue);
  }
  
  //2nd check for branch or leaf // and call recursive
  if (xml.hasChildNodes()) {
    for(var i = 0; i < xml.childNodes.length; i++) {
      var item = xml.childNodes.item(i);
      var nodeName = item.nodeName;
      
      if(nodeName === "declarations")
        continue;
      if(nodeName === "#text")
        continue;
      
      //check if branch or leaf
      if(item.nodeName === "branch") {
        // handle branch, call recursion with its children.
        entry.children.push(xmlToJson(item));
      } else if(item.nodeName === "leaf") {
        //if leaf, we know it has only attributes anymore, so we get each leafs, first attribute only
        var leaf_entry = {name: "", children: []};
        leaf_entry.name = item.firstElementChild.attributes[1].nodeValue;
        entry.children.push(leaf_entry);
      } else if(item.nodeName === "attribute") {
        //console.log("attripute - loop: #" + i, nodeName)
      } else {
        entry.children.push(xmlToJson(item));
      }
    }
  }
  
  return entry;
};

export default function(content) {
  return treeMLToJson(new DOMParser().parseFromString(content, "text/xml"))
    .children[1].children[0];
}
