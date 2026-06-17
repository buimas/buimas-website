import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import React3, { Component, useEffect, useState, useRef } from "react";
import fastCompare from "react-fast-compare";
import invariant from "invariant";
import shallowEqual from "shallowequal";
import { useLocation, Link, NavLink, Routes, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useReducedMotion, motion, AnimatePresence } from "framer-motion";
var TAG_NAMES = /* @__PURE__ */ ((TAG_NAMES2) => {
  TAG_NAMES2["BASE"] = "base";
  TAG_NAMES2["BODY"] = "body";
  TAG_NAMES2["HEAD"] = "head";
  TAG_NAMES2["HTML"] = "html";
  TAG_NAMES2["LINK"] = "link";
  TAG_NAMES2["META"] = "meta";
  TAG_NAMES2["NOSCRIPT"] = "noscript";
  TAG_NAMES2["SCRIPT"] = "script";
  TAG_NAMES2["STYLE"] = "style";
  TAG_NAMES2["TITLE"] = "title";
  TAG_NAMES2["FRAGMENT"] = "Symbol(react.fragment)";
  return TAG_NAMES2;
})(TAG_NAMES || {});
var SEO_PRIORITY_TAGS = {
  link: { rel: ["amphtml", "canonical", "alternate"] },
  script: { type: ["application/ld+json"] },
  meta: {
    charset: "",
    name: ["generator", "robots", "description"],
    property: [
      "og:type",
      "og:title",
      "og:url",
      "og:image",
      "og:image:alt",
      "og:description",
      "twitter:url",
      "twitter:title",
      "twitter:description",
      "twitter:image",
      "twitter:image:alt",
      "twitter:card",
      "twitter:site"
    ]
  }
};
var VALID_TAG_NAMES = Object.values(TAG_NAMES);
var REACT_TAG_MAP = {
  accesskey: "accessKey",
  charset: "charSet",
  class: "className",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  "http-equiv": "httpEquiv",
  itemprop: "itemProp",
  tabindex: "tabIndex"
};
var HTML_TAG_MAP = Object.entries(REACT_TAG_MAP).reduce(
  (carry, [key, value]) => {
    carry[value] = key;
    return carry;
  },
  {}
);
var HELMET_ATTRIBUTE = "data-rh";
var HELMET_PROPS = {
  DEFAULT_TITLE: "defaultTitle",
  DEFER: "defer",
  ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
  ON_CHANGE_CLIENT_STATE: "onChangeClientState",
  TITLE_TEMPLATE: "titleTemplate",
  PRIORITIZE_SEO_TAGS: "prioritizeSeoTags"
};
var getInnermostProperty = (propsList, property) => {
  for (let i = propsList.length - 1; i >= 0; i -= 1) {
    const props = propsList[i];
    if (Object.prototype.hasOwnProperty.call(props, property)) {
      return props[property];
    }
  }
  return null;
};
var getTitleFromPropsList = (propsList) => {
  let innermostTitle = getInnermostProperty(
    propsList,
    "title"
    /* TITLE */
  );
  const innermostTemplate = getInnermostProperty(propsList, HELMET_PROPS.TITLE_TEMPLATE);
  if (Array.isArray(innermostTitle)) {
    innermostTitle = innermostTitle.join("");
  }
  if (innermostTemplate && innermostTitle) {
    return innermostTemplate.replace(/%s/g, () => innermostTitle);
  }
  const innermostDefaultTitle = getInnermostProperty(propsList, HELMET_PROPS.DEFAULT_TITLE);
  return innermostTitle || innermostDefaultTitle || void 0;
};
var getOnChangeClientState = (propsList) => getInnermostProperty(propsList, HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || (() => {
});
var getAttributesFromPropsList = (tagType, propsList) => propsList.filter((props) => typeof props[tagType] !== "undefined").map((props) => props[tagType]).reduce((tagAttrs, current) => ({ ...tagAttrs, ...current }), {});
var getBaseTagFromPropsList = (primaryAttributes, propsList) => propsList.filter((props) => typeof props[
  "base"
  /* BASE */
] !== "undefined").map((props) => props[
  "base"
  /* BASE */
]).reverse().reduce((innermostBaseTag, tag) => {
  if (!innermostBaseTag.length) {
    const keys = Object.keys(tag);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const lowerCaseAttributeKey = attributeKey.toLowerCase();
      if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
        return innermostBaseTag.concat(tag);
      }
    }
  }
  return innermostBaseTag;
}, []);
var warn = (msg) => console && typeof console.warn === "function" && console.warn(msg);
var getTagsFromPropsList = (tagName, primaryAttributes, propsList) => {
  const approvedSeenTags = {};
  return propsList.filter((props) => {
    if (Array.isArray(props[tagName])) {
      return true;
    }
    if (typeof props[tagName] !== "undefined") {
      warn(
        `Helmet: ${tagName} should be of type "Array". Instead found type "${typeof props[tagName]}"`
      );
    }
    return false;
  }).map((props) => props[tagName]).reverse().reduce((approvedTags, instanceTags) => {
    const instanceSeenTags = {};
    instanceTags.filter((tag) => {
      let primaryAttributeKey;
      const keys2 = Object.keys(tag);
      for (let i = 0; i < keys2.length; i += 1) {
        const attributeKey = keys2[i];
        const lowerCaseAttributeKey = attributeKey.toLowerCase();
        if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === "rel" && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === "rel" && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
          primaryAttributeKey = lowerCaseAttributeKey;
        }
        if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === "innerHTML" || attributeKey === "cssText" || attributeKey === "itemprop")) {
          primaryAttributeKey = attributeKey;
        }
      }
      if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
        return false;
      }
      const value = tag[primaryAttributeKey].toLowerCase();
      if (!approvedSeenTags[primaryAttributeKey]) {
        approvedSeenTags[primaryAttributeKey] = {};
      }
      if (!instanceSeenTags[primaryAttributeKey]) {
        instanceSeenTags[primaryAttributeKey] = {};
      }
      if (!approvedSeenTags[primaryAttributeKey][value]) {
        instanceSeenTags[primaryAttributeKey][value] = true;
        return true;
      }
      return false;
    }).reverse().forEach((tag) => approvedTags.push(tag));
    const keys = Object.keys(instanceSeenTags);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const tagUnion = {
        ...approvedSeenTags[attributeKey],
        ...instanceSeenTags[attributeKey]
      };
      approvedSeenTags[attributeKey] = tagUnion;
    }
    return approvedTags;
  }, []).reverse();
};
var getAnyTrueFromPropsList = (propsList, checkedTag) => {
  if (Array.isArray(propsList) && propsList.length) {
    for (let index = 0; index < propsList.length; index += 1) {
      const prop = propsList[index];
      if (prop[checkedTag]) {
        return true;
      }
    }
  }
  return false;
};
var reducePropsToState = (propsList) => ({
  baseTag: getBaseTagFromPropsList([
    "href"
    /* HREF */
  ], propsList),
  bodyAttributes: getAttributesFromPropsList("bodyAttributes", propsList),
  defer: getInnermostProperty(propsList, HELMET_PROPS.DEFER),
  encode: getInnermostProperty(propsList, HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
  htmlAttributes: getAttributesFromPropsList("htmlAttributes", propsList),
  linkTags: getTagsFromPropsList(
    "link",
    [
      "rel",
      "href"
      /* HREF */
    ],
    propsList
  ),
  metaTags: getTagsFromPropsList(
    "meta",
    [
      "name",
      "charset",
      "http-equiv",
      "property",
      "itemprop"
      /* ITEM_PROP */
    ],
    propsList
  ),
  noscriptTags: getTagsFromPropsList("noscript", [
    "innerHTML"
    /* INNER_HTML */
  ], propsList),
  onChangeClientState: getOnChangeClientState(propsList),
  scriptTags: getTagsFromPropsList(
    "script",
    [
      "src",
      "innerHTML"
      /* INNER_HTML */
    ],
    propsList
  ),
  styleTags: getTagsFromPropsList("style", [
    "cssText"
    /* CSS_TEXT */
  ], propsList),
  title: getTitleFromPropsList(propsList),
  titleAttributes: getAttributesFromPropsList("titleAttributes", propsList),
  prioritizeSeoTags: getAnyTrueFromPropsList(propsList, HELMET_PROPS.PRIORITIZE_SEO_TAGS)
});
var flattenArray = (possibleArray) => Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
var checkIfPropsMatch = (props, toMatch) => {
  const keys = Object.keys(props);
  for (let i = 0; i < keys.length; i += 1) {
    if (toMatch[keys[i]] && toMatch[keys[i]].includes(props[keys[i]])) {
      return true;
    }
  }
  return false;
};
var prioritizer = (elementsList, propsToMatch) => {
  if (Array.isArray(elementsList)) {
    return elementsList.reduce(
      (acc, elementAttrs) => {
        if (checkIfPropsMatch(elementAttrs, propsToMatch)) {
          acc.priority.push(elementAttrs);
        } else {
          acc.default.push(elementAttrs);
        }
        return acc;
      },
      { priority: [], default: [] }
    );
  }
  return { default: elementsList, priority: [] };
};
var without = (obj, key) => {
  return {
    ...obj,
    [key]: void 0
  };
};
var SELF_CLOSING_TAGS = [
  "noscript",
  "script",
  "style"
  /* STYLE */
];
var encodeSpecialCharacters = (str, encode = true) => {
  if (encode === false) {
    return String(str);
  }
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};
var generateElementAttributesAsString = (attributes) => Object.keys(attributes).reduce((str, key) => {
  const attr = typeof attributes[key] !== "undefined" ? `${key}="${attributes[key]}"` : `${key}`;
  return str ? `${str} ${attr}` : attr;
}, "");
var generateTitleAsString = (type, title, attributes, encode) => {
  const attributeString = generateElementAttributesAsString(attributes);
  const flattenedTitle = flattenArray(title);
  return attributeString ? `<${type} ${HELMET_ATTRIBUTE}="true" ${attributeString}>${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>` : `<${type} ${HELMET_ATTRIBUTE}="true">${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>`;
};
var generateTagsAsString = (type, tags, encode = true) => tags.reduce((str, t) => {
  const tag = t;
  const attributeHtml = Object.keys(tag).filter(
    (attribute) => !(attribute === "innerHTML" || attribute === "cssText")
  ).reduce((string, attribute) => {
    const attr = typeof tag[attribute] === "undefined" ? attribute : `${attribute}="${encodeSpecialCharacters(tag[attribute], encode)}"`;
    return string ? `${string} ${attr}` : attr;
  }, "");
  const tagContent = tag.innerHTML || tag.cssText || "";
  const isSelfClosing = SELF_CLOSING_TAGS.indexOf(type) === -1;
  return `${str}<${type} ${HELMET_ATTRIBUTE}="true" ${attributeHtml}${isSelfClosing ? `/>` : `>${tagContent}</${type}>`}`;
}, "");
var convertElementAttributesToReactProps = (attributes, initProps = {}) => Object.keys(attributes).reduce((obj, key) => {
  const mapped = REACT_TAG_MAP[key];
  obj[mapped || key] = attributes[key];
  return obj;
}, initProps);
var generateTitleAsReactComponent = (_type, title, attributes) => {
  const initProps = {
    key: title,
    [HELMET_ATTRIBUTE]: true
  };
  const props = convertElementAttributesToReactProps(attributes, initProps);
  return [React3.createElement("title", props, title)];
};
var generateTagsAsReactComponent = (type, tags) => tags.map((tag, i) => {
  const mappedTag = {
    key: i,
    [HELMET_ATTRIBUTE]: true
  };
  Object.keys(tag).forEach((attribute) => {
    const mapped = REACT_TAG_MAP[attribute];
    const mappedAttribute = mapped || attribute;
    if (mappedAttribute === "innerHTML" || mappedAttribute === "cssText") {
      const content = tag.innerHTML || tag.cssText;
      mappedTag.dangerouslySetInnerHTML = { __html: content };
    } else {
      mappedTag[mappedAttribute] = tag[attribute];
    }
  });
  return React3.createElement(type, mappedTag);
});
var getMethodsForTag = (type, tags, encode = true) => {
  switch (type) {
    case "title":
      return {
        toComponent: () => generateTitleAsReactComponent(type, tags.title, tags.titleAttributes),
        toString: () => generateTitleAsString(type, tags.title, tags.titleAttributes, encode)
      };
    case "bodyAttributes":
    case "htmlAttributes":
      return {
        toComponent: () => convertElementAttributesToReactProps(tags),
        toString: () => generateElementAttributesAsString(tags)
      };
    default:
      return {
        toComponent: () => generateTagsAsReactComponent(type, tags),
        toString: () => generateTagsAsString(type, tags, encode)
      };
  }
};
var getPriorityMethods = ({ metaTags, linkTags, scriptTags, encode }) => {
  const meta = prioritizer(metaTags, SEO_PRIORITY_TAGS.meta);
  const link = prioritizer(linkTags, SEO_PRIORITY_TAGS.link);
  const script = prioritizer(scriptTags, SEO_PRIORITY_TAGS.script);
  const priorityMethods = {
    toComponent: () => [
      ...generateTagsAsReactComponent("meta", meta.priority),
      ...generateTagsAsReactComponent("link", link.priority),
      ...generateTagsAsReactComponent("script", script.priority)
    ],
    toString: () => (
      // generate all the tags as strings and concatenate them
      `${getMethodsForTag("meta", meta.priority, encode)} ${getMethodsForTag(
        "link",
        link.priority,
        encode
      )} ${getMethodsForTag("script", script.priority, encode)}`
    )
  };
  return {
    priorityMethods,
    metaTags: meta.default,
    linkTags: link.default,
    scriptTags: script.default
  };
};
var mapStateOnServer = (props) => {
  const {
    baseTag,
    bodyAttributes,
    encode = true,
    htmlAttributes,
    noscriptTags,
    styleTags,
    title = "",
    titleAttributes,
    prioritizeSeoTags
  } = props;
  let { linkTags, metaTags, scriptTags } = props;
  let priorityMethods = {
    toComponent: () => {
    },
    toString: () => ""
  };
  if (prioritizeSeoTags) {
    ({ priorityMethods, linkTags, metaTags, scriptTags } = getPriorityMethods(props));
  }
  return {
    priority: priorityMethods,
    base: getMethodsForTag("base", baseTag, encode),
    bodyAttributes: getMethodsForTag("bodyAttributes", bodyAttributes, encode),
    htmlAttributes: getMethodsForTag("htmlAttributes", htmlAttributes, encode),
    link: getMethodsForTag("link", linkTags, encode),
    meta: getMethodsForTag("meta", metaTags, encode),
    noscript: getMethodsForTag("noscript", noscriptTags, encode),
    script: getMethodsForTag("script", scriptTags, encode),
    style: getMethodsForTag("style", styleTags, encode),
    title: getMethodsForTag("title", { title, titleAttributes }, encode)
  };
};
var server_default = mapStateOnServer;
var instances = [];
var isDocument = !!(typeof window !== "undefined" && window.document && window.document.createElement);
var HelmetData = class {
  instances = [];
  canUseDOM = isDocument;
  context;
  value = {
    setHelmet: (serverState) => {
      this.context.helmet = serverState;
    },
    helmetInstances: {
      get: () => this.canUseDOM ? instances : this.instances,
      add: (instance) => {
        (this.canUseDOM ? instances : this.instances).push(instance);
      },
      remove: (instance) => {
        const index = (this.canUseDOM ? instances : this.instances).indexOf(instance);
        (this.canUseDOM ? instances : this.instances).splice(index, 1);
      }
    }
  };
  constructor(context, canUseDOM) {
    this.context = context;
    this.canUseDOM = canUseDOM || false;
    if (!canUseDOM) {
      context.helmet = server_default({
        baseTag: [],
        bodyAttributes: {},
        htmlAttributes: {},
        linkTags: [],
        metaTags: [],
        noscriptTags: [],
        scriptTags: [],
        styleTags: [],
        title: "",
        titleAttributes: {}
      });
    }
  }
};
var defaultValue = {};
var Context = React3.createContext(defaultValue);
var HelmetProvider = class _HelmetProvider extends Component {
  static canUseDOM = isDocument;
  helmetData;
  constructor(props) {
    super(props);
    this.helmetData = new HelmetData(this.props.context || {}, _HelmetProvider.canUseDOM);
  }
  render() {
    return /* @__PURE__ */ React3.createElement(Context.Provider, { value: this.helmetData.value }, this.props.children);
  }
};
var updateTags = (type, tags) => {
  const headElement = document.head || document.querySelector(
    "head"
    /* HEAD */
  );
  const tagNodes = headElement.querySelectorAll(`${type}[${HELMET_ATTRIBUTE}]`);
  const oldTags = [].slice.call(tagNodes);
  const newTags = [];
  let indexToDelete;
  if (tags && tags.length) {
    tags.forEach((tag) => {
      const newElement = document.createElement(type);
      for (const attribute in tag) {
        if (Object.prototype.hasOwnProperty.call(tag, attribute)) {
          if (attribute === "innerHTML") {
            newElement.innerHTML = tag.innerHTML;
          } else if (attribute === "cssText") {
            if (newElement.styleSheet) {
              newElement.styleSheet.cssText = tag.cssText;
            } else {
              newElement.appendChild(document.createTextNode(tag.cssText));
            }
          } else {
            const attr = attribute;
            const value = typeof tag[attr] === "undefined" ? "" : tag[attr];
            newElement.setAttribute(attribute, value);
          }
        }
      }
      newElement.setAttribute(HELMET_ATTRIBUTE, "true");
      if (oldTags.some((existingTag, index) => {
        indexToDelete = index;
        return newElement.isEqualNode(existingTag);
      })) {
        oldTags.splice(indexToDelete, 1);
      } else {
        newTags.push(newElement);
      }
    });
  }
  oldTags.forEach((tag) => tag.parentNode?.removeChild(tag));
  newTags.forEach((tag) => headElement.appendChild(tag));
  return {
    oldTags,
    newTags
  };
};
var updateAttributes = (tagName, attributes) => {
  const elementTag = document.getElementsByTagName(tagName)[0];
  if (!elementTag) {
    return;
  }
  const helmetAttributeString = elementTag.getAttribute(HELMET_ATTRIBUTE);
  const helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
  const attributesToRemove = [...helmetAttributes];
  const attributeKeys = Object.keys(attributes);
  for (const attribute of attributeKeys) {
    const value = attributes[attribute] || "";
    if (elementTag.getAttribute(attribute) !== value) {
      elementTag.setAttribute(attribute, value);
    }
    if (helmetAttributes.indexOf(attribute) === -1) {
      helmetAttributes.push(attribute);
    }
    const indexToSave = attributesToRemove.indexOf(attribute);
    if (indexToSave !== -1) {
      attributesToRemove.splice(indexToSave, 1);
    }
  }
  for (let i = attributesToRemove.length - 1; i >= 0; i -= 1) {
    elementTag.removeAttribute(attributesToRemove[i]);
  }
  if (helmetAttributes.length === attributesToRemove.length) {
    elementTag.removeAttribute(HELMET_ATTRIBUTE);
  } else if (elementTag.getAttribute(HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
    elementTag.setAttribute(HELMET_ATTRIBUTE, attributeKeys.join(","));
  }
};
var updateTitle = (title, attributes) => {
  if (typeof title !== "undefined" && document.title !== title) {
    document.title = flattenArray(title);
  }
  updateAttributes("title", attributes);
};
var commitTagChanges = (newState, cb) => {
  const {
    baseTag,
    bodyAttributes,
    htmlAttributes,
    linkTags,
    metaTags,
    noscriptTags,
    onChangeClientState,
    scriptTags,
    styleTags,
    title,
    titleAttributes
  } = newState;
  updateAttributes("body", bodyAttributes);
  updateAttributes("html", htmlAttributes);
  updateTitle(title, titleAttributes);
  const tagUpdates = {
    baseTag: updateTags("base", baseTag),
    linkTags: updateTags("link", linkTags),
    metaTags: updateTags("meta", metaTags),
    noscriptTags: updateTags("noscript", noscriptTags),
    scriptTags: updateTags("script", scriptTags),
    styleTags: updateTags("style", styleTags)
  };
  const addedTags = {};
  const removedTags = {};
  Object.keys(tagUpdates).forEach((tagType) => {
    const { newTags, oldTags } = tagUpdates[tagType];
    if (newTags.length) {
      addedTags[tagType] = newTags;
    }
    if (oldTags.length) {
      removedTags[tagType] = tagUpdates[tagType].oldTags;
    }
  });
  if (cb) {
    cb();
  }
  onChangeClientState(newState, addedTags, removedTags);
};
var _helmetCallback = null;
var handleStateChangeOnClient = (newState) => {
  if (_helmetCallback) {
    cancelAnimationFrame(_helmetCallback);
  }
  if (newState.defer) {
    _helmetCallback = requestAnimationFrame(() => {
      commitTagChanges(newState, () => {
        _helmetCallback = null;
      });
    });
  } else {
    commitTagChanges(newState);
    _helmetCallback = null;
  }
};
var client_default = handleStateChangeOnClient;
var HelmetDispatcher = class extends Component {
  rendered = false;
  shouldComponentUpdate(nextProps) {
    return !shallowEqual(nextProps, this.props);
  }
  componentDidUpdate() {
    this.emitChange();
  }
  componentWillUnmount() {
    const { helmetInstances } = this.props.context;
    helmetInstances.remove(this);
    this.emitChange();
  }
  emitChange() {
    const { helmetInstances, setHelmet } = this.props.context;
    let serverState = null;
    const state = reducePropsToState(
      helmetInstances.get().map((instance) => {
        const props = { ...instance.props };
        delete props.context;
        return props;
      })
    );
    if (HelmetProvider.canUseDOM) {
      client_default(state);
    } else if (server_default) {
      serverState = server_default(state);
    }
    setHelmet(serverState);
  }
  // componentWillMount will be deprecated
  // for SSR, initialize on first render
  // constructor is also unsafe in StrictMode
  init() {
    if (this.rendered) {
      return;
    }
    this.rendered = true;
    const { helmetInstances } = this.props.context;
    helmetInstances.add(this);
    this.emitChange();
  }
  render() {
    this.init();
    return null;
  }
};
var Helmet = class extends Component {
  static defaultProps = {
    defer: true,
    encodeSpecialCharacters: true,
    prioritizeSeoTags: false
  };
  shouldComponentUpdate(nextProps) {
    return !fastCompare(without(this.props, "helmetData"), without(nextProps, "helmetData"));
  }
  mapNestedChildrenToProps(child, nestedChildren) {
    if (!nestedChildren) {
      return null;
    }
    switch (child.type) {
      case "script":
      case "noscript":
        return {
          innerHTML: nestedChildren
        };
      case "style":
        return {
          cssText: nestedChildren
        };
      default:
        throw new Error(
          `<${child.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`
        );
    }
  }
  flattenArrayTypeChildren(child, arrayTypeChildren, newChildProps, nestedChildren) {
    return {
      ...arrayTypeChildren,
      [child.type]: [
        ...arrayTypeChildren[child.type] || [],
        {
          ...newChildProps,
          ...this.mapNestedChildrenToProps(child, nestedChildren)
        }
      ]
    };
  }
  mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren) {
    switch (child.type) {
      case "title":
        return {
          ...newProps,
          [child.type]: nestedChildren,
          titleAttributes: { ...newChildProps }
        };
      case "body":
        return {
          ...newProps,
          bodyAttributes: { ...newChildProps }
        };
      case "html":
        return {
          ...newProps,
          htmlAttributes: { ...newChildProps }
        };
      default:
        return {
          ...newProps,
          [child.type]: { ...newChildProps }
        };
    }
  }
  mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
    let newFlattenedProps = { ...newProps };
    Object.keys(arrayTypeChildren).forEach((arrayChildName) => {
      newFlattenedProps = {
        ...newFlattenedProps,
        [arrayChildName]: arrayTypeChildren[arrayChildName]
      };
    });
    return newFlattenedProps;
  }
  warnOnInvalidChildren(child, nestedChildren) {
    invariant(
      VALID_TAG_NAMES.some((name) => child.type === name),
      typeof child.type === "function" ? `You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.` : `Only elements types ${VALID_TAG_NAMES.join(
        ", "
      )} are allowed. Helmet does not support rendering <${child.type}> elements. Refer to our API for more information.`
    );
    invariant(
      !nestedChildren || typeof nestedChildren === "string" || Array.isArray(nestedChildren) && !nestedChildren.some((nestedChild) => typeof nestedChild !== "string"),
      `Helmet expects a string as a child of <${child.type}>. Did you forget to wrap your children in braces? ( <${child.type}>{\`\`}</${child.type}> ) Refer to our API for more information.`
    );
    return true;
  }
  mapChildrenToProps(children, newProps) {
    let arrayTypeChildren = {};
    React3.Children.forEach(children, (child) => {
      if (!child || !child.props) {
        return;
      }
      const { children: nestedChildren, ...childProps } = child.props;
      const newChildProps = Object.keys(childProps).reduce((obj, key) => {
        obj[HTML_TAG_MAP[key] || key] = childProps[key];
        return obj;
      }, {});
      let { type } = child;
      if (typeof type === "symbol") {
        type = type.toString();
      } else {
        this.warnOnInvalidChildren(child, nestedChildren);
      }
      switch (type) {
        case "Symbol(react.fragment)":
          newProps = this.mapChildrenToProps(nestedChildren, newProps);
          break;
        case "link":
        case "meta":
        case "noscript":
        case "script":
        case "style":
          arrayTypeChildren = this.flattenArrayTypeChildren(
            child,
            arrayTypeChildren,
            newChildProps,
            nestedChildren
          );
          break;
        default:
          newProps = this.mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren);
          break;
      }
    });
    return this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
  }
  render() {
    const { children, ...props } = this.props;
    let newProps = { ...props };
    let { helmetData } = props;
    if (children) {
      newProps = this.mapChildrenToProps(children, newProps);
    }
    if (helmetData && !(helmetData instanceof HelmetData)) {
      const data = helmetData;
      helmetData = new HelmetData(data.context, true);
      delete newProps.helmetData;
    }
    return helmetData ? /* @__PURE__ */ React3.createElement(HelmetDispatcher, { ...newProps, context: helmetData.value }) : /* @__PURE__ */ React3.createElement(Context.Consumer, null, (context) => /* @__PURE__ */ React3.createElement(HelmetDispatcher, { ...newProps, context }));
  }
};
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};
const logo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHYAAAAeCAYAAAD5AOomAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAATQSURBVHgB7Vr/VeMwDBb37v/rBoQJ6E1wYYJyExAmACYgTECZgDIBZYKWCSgTNExAbwKfPiwT49rpj7ik7cv3nl5qx5KVyJJlpaTiYcp0TS22Ayo+WuNuA9Rm0Bq3Yfz09BW0PhK55mxcOjg4uKEWzcB1NaoBZj91xF1Si0bwk+Ji5rRTpn4VAxs/4cuIlpM9YbrjSDChiGAdUtK6DmPLbgyRPTZ1xC00GAyrGtzDPfOntAeI7bF1MWR68vR3mLpMZ9LGHv7G3jWg+kg9c+0+Ynkss3aYXmp6bL5gbLqK7BX0nopMXBPaB8QwrBhnquaxMHlaxbAyflRH1yo9aI9QOxSrMvlJnFs3HCr7FB9v5NcjEx2KUIgWXTNpDnhcYfPy9ZNXlQkV0Of+mfT1SG8LwAPphGtmzYExZ1S+j4cKfRD2L0Se2QJMglhU8GRMfxyeJ+YZ2wPX9tgKT81XlLGOx74E+kcVvHYoT6t4oYs1FjpeKz+m8rKpYszI0QPh/1ZV49qjf5fpvYLnUUnkqeuxmDxx+uCpOW0ArDRWd2rmoe9DQtpLMGdB2sN60g+6ZN3Qf8p0RfpollKZ7GFBZZbnjqj0eoxF0ohIdCwyACysZ+OFsngeSXspeBAtJtLuyXzghfF/1/XYkcOe04pQXz0W8nIP3asyMZsqz5FEbdZj75WzB4ve75ZOj/LyQ/MNPX19j45d+31Y/XbxJ/Hw2fpmMQ2b0xpQy59j330v2KPLJgx7GZD3aOmWBsZMA7LvKaznp1yrL7P06QT4BkbXmOfYGFlqQeFaNUJXBlJ69V+FEowNIFSN+ifXTsWYgpztCltVhXFSKpOijiPHAPvzjfv83M7M75iGjVH4f6jan+WhsdLNXnLyTcYtFg2wM+Nl4I6XZ0POkgbGj2VB49kz0gt8TLqgM/mSETN+UD28Om0Yd2Of7ET5E2kmTDv9kUHp7BiJFzJ8hOqUaUw6mZoDP/9fKhM4kvG34HW3qrqGzWl+NW/auAWVYa9HOwp+R/A8GBSGwTYDYyICYeG+hvgQ0ZiOSC/wO9ILATDnWxi5W8uwEk4wQeHc2qhxaf4r0rLYijqw0gURHF0SpgHTEbzRDacevsTszRjLdImFwHTAXedU7ue3dT3WeFDIuNFDpYQa+wzoIqlg3xYPN4se1a9zT55w7DLIHgwP975TOSOb/CatbVgRWpA2rpsZRn2RsloRuoznPVi3TakxUf5zbkJb4LGiRyLNV899U2I0baNzRlr/6yUcZhYtK4ZxeUJUXep8demxjMPAvS5ZD0w6QgysNn6bSg+SCOw/pjJjKjp3VFZ2moIdZS5YT7QL0npCfzwjPM+cc3GmxXPAmKgPJ6SPO/j9ZPEeU+nNw1oFChfq+z603yvPOVAO6D4gYzxVNWrFAd0/56t4Pp/sfkDPqZJ9VH2tCY+sdzVV1fiQsQ0f2rFiB0uMQzEAK3cYOjPigK702c7+uoJV3ZeIklhz2TLMyi+svklgrI0xLS7MzMlG0qO0F375CiR6fsylUO/VHvjL8MqWd6R0Rg06tPgh75n0vj2L7bHun9kyatEI5jxW6WNKRuvBDo83kf660mId+DxWhfeqZZFTi2bhM6z0r2vcnFo0j5Bh5V5/BYMii9vp2u0+4T9JfnNL2u8I7QAAAABJRU5ErkJggg==";
const navLinks = [
  { to: "/about", label: "About" },
  { to: "/hire-talent", label: "Hire Talent" }
];
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
  const solid = !isHome || scrolled;
  return /* @__PURE__ */ jsxs("header", { className: "fixed top-0 left-0 z-50 w-full", children: [
    /* @__PURE__ */ jsx("div", { className: "px-4 sm:px-6", children: /* @__PURE__ */ jsxs("nav", { className: `mx-auto mt-6 flex max-w-7xl items-center justify-between rounded-full border border-white/10 px-4 py-4 backdrop-blur-md transition-colors duration-300 sm:px-6 md:px-8 ${solid ? "bg-black/60" : "bg-white/5"}`, children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "flex items-center", "aria-label": "Buimas home", children: /* @__PURE__ */ jsx("img", { src: logo, alt: "Buimas logo", className: "h-6 w-auto sm:h-7 md:h-8" }) }),
      /* @__PURE__ */ jsx("ul", { className: "hidden items-center gap-8 text-sm text-white/80 md:flex", children: navLinks.map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        NavLink,
        {
          to: link.to,
          className: ({ isActive }) => `transition hover:text-white ${isActive ? "text-white" : ""}`,
          children: link.label
        }
      ) }, link.to)) }),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/hire-talent",
          className: `hidden rounded-full px-5 py-2.5 text-sm font-medium transition md:block ${solid ? "bg-white text-black hover:bg-white/90" : "border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20"}`,
          children: "Start Your Project"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => setOpen(!open),
          "aria-label": open ? "Close menu" : "Open menu",
          "aria-expanded": open,
          className: "text-white md:hidden",
          children: open ? /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" }) }) : /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4 6h16M4 12h16M4 18h16" }) })
        }
      )
    ] }) }),
    open && /* @__PURE__ */ jsx("div", { className: "mx-4 mt-4 rounded-2xl border border-white/10 bg-black/80 p-6 text-white backdrop-blur-md md:hidden", children: /* @__PURE__ */ jsxs("ul", { className: "flex flex-col gap-1 text-sm", children: [
      navLinks.map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(NavLink, { to: link.to, className: "block rounded-lg px-3 py-2.5 transition hover:bg-white/10", children: link.label }) }, link.to)),
      /* @__PURE__ */ jsx("li", { className: "mt-3", children: /* @__PURE__ */ jsx(Link, { to: "/hire-talent", className: "block rounded-full bg-white px-4 py-2.5 text-center font-medium text-black", children: "Start Your Project" }) })
    ] }) })
  ] });
};
const whatsappIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAV0SURBVHgB1VpLUiM5EE2bz4aA8JJvTPUJcJ8Ac4KB5azGcwLoE2BOwHACYDmr7j4B5gTYu9lRHXyCnd3BhuDj6vfKKYftLttVkvzhRShU/8onpVKpTOXEM4IgKLy9vRWjKCridFvrAm/1PRrmcrkQ95uor1Bqd3d3VfGMnHgASb2/v5dardYBTot6uYZSZ53P55u4Fy4sLDR5Aw0QsAa5QJ/fNu/hWhVkv9/f35+LBzgRJLGXl5cDCHSoly5w/M22JzY3N9lIZRzuxMLlclU0ynEIiCWsCPYRq6E+9q1eW1tbe9QI9GgJp5XFxcULF6Kpsb6+vodys7GxcckWlzGD/+D/9J9lGRfYa/jBCUpjbW3tUCYM/PeQ/6YMlCXte6lUFB8MoJJfeQy12X98fAxlClhdXQ1gsC55DJXdTaOy+VEPKDl+tM6PToscwX8/PDx8opWlTJRNXMAPqP5XZMZAmSibNclZJmdgTZKDWK3WvzLjgIznkPV6kOFJHIOvr69HrOFNTNxaZgUcgUOMyY7MI8G5huaYFks+CCgrZeYcPfRBM+6mMc+5gvMkZG8MnSPxwBEJygcFvauBRlF7L5qE+zUuqFvX04sdTwbsz1AFMCy74hnqMJtlkcEPaTvq38Qj2Iv43xUcgkrPDZ3z9sQT8JMCyhFKIxoO3j/TtaEzknoxtpw+xx57DOUmygYS9WLcui1qPA9CTf5EVRUPgJBc1dN3DSQb2OIn7HVxBxfelKNNkC0OL/1CHKHkXL2fiitJjmvGgmI1NTorjuAYikaPtywoiQOopuSWJ1NGtMQdbPX+STZEOdY6K87EDTUEwop5kGOApy4OiNoWsJxwaxffr6D+R7KDGuFi1ev49zZ7kK3u2oNJ1o/hv5AHjI6JnRE7EHuQU5EEAyOIA3YSroV951eSHUWxBGOxqAq0ooG4I0mQjnqpCtv0RiGydADm5uZCVEE8TSDSHIolVMWTUOgaQwX53QClRSAWeH5+jqPoI4NOKTBMcE7cBbXSX2QKiAmiO21bV0aM3wDlUknSASDJpt7je/sooxyMplhgfn4+YE2CYeTu6A6zwhyfZ10kP6OcouzT40Ap4/iTDJgrHefokPMg01fWPagYZSE5Fq+NxWZOo1tw1YIw4b2qWML8i9MEJ3lrc6xIs6YLUG6ihKWR+p6lhHdc/GPmKH/mtSW3xQEZJ/KytImyRzk+uUyrJDzHnj4XezD5Wo0JRu0srCuyGgP+sySDpwFXq1uE8azlYW0YNhAPsZiS+MOxSyiDXNBpwpxlHgkatnzNxbHVpY2roTI4VgfdGpDnb1HDF8+D8NtO9aItfKn4F1dyBBu8RwM0udmwVVM1Fiau8pWxFY5rFK7Ob6LhaOhzXjSAqe/u+FInbMiAKdeGNmFDCijt5VF1wP2StMfoH12XGTbk87QBVt5KEjRsyDxi7xrUtRdnARp+iQbmVdiLbAH5oEjKZ/asJpCipq9Y/IjJF/RevN5stVrnQx/UQdpwzn9PEJRVd2CUU73AzO6wrOmsYVg2OnHBi6xpRbOmJzLj4L4Z1pQ5y3tx1lQHrY9Q+lhg8pnW2ehZJulMzsCQNKowbegOkLO05FJt5bLZQjUO2GwpSxVV44dA7LNuobqexjzJeQ5G75q7g8e6pcwkS1kmtZ2S3lWqbSIJmJOMeHp6qi0tLX1HS+YYX1lZWSktLy//xPX/xSNIDN9lhokrk//Qa3/d3t5mjrA5bWnWsVmRri3IKBcuW5pBhtnmMs9xfEr3URflVvCyKZ2g6lI4ECzppZqWugkOIzwS1xhLBQ3r0VMyG9I7m9mVWNWFmIE3gt3QnuCCd4ckNEwY9D0W6jrQNEKN8SEfpLrxC/P/cm7qiXo/AAAAAElFTkSuQmCC";
const instagramIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAWdSURBVHgB1VpLUuNIEE2Lz4aAgR3fCHECPCfAnKBhOav2nAD3CTAnAE4ALGfV3SfAfQLMbnZWBJ9gZ3ewIfip35Oz3MZty1KpZJsXUS6VXKrKrE9mVmYVxDF83198eXkphmFYRHFL80X+1VM1KBQKAf5vIf+BVL+5uamJYxTEAcjU6+tr6e3tbR/For6uI10x9zyvhf+CmZmZFv/AAPjMwZyv9bfMd3hXA7Pfb29vz8QBMjFIxp6envZBUEVfneP5m+1MrK+vc5DKeNyOiCsUahiUwwAQS1gx2MNYHfmh6+W1sbGxyxWBGS2hWJ2dnT3PwmhirK6u7iI11tbWLjjikjPYB/vTPsuSFzhr6OAIqbmyslKREQP9Vtg3aSAtSb9LtETRoI8l+ZXPWDZ79/f3gYwBy8vLPgTWBZ+xZHeSLFlvWAVljo1esdFxMUew77u7u01KWdJE2iQL2ICu/6pMGEgTabNmcpKZM7BmkptYpdaxTDhA4xlovRwkePruwefn5wPmsCZGLi3TAoZABXuyQ/NQUNdQHFNiyQcBaSXN1NGxFc2+G4eeywrqSdDejNWRqHBABuWDgtZVr1DsKHrVdw0o0h0XdiVsSI5kd4oDTxk8PrUkA9RY/wp9vQkb4H1b4P6UIyAZwOMP0hFSM7QDvzvVY5QV+s1iBNV5u2IJEPU5tGesH5JJxR6ocf5+L1JyZtl7YXvm8oCVsOuWqJEexNr/hKwm9si0tGNwELb3clrw4E3vQptBNFKCcDkXC4Rtn4sv2RAgbWqqd70nc6m3Db0KpIvL1OOaRUEySM5SirokviZ/rpYrOqCY8Nw70NuSEuSF1g2dX9PklB4tsYefoM4h0nG3GtClx9mhMNnWlUDs93y7JHaowxFWnEanbPxK7BG3R8jQHp1H5gUFks4W/ztDmf9xD18OaOMvsQNXxZanI5llBuPwxTBHsY/UxGMj/K3vFnVZ/hvTho2QIchT0TMjKu7BWTrjA/o4QlaV38QyLyNFbhAdhG8D2rFikL5Yfksp6ks+OOGP7q1B+owCrqzPVlJ8EKampgJkfqQmIG0CcY9A89KQekZKOt0mj4+PkUAb6nTKgLRLy3avxSJiENOZR+O+5sNm5kdPfSeYnp72mZNBRnh8cY9OfEF0P/ZB3Qgi4JO4R+BRHyHlMYMlYyxrDIPKPtD/WlreYUEHuDygHaszotEOnir5ouSDA2OhoLMqEm3NJeRLWm4pc3HGuu0hmDHKn56aaVtijzgCuDIuVcn7fGHMNSp5PfPRgvHFPRh8rUUMdtmBNggS1KlK24IhsxfMWZb3yn8QbM3IIoRn3YO04UaXDKGwNPqLA1nSPOm+T60fu09InjpnOIu7YgGVkjXJB4EMNuEGArx8FlU/kR6E3XaiL23xRfLBoY2njQd4Hno7LzS42cwSseUKCN06nSo2dDD03de/RFebI7chz3iN0A7mGGUt9NRteGrK3Y7fRQQwGpjaPceOXz9B9SAiJuOxTR2/F0ibfQO1LmZxnOgXz3x3moDL+xhZ8SMGXzB7kS8Hs3cWW1E3aTNz/HuEIK16A6Oc6ANGduOippOGuGh03wMvoqZVjZoeyYSD92aYk+Y030VRU920VkGQUcDEM62j0ZPMZGbmDAyTZimMG3oD5DQpc4muctlcocoDNlfKEnnV2BAY+1uvUF2OQ09Sz0HoXfJ2cK5XykywlGlU1ylpXSW6JtIHU5ISDw8P9bm5ue8YyQIN44WFhdL8/PxPvP9fHIKMoV0azRX08x9m7Z/r6+vUh99MV5p1b1aly0WIdJ7lSjOYofuwzDKeT2g+/nFjIgWcXEonuHRJHBgs6au6pitzSoB7JMqxl+hw8tVdaS6kdy6zK2O1LIwZOGOwGzoTdNttk4mw7VHze6qZGKEZhDr9Qy6Y6sYv0HgtCZaOzWEAAAAASUVORK5CYII=";
const linkedinIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAATtSURBVHgB3VpLUttAEG0Lw4aC8pJvRTkBzgninIBkmVWcE+CcADgBcAJgmRVwAswJbHbZoSo+xQ5TbCh+znuiZYRjjDwzkuW8qvHoZ8089Ux3T/cUxDF83y89PDyU2+12GadLWpd4q+vRoFAoBLjfQn2E0jw7O6uLYxTEAUjq8fGx8vT0tILTsl5uohyz9jyvhXvB+Ph4izfwAXzWIOfr80vR/3CtDrIH5+fnO+IAVgRJ7O7ubgUdqumlXRzvm0piYWGBH6mKw89h5wqFOj7KegCIIYwIdhFrol53PbwWFxe/ckRAohWcrk1MTOzaEE2Mubm5rygn8/Pzh/zikjLYBtvTNquSFig1NLCBcjU7O1uTjIF2a2ybfWBfkv4v0RDFC30MyT0eY9h8u7y8DGQImJmZ8aGwDnmMIfslyZD13ntAyfGlx3zpsMgRbPvi4uIjtSz7xL6JDfgCHf9rkjOwT+ybMck8k4tgTJKTWLXWpuQc6OMO+tp4S/H0nIP39/errOFNZK4tBwUcgRrmZKfP74K2huqYGktGBOwr+0wb3ffBaN4Nw87ZgnYSfb/qayPxwCoJyoiC3tWbSlGl187C/UoL6tb1liLYb/MLyIijW4rF6EC99l9iCX1PRczBhfCOGIIrG/RhD1LchCcXrj9DzWk79/DSEkqj7QYnuhg2Qlyjesp6GVVd7LAhL6t5W/go22IOLrwZXXgmyGEFL31X7OCKXIQKR4UYgFEFxoKobDxqHpyIgxW5UWfSeCe50Lth8MsjU0a0JB18EQeKyxBNBMLKHsgxwHMs7sFYDb8kHfaWZI9jtL3k6ThPQ4KMjW6j0LayjQBlXeuWtlmX9Mjz/eUi1TEUTCDpwJeXgO9PShTt7cuzrQuJ6QemlH+IQzAWiyFa8uTfiLMrkATn4CeJSYnzPSKn54xsV8WxJMfGxgJUfmgmoG0CcY+AP0rmVechtRU15o2YKTgQh7i9vQ3bLErGACF6GPFIAQmmpoRCCUKcadiwt5BJW8Vi0WdNgoGN35dzBEWdI1lKMBNQaEzP0Q7SyLv2I/MA2uHrorppy+IeZV0bfpBnU7TMZCfqla7nfuD6kWjKzCGYfD3oLPPFEqr2XcMXQ3BNSG4etA0Nr+Q0FmNkPuIrJE+X9U21TzawXU92ox73eAYBuNDt47B/toPw27b0og1ovF057QHKTzEE5z4XvTwO84Nc+SL0fYKL32wXvjoSbLRygLJvKj2mvuFkbzDN9uoGQ23/UdiwE8/pJF+Q3OQQK4964JfDE1no9Z4PjLoUe+UzX6XPIimOYvIF0gsdCEhvp++DnKQa3/dlRMC+6g6MaqI/MLPbL2uaN/TLRvfM8CJruqZZ0w3JObhvhjX7PMj/wqypTtpkqeEhIMpnGmej80zSmlyEiGQ0FIYN3QGynZRcoq1cJluo0oDJlrJ3t3IRfBGIfdItVI1h2EnaOSi9BncHp7qlLEqWsmS1nZLeVaJtIj0wJgPi5uamOTk5eYAvWWDuYXp6ujI1NXWN63/EIUgM76XTXEM7vyG176enpwMvx6y2NOvcXJPYFmSUXZstzSDD+FCV5zjeovvYybUbwMmmdIJDl50DwYpeamphGivgBYRHwhpzqaRhPXpK0Yb0zmZ2JVa3IRbBGcE4VBKMqn0mCQ0e+V2PRRmm6CM0GR9yQSqOv1wC/fznbGdyAAAAAElFTkSuQmCC";
const xIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAUlSURBVHgB1VpJUhtJFP0Sw4aAYMkYUX0C1Cew+gQtlr1qcQLkEyBOAD6BxNIr7BNYPgHSzjsqgiHYIQcbgqn8nvwLC6nGzCxJvIiMrKrMyvw/fw5/yJI4hud5q09PT5UgCCp43dF8lUUjVf1SqeSjvI/8O1L38vKyI45REgcgU8/Pz9WXl5d9vFb0cxepx7xcLvdR5i8sLPRZgAHwmIM5T+vvhP/hWwfMfr26umqLA1gxSMYeHh72QVBDP53g+YupJLa2tjhIdTx+GBBXKnUwKIc+IIYwYnCEsS7yQ9fTa3t7u8YZAYlW8dpcXFw8sWE0MzY2NmpI55ubm9844lIw2Af70z7rUhQoNXRwhHS7vr7ekAkD/TbYN2kgLVn/yzRF0aCHKXnKZ0yb3ZubG1+mgLW1NQ8b1jc+Y8r+k2XKltMqKHNstMdGp8Ucwb6vr6//4i5Lmkib2IAN6PxvyoyBNJE2YyZnmbkQxkxyEeuudSwzDtDYBq1ncRtP5Bp8fHw8YA5tYuK7ZV5AEWhgTb7SnAqeNdyOuWPJOwFpJc08oxMrhutuGuecLXhOgvbbxDMSFQ7IoLxTULuK3RRVesEk1K+ioGpdtBTBfYsjIDkBZXgV6TyIxq3ag3nbPNP/m5ITsVLUM68mBqDGH8SDxGbWHVH3yJQ5IlKK3Dlt1x4IOk5g8ihjGwda/1QsMLajgutTfGiJJYamVhSqKf/WtN55HolHgQrKm+VGjl1sLiDM03UXhVjCh/5jHU8s8Waahi/iCCCwkSDFVkR9TxlzwlyIUGhlNFqhR0scAW1Rf+3EFNfR3/8j37jePKRdetnEHbpwhFXKaJQOnp64xR5SP6bsOJSUbj48Rj66HGRFD23ulHVdOG1cJbEXU8z+WtwxkVMlPFSpuwZ5qpBBz/HUGIDuQ2SfYoqrSE35zVxTCgB9schWaS55UhyaSH5CeVsKwtzcnI/MG9iD8DT7UgAgHY7iXkIVqwM9Cff394M9INXpZAt6pyV+qlaCjFqOKQYMQpxWmkMGJG0ijTQtxwTz8/MeczLouzxgR6FtU23yJf7oaNmqZzHweQ4yfFWIBJVorjPmu0iHMVU9pGw+lex9D04HHhM85HPbbBnRkqGDPEXL4VQ1MtdiwPX9s6waxI44hh7kJJhnXXuoKEnLaTlcLgy+dpwr28SQXdeMKa8lKOS5vQpReLWQNGp068oXAwL3ldDTlHpJBrKVV29MaDQOXXixgxxGa5Duy/HEEPQvgcEvrx8YTbWdpjS7gpxGa5DiyxFDjAVLbadp8MdozT3ygQNfzjBUWOP+JbraDN2GIXOEqVfO2JczCnUbjvuXXG8204BuLkFsXMVUirOCqHjmG2sCIWrupJX3GHyB9HgJiXcI2okVwx3VOv49QZBWvYFRz/QDz8SkqOmsISkaHWnwImra1KhpocaoC/DeDHPSnOe/QdRUF61TM8YlwnimcTR6lpm0Zi5EyGQ4FaYNvQHSyspcpqtcJleoioDJlbJMXjU2BMb+1itUZ9M4J3nOYdM74+3gQq+UhcFSpkldp1RzLv2aSATmJCfu7u66S0tLXzGSJSjCrZWVlery8vJPfP8hDkHG0C6VZvpqPkNq/11cXOSOoVhdada12ZShK8hIJzZXmsHMv3is8x3Pn6g+Ysn3xRBOLqUTnLokDgxW9VNXUy8M7sAZO8ixlmjNe+quDC+kv15mV8Y6NoyFcMbgMFQStPA/kAk1gr2Rar7GLsJB6GIAui6YGsYvgXMkq46t3lsAAAAASUVORK5CYII=";
const socials = [
  { name: "WhatsApp", href: "https://wa.me/2349068563605", icon: whatsappIcon },
  { name: "Instagram", href: "https://www.instagram.com/buimas.agency", icon: instagramIcon },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/buimas", icon: linkedinIcon },
  { name: "X", href: "https://x.com/buimas_agency", icon: xIcon }
];
const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/hire-talent", label: "Hire Talent" }
];
const Footer = () => {
  return /* @__PURE__ */ jsxs("footer", { className: "w-full bg-ink-950 text-white", children: [
    /* @__PURE__ */ jsx("div", { className: "px-6 md:px-10 lg:px-[100px] py-20", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-12 md:grid-cols-3 lg:gap-16", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("img", { src: logo, alt: "Buimas logo", className: "h-8 w-auto" }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-sm text-ink-400", children: "Your trusted partner for custom software development, technical talent, and strategic consulting." }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 text-sm text-ink-500", children: "Open Monday – Friday" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium uppercase tracking-wider text-ink-400", children: "Contact" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 space-y-3 text-ink-300", children: [
          /* @__PURE__ */ jsx("a", { href: "mailto:info@buimas.com", className: "block transition hover:text-white", children: "info@buimas.com" }),
          /* @__PURE__ */ jsx("a", { href: "tel:+2349068563605", className: "block transition hover:text-white", children: "+234 906 856 3605" }),
          /* @__PURE__ */ jsx("a", { href: "tel:+2349167674015", className: "block transition hover:text-white", children: "+234 916 767 4015" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-6 flex items-center gap-3", children: socials.map((social) => /* @__PURE__ */ jsx(
          "a",
          {
            href: social.href,
            target: "_blank",
            rel: "noopener noreferrer",
            "aria-label": social.name,
            className: "flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:border-white/30 hover:bg-white/5",
            children: /* @__PURE__ */ jsx("img", { src: social.icon, alt: "", className: "h-5 w-5" })
          },
          social.name
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium uppercase tracking-wider text-ink-400", children: "Quick Links" }),
        /* @__PURE__ */ jsx("ul", { className: "mt-6 space-y-3 text-ink-300", children: quickLinks.map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: link.to, className: "transition hover:text-white", children: link.label }) }, link.to)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "border-t border-white/10", children: /* @__PURE__ */ jsx("div", { className: "px-6 md:px-10 lg:px-[100px] py-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 text-sm text-ink-500 md:flex-row md:items-center md:justify-between", children: [
      /* @__PURE__ */ jsxs("span", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Buimas Solutions. All rights reserved."
      ] }),
      /* @__PURE__ */ jsx(Link, { to: "/privacy", className: "transition hover:text-white", children: "Privacy Policy" })
    ] }) }) })
  ] });
};
const Hero = () => {
  return /* @__PURE__ */ jsxs("section", { className: "relative h-[75vh] sm:h-[75vh] lg:h-screen w-full overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "video",
      {
        autoPlay: true,
        loop: true,
        muted: true,
        playsInline: true,
        preload: "none",
        className: "absolute inset-0 h-full w-full object-cover",
        children: /* @__PURE__ */ jsx("source", { src: "/videos/hero-bg.mp4", type: "video/mp4" })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/60" }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white", children: [
      /* @__PURE__ */ jsxs("h1", { className: "max-w-4xl text-3xl sm:text-4xl md:text-6xl font-bold leading-tight md:text-6xl", children: [
        "Building Digital Products ",
        /* @__PURE__ */ jsx("br", { className: "hidden md:block" }),
        "That Power",
        " ",
        /* @__PURE__ */ jsx("span", { className: "text-green-500", children: "Growth" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-2xl text-white/80 md:text-lg", children: "We help startups and businesses design, build, and scale reliable software solutions with world-class engineering talent." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-col sm:flex-row gap-4", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/hire-talent",
            className: "w-full sm:w-auto rounded-full bg-white text-black px-6 py-3 text-sm font-medium text-center hover:bg-white/90 transition",
            children: "Start Your Project"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/hire-talent",
            className: "w-full sm:w-auto rounded-full border border-white/40 text-white px-6 py-3 text-sm font-medium text-center hover:bg-white/10 transition",
            children: "Hire Talent"
          }
        )
      ] })
    ] })
  ] });
};
const talentIcon = "data:image/svg+xml,%3csvg%20width='18'%20height='18'%20viewBox='0%200%2018%2018'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_173_10605)'%3e%3cpath%20d='M5.29806%208C4.33378%208.02976%203.54508%208.41072%202.93199%209.14286H1.73556C1.24747%209.14286%200.836751%209.02232%200.503418%208.78125C0.170085%208.54018%200.00341797%208.1875%200.00341797%207.72321C0.00341797%205.62202%200.372466%204.57143%201.11056%204.57143C1.14628%204.57143%201.27574%204.63393%201.49895%204.75893C1.72217%204.88393%202.01235%205.01042%202.36949%205.13839C2.72663%205.26637%203.0808%205.33036%203.43199%205.33036C3.8308%205.33036%204.22663%205.26191%204.61949%205.125C4.58973%205.34524%204.57485%205.54167%204.57485%205.71429C4.57485%206.54167%204.81592%207.30357%205.29806%208ZM14.8606%2013.6875C14.8606%2014.4018%2014.6433%2014.9658%2014.2088%2015.3795C13.7743%2015.7932%2013.1969%2016%2012.4766%2016H4.67306C3.95282%2016%203.37544%2015.7932%202.94092%2015.3795C2.50639%2014.9658%202.28913%2014.4018%202.28913%2013.6875C2.28913%2013.372%202.29955%2013.064%202.32038%2012.7634C2.34122%2012.4628%202.38288%2012.1384%202.44538%2011.7902C2.50788%2011.442%202.58675%2011.119%202.68199%2010.8214C2.77723%2010.5238%202.9052%2010.2336%203.06592%209.95089C3.22663%209.66816%203.41116%209.42708%203.61949%209.22768C3.82782%209.02827%204.08229%208.86905%204.38288%208.75C4.68348%208.63095%205.01532%208.57143%205.37842%208.57143C5.43794%208.57143%205.56592%208.63542%205.76235%208.76339C5.95878%208.89137%206.17604%209.03423%206.41413%209.19197C6.65223%209.3497%206.97068%209.49256%207.36949%209.62054C7.7683%209.74851%208.17008%209.8125%208.57485%209.8125C8.97961%209.8125%209.38139%209.74851%209.7802%209.62054C10.179%209.49256%2010.4975%209.3497%2010.7356%209.19197C10.9737%209.03423%2011.1909%208.89137%2011.3873%208.76339C11.5838%208.63542%2011.7118%208.57143%2011.7713%208.57143C12.1344%208.57143%2012.4662%208.63095%2012.7668%208.75C13.0674%208.86905%2013.3219%209.02827%2013.5302%209.22768C13.7385%209.42708%2013.9231%209.66816%2014.0838%209.95089C14.2445%2010.2336%2014.3725%2010.5238%2014.4677%2010.8214C14.5629%2011.119%2014.6418%2011.442%2014.7043%2011.7902C14.7668%2012.1384%2014.8085%2012.4628%2014.8293%2012.7634C14.8501%2013.064%2014.8606%2013.372%2014.8606%2013.6875ZM5.7177%202.28571C5.7177%202.91667%205.49449%203.45536%205.04806%203.90179C4.60163%204.34821%204.06294%204.57143%203.43199%204.57143C2.80104%204.57143%202.26235%204.34821%201.81592%203.90179C1.36949%203.45536%201.14628%202.91667%201.14628%202.28571C1.14628%201.65476%201.36949%201.11607%201.81592%200.669643C2.26235%200.223214%202.80104%200%203.43199%200C4.06294%200%204.60163%200.223214%205.04806%200.669643C5.49449%201.11607%205.7177%201.65476%205.7177%202.28571ZM12.0034%205.71429C12.0034%206.66071%2011.6686%207.46875%2010.999%208.13839C10.3293%208.80804%209.52128%209.14286%208.57485%209.14286C7.62842%209.14286%206.82038%208.80804%206.15074%208.13839C5.4811%207.46875%205.14628%206.66071%205.14628%205.71429C5.14628%204.76786%205.4811%203.95982%206.15074%203.29018C6.82038%202.62054%207.62842%202.28571%208.57485%202.28571C9.52128%202.28571%2010.3293%202.62054%2010.999%203.29018C11.6686%203.95982%2012.0034%204.76786%2012.0034%205.71429ZM17.1463%207.72321C17.1463%208.1875%2016.9796%208.54018%2016.6463%208.78125C16.3129%209.02232%2015.9022%209.14286%2015.4141%209.14286H14.2177C13.6046%208.41072%2012.8159%208.02976%2011.8516%208C12.3338%207.30357%2012.5748%206.54167%2012.5748%205.71429C12.5748%205.54167%2012.56%205.34524%2012.5302%205.125C12.9231%205.26191%2013.3189%205.33036%2013.7177%205.33036C14.0689%205.33036%2014.4231%205.26637%2014.7802%205.13839C15.1373%205.01042%2015.4275%204.88393%2015.6507%204.75893C15.874%204.63393%2016.0034%204.57143%2016.0391%204.57143C16.7772%204.57143%2017.1463%205.62202%2017.1463%207.72321ZM16.0034%202.28571C16.0034%202.91667%2015.7802%203.45536%2015.3338%203.90179C14.8873%204.34821%2014.3487%204.57143%2013.7177%204.57143C13.0868%204.57143%2012.5481%204.34821%2012.1016%203.90179C11.6552%203.45536%2011.432%202.91667%2011.432%202.28571C11.432%201.65476%2011.6552%201.11607%2012.1016%200.669643C12.5481%200.223214%2013.0868%200%2013.7177%200C14.3487%200%2014.8873%200.223214%2015.3338%200.669643C15.7802%201.11607%2016.0034%201.65476%2016.0034%202.28571Z'%20fill='%231A1A1A'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_173_10605'%3e%3crect%20width='17.15'%20height='17.15'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
const consultingIcon = "/assets/consult-_1MqFJDM.svg";
const transformationIcon = "data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M8.00016%201.33337C6.76249%201.33337%205.5755%201.82504%204.70033%202.70021C3.82516%203.57538%203.3335%204.76236%203.3335%206.00004C3.3335%207.58671%204.12683%208.98004%205.3335%209.82671V11.3334C5.3335%2011.5102%205.40373%2011.6798%205.52876%2011.8048C5.65378%2011.9298%205.82335%2012%206.00016%2012H10.0002C10.177%2012%2010.3465%2011.9298%2010.4716%2011.8048C10.5966%2011.6798%2010.6668%2011.5102%2010.6668%2011.3334V9.82671C11.8735%208.98004%2012.6668%207.58671%2012.6668%206.00004C12.6668%204.76236%2012.1752%203.57538%2011.3%202.70021C10.4248%201.82504%209.23784%201.33337%208.00016%201.33337ZM6.00016%2014C6.00016%2014.1769%206.0704%2014.3464%206.19543%2014.4714C6.32045%2014.5965%206.49002%2014.6667%206.66683%2014.6667H9.3335C9.51031%2014.6667%209.67988%2014.5965%209.8049%2014.4714C9.92992%2014.3464%2010.0002%2014.1769%2010.0002%2014V13.3334H6.00016V14Z'%20fill='%231A1A1A'/%3e%3c/svg%3e";
const Reveal = ({ children, delay = 0, className }) => {
  const reduceMotion = useReducedMotion();
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      className,
      initial: reduceMotion ? false : { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.2 },
      transition: { duration: 0.5, delay, ease: "easeOut" },
      children
    }
  );
};
const expertise = [
  {
    title: "Custom Software Development",
    description: "Custom applications built for performance, security, and scale using modern frameworks.",
    icon: /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-6 w-6",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 1.5,
        children: /* @__PURE__ */ jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M16.5 7.5L19.5 12L16.5 16.5M7.5 16.5L4.5 12L7.5 7.5M14 4L10 20"
          }
        )
      }
    )
  },
  {
    title: "Tech Talent Outsourcing",
    description: "Elite engineering teams integrated seamlessly into your workflow to boost delivery velocity.",
    icon: /* @__PURE__ */ jsx("img", { src: talentIcon, alt: "", className: "h-6 w-6" })
  },
  {
    title: "Technical Consulting",
    description: "Strategic roadmaps to modernize legacy infrastructure and drive digital innovation.",
    icon: /* @__PURE__ */ jsx("img", { src: consultingIcon, alt: "", className: "h-6 w-6" })
  },
  {
    title: "Digital Transformation",
    description: "We help you pivot from outdated systems to cutting-edge, future-ready solutions.",
    icon: /* @__PURE__ */ jsx("img", { src: transformationIcon, alt: "", className: "h-6 w-6" })
  }
];
const CoreExpertiseSection = () => {
  return /* @__PURE__ */ jsxs("section", { className: "w-full bg-ink-950 px-6 md:px-10 lg:px-[100px] py-24", children: [
    /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-medium uppercase tracking-wider text-ink-400", children: "What we do" }),
      /* @__PURE__ */ jsx("h2", { className: "mt-3 text-3xl font-semibold text-white md:text-4xl", children: "Our Core Expertise" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-ink-300", children: "End-to-end technology services tailored to your business — from custom development to strategic talent integration." })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4", children: expertise.map((item, index) => /* @__PURE__ */ jsx(Reveal, { delay: index * 0.1, children: /* @__PURE__ */ jsxs("div", { className: "group h-full rounded-2xl border border-white/10 bg-ink-900 p-6\n              transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-ink-800", children: [
      /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-xl\n                bg-white text-black transition duration-300 group-hover:scale-105", children: item.icon }),
      /* @__PURE__ */ jsx("h3", { className: "mt-6 text-lg font-semibold text-white", children: item.title }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-ink-300", children: item.description })
    ] }) }, item.title)) })
  ] });
};
const steps = [
  {
    id: "01",
    title: "Discover & Plan",
    description: "We start by understanding your business inside out. Through workshops and technical audits, we turn ambiguity into a clear, prioritised plan before a single line of code is written.",
    details: [
      "Stakeholder workshops & goal alignment",
      "Technical & infrastructure audit",
      "Solution architecture blueprint",
      "Prioritised delivery roadmap"
    ],
    tags: ["Tech Audit", "Roadmap", "User Stories"],
    image: "/images/process-discover.png"
  },
  {
    id: "02",
    title: "Design & Build",
    description: "Design and engineering move together in two-week sprints. You see working software early and often, built on clean architecture that won't buckle as you grow.",
    details: [
      "UX wireframes & interactive prototypes",
      "Reusable design system & UI library",
      "Scalable, test-covered codebase",
      "Sprint demos every two weeks"
    ],
    tags: ["Iterative Sprints", "UI/UX", "Clean Code"],
    image: "/images/process-design.png"
  },
  {
    id: "03",
    title: "Test & Launch",
    description: "We don't just ship, we verify. Every release is hardened through automated testing and real-world UAT, then deployed with zero downtime so your users never feel the switch.",
    details: [
      "Automated unit & integration tests",
      "User acceptance testing (UAT)",
      "Performance & security hardening",
      "CI/CD pipeline & zero-downtime deploy"
    ],
    tags: ["QA Automation", "UAT", "CI/CD"],
    image: "/images/process-test.png"
  },
  {
    id: "04",
    title: "Scale & Support",
    description: "Launch is the starting line. We stay on as your engineering partner — monitoring, iterating, and scaling your infrastructure as demand grows.",
    details: [
      "Proactive monitoring & maintenance",
      "Feature iterations from user feedback",
      "Cloud infrastructure scaling",
      "Dedicated support with clear SLAs"
    ],
    tags: ["Maintenance", "Cloud Scaling", "Iterations"],
    image: "/images/process-scale.png"
  }
];
const ProcessSection = () => {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const refs = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number(entry.target.dataset.index));
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    refs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return /* @__PURE__ */ jsxs("section", { className: "w-full bg-white px-6 md:px-10 lg:px-[100px] py-24 md:py-32", children: [
    /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-medium uppercase tracking-wider text-ink-400", children: "How we work" }),
      /* @__PURE__ */ jsx("h2", { className: "mt-3 text-3xl font-semibold text-ink-900 md:text-5xl", children: "Our Process" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-ink-500", children: "A transparent, four-step framework that takes your product from idea to scalable reality, no black boxes, no hidden costs." })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-16 grid gap-12 md:grid-cols-2 md:gap-20", children: [
      /* @__PURE__ */ jsx("div", { className: "hidden md:block", children: /* @__PURE__ */ jsxs("div", { className: "sticky top-28", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative flex aspect-square items-center justify-center\n              overflow-hidden rounded-3xl bg-ink-50", children: [
          /* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute left-6 top-2 select-none\n                text-[10rem] font-bold leading-none text-ink-200", children: steps[active].id }),
          /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
            motion.img,
            {
              src: steps[active].image,
              alt: "",
              initial: reduceMotion ? false : { opacity: 0, scale: 0.96 },
              animate: { opacity: 1, scale: 1 },
              exit: reduceMotion ? void 0 : { opacity: 0, scale: 1.02 },
              transition: { duration: 0.4, ease: "easeOut" },
              className: "relative z-10 max-h-[80%] w-4/5 max-w-md object-contain"
            },
            steps[active].id
          ) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-6 flex gap-2", children: steps.map((s, i) => /* @__PURE__ */ jsx(
          "span",
          {
            className: `h-1 flex-1 rounded-full transition-colors duration-300 ${i === active ? "bg-ink-950" : "bg-ink-200"}`
          },
          s.id
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col", children: steps.map((step, index) => /* @__PURE__ */ jsxs(
        "div",
        {
          "data-index": index,
          ref: (el) => {
            refs.current[index] = el;
          },
          className: `flex flex-col justify-center border-t border-ink-100 py-12
                transition-opacity duration-500 md:min-h-[60vh] ${index === active ? "opacity-100" : "opacity-40"}`,
          children: [
            /* @__PURE__ */ jsxs("p", { className: "text-sm font-medium uppercase tracking-wider text-ink-400", children: [
              "Step ",
              step.id
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "mt-2 text-2xl font-semibold text-ink-900 md:text-3xl", children: step.title }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-md text-ink-500", children: step.description }),
            /* @__PURE__ */ jsx("ul", { className: "mt-6 space-y-2.5", children: step.details.map((detail) => /* @__PURE__ */ jsxs(
              "li",
              {
                className: "flex items-start gap-3 text-sm text-ink-600",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-ink-300" }),
                  detail
                ]
              },
              detail
            )) }),
            /* @__PURE__ */ jsx(
              "img",
              {
                src: step.image,
                alt: "",
                loading: "lazy",
                className: "mt-6 w-full max-w-xs rounded-2xl md:hidden"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "mt-6 flex flex-wrap gap-2", children: step.tags.map((tag) => /* @__PURE__ */ jsx(
              "span",
              {
                className: "rounded-full border border-ink-200 px-3 py-1\n                      text-xs font-medium text-ink-700",
                children: tag
              },
              tag
            )) })
          ]
        },
        step.id
      )) })
    ] })
  ] });
};
const ProjectCard = ({ project }) => {
  const contain = project.fit === "contain";
  const inner = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: contain ? "flex items-center justify-center bg-ink-950 p-4" : "overflow-hidden", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: project.image,
        alt: `${project.name} screenshot`,
        loading: "lazy",
        className: `aspect-[16/10] w-full transition-transform duration-500 group-hover:scale-105 ${contain ? "object-contain" : "object-cover object-top"}`
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4 p-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-medium uppercase tracking-wider text-ink-400", children: project.category }),
        /* @__PURE__ */ jsx("h3", { className: "mt-1 text-lg font-semibold text-white", children: project.name }),
        project.description ? /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-ink-300", children: project.description }) : null
      ] }),
      project.href ? /* @__PURE__ */ jsx("span", { className: "mt-1 flex-none text-ink-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white", children: "↗" }) : null
    ] })
  ] });
  const className = "group block overflow-hidden rounded-2xl border border-white/10 bg-ink-900 transition duration-300 hover:border-white/25";
  return project.href ? /* @__PURE__ */ jsx("a", { href: project.href, target: "_blank", rel: "noopener noreferrer", className, children: inner }) : /* @__PURE__ */ jsx("div", { className, children: inner });
};
const mowoImg = "/assets/mowo-De7OLL5U.png";
const ninthgridWeb = "/assets/ninthgrid-CqelR-1p.png";
const oshodifoodWeb = "/assets/oshodifood-DkA2ydc7.png";
const cyclexWeb = "/assets/cyclexafrica-B7R9GKGD.png";
const projects = [
  {
    name: "Mowo Africa",
    category: "Mobile App",
    description: "Discover amazing products, support local businesses, and earn commissions every time you shop.",
    image: mowoImg,
    href: "https://apps.apple.com/ng/app/mowo-africa/id6746742816",
    fit: "contain"
  },
  {
    name: "Ninthgrid",
    category: "Web Platform",
    description: "Improve your brand’s storytelling with unique Afrocentric stock images and illustrations to reach a diverse audience.",
    image: ninthgridWeb,
    href: "https://ninthgrid.com"
  },
  {
    name: "Oshodi Food",
    category: "Web Platform",
    description: "Deliver delicious meals to your doorstep with Oshodi Food — your go-to destination for authentic African cuisine.",
    image: oshodifoodWeb,
    href: "https://oshodifood.com"
  },
  {
    name: "CyclexAfrica",
    category: "Web Platform",
    description: "Cyclex the future of sustainable waste management in Africa, creating a greener, cleaner future where recycling and sustainability are prioritized.",
    image: cyclexWeb,
    href: "https://cyclexafrica.com/"
  }
];
const FeaturedWork = () => {
  return /* @__PURE__ */ jsxs("section", { className: "w-full bg-ink-950 px-6 md:px-10 lg:px-[100px] py-24 md:py-32", children: [
    /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6 md:flex-row md:items-end md:justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "max-w-2xl", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium uppercase tracking-wider text-ink-400", children: "Selected work" }),
        /* @__PURE__ */ jsx("h2", { className: "mt-3 text-3xl font-semibold text-white md:text-5xl", children: "Products we've shipped" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-ink-300", children: "Real applications, live on the web and in the app stores — built, launched, and scaled for founders across Africa and beyond." })
      ] }),
      /* @__PURE__ */ jsxs(Link, { to: "/about", className: "group inline-flex flex-none items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10", children: [
        "View all work",
        /* @__PURE__ */ jsx("span", { className: "transition-transform group-hover:translate-x-1", children: "→" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "mt-16 grid gap-8 md:grid-cols-2", children: projects.map((project, index) => /* @__PURE__ */ jsx(Reveal, { delay: index * 0.1, children: /* @__PURE__ */ jsx(ProjectCard, { project }) }, project.name)) })
  ] });
};
const testimonials = [
  {
    quote: "Building a community-driven commerce platform required a technology partner that understood both innovation and execution. Their team consistently delivered scalable solutions, exceptional product thinking, and a level of technical expertise that exceeded our expectations. From architecture to user experience, they became an extension of our team and played a key role in bringing our vision to life.",
    name: "Joanna Kolo",
    role: "Founder, Mowo Africa"
  },
  {
    quote: "What impressed us most was their ability to transform complex business requirements into simple, intuitive digital experiences. Their engineering standards, attention to detail, and commitment to delivering on schedule made them a trusted technology partner. We look forward to building many more products together.",
    name: "Ayobami Paul",
    role: "CEO, Kajewa Ltd"
  },
  {
    quote: "Working with this team has been one of the best technology decisions we've made. They combine strategic product thinking with world-class engineering to deliver a solution that is secure, scalable, and built for growth. Their professionalism and dedication have helped accelerate our digital transformation journey.",
    name: "Sule Wisdom",
    role: "CEO, CyclexAfrica"
  }
];
const getInitials = (name) => name.split(" ").map((word) => word[0]).slice(0, 2).join("").toUpperCase();
const Testimonials = () => {
  return /* @__PURE__ */ jsxs("section", { className: "w-full bg-ink-50 px-6 md:px-10 lg:px-[100px] py-24 md:py-32", children: [
    /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-medium uppercase tracking-wider text-ink-400", children: "Testimonials" }),
      /* @__PURE__ */ jsx("h2", { className: "mt-3 text-3xl font-semibold text-ink-900 md:text-4xl", children: "What our clients say" })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "mt-16 grid gap-6 md:grid-cols-3", children: testimonials.map((testimonial, index) => /* @__PURE__ */ jsx(Reveal, { delay: index * 0.1, children: /* @__PURE__ */ jsxs("figure", { className: "flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-8", children: [
      /* @__PURE__ */ jsxs("blockquote", { className: "flex-1 leading-relaxed text-ink-700", children: [
        "“",
        testimonial.quote,
        "”"
      ] }),
      /* @__PURE__ */ jsxs("figcaption", { className: "mt-8 flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-11 w-11 flex-none items-center justify-center rounded-full bg-ink-950 text-sm font-medium text-white", children: getInitials(testimonial.name) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "font-medium text-ink-900", children: testimonial.name }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-ink-500", children: testimonial.role })
        ] })
      ] })
    ] }) }, index)) })
  ] });
};
const faqs = [
  {
    question: "What services does Buimas offer?",
    answer: "We build custom software end to end, outsource senior engineering talent to extend your team, provide technical consulting and architecture, and lead digital transformation for businesses modernising legacy systems."
  },
  {
    question: "How do we get started?",
    answer: "It starts with a free discovery call — no sales fluff, just engineering. We learn your goals, then move through our four-step process: discover and plan, design and build, test and launch, then scale and support."
  },
  {
    question: "How long will my project take?",
    answer: "It depends on scope and complexity, so we give you a realistic timeline after the discovery phase rather than a guess up front. Most engagements run in two-week sprints, so you see progress continuously."
  },
  {
    question: "How much will it cost?",
    answer: "Every project is scoped individually, so there is no one-size price. Book a discovery call and we will give you a clear, transparent estimate based on what you actually need — with no hidden costs."
  },
  {
    question: "Do you sign NDAs?",
    answer: "Yes. We sign an NDA before every consultation, so you can share your idea and infrastructure details with complete confidence."
  },
  {
    question: "Do you provide support after launch?",
    answer: "Launch is just the beginning. We offer proactive maintenance, feature iterations, and infrastructure scaling as your user base grows."
  }
];
const FAQ = () => {
  const [open, setOpen] = useState(0);
  return /* @__PURE__ */ jsx("section", { className: "w-full bg-white px-6 md:px-10 lg:px-[100px] py-24 md:py-32", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-12 lg:grid-cols-3 lg:gap-16", children: [
    /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", { className: "lg:sticky lg:top-28", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-medium uppercase tracking-wider text-ink-400", children: "FAQ" }),
      /* @__PURE__ */ jsx("h2", { className: "mt-3 text-3xl font-semibold text-ink-900 md:text-4xl", children: "Frequently asked questions" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-ink-500", children: "Can't find what you're looking for?" }),
      /* @__PURE__ */ jsx(Link, { to: "/hire-talent", className: "mt-3 inline-flex items-center gap-2 text-sm font-medium text-ink-900 underline underline-offset-4 transition hover:text-ink-600", children: "Get in touch →" })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsx("div", { className: "border-t border-ink-100", children: faqs.map((faq, index) => {
      const isOpen = open === index;
      return /* @__PURE__ */ jsx(Reveal, { delay: index * 0.05, children: /* @__PURE__ */ jsxs("div", { className: "border-b border-ink-100", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => setOpen(isOpen ? null : index),
            "aria-expanded": isOpen,
            className: "flex w-full items-center justify-between gap-4 py-6 text-left",
            children: [
              /* @__PURE__ */ jsx("span", { className: "text-lg font-medium text-ink-900", children: faq.question }),
              /* @__PURE__ */ jsx("span", { className: `flex-none text-2xl leading-none text-ink-400 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`, children: "+" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: isOpen ? /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.3, ease: "easeOut" },
            className: "overflow-hidden",
            children: /* @__PURE__ */ jsx("p", { className: "pb-6 leading-relaxed text-ink-500", children: faq.answer })
          }
        ) : null })
      ] }) }, index);
    }) }) })
  ] }) });
};
const emailIcon = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M4%204.25C3.27065%204.25%202.57118%204.53973%202.05546%205.05546C1.53973%205.57118%201.25%206.27065%201.25%207V17C1.25%2017.7293%201.53973%2018.4288%202.05546%2018.9445C2.57118%2019.4603%203.27065%2019.75%204%2019.75H20C20.7293%2019.75%2021.4288%2019.4603%2021.9445%2018.9445C22.4603%2018.4288%2022.75%2017.7293%2022.75%2017V7C22.75%206.27065%2022.4603%205.57118%2021.9445%205.05546C21.4288%204.53973%2020.7293%204.25%2020%204.25H4ZM7.43%208.386C7.26698%208.27962%207.06899%208.24079%206.87787%208.27771C6.68674%208.31464%206.51746%208.42442%206.4058%208.58387C6.29414%208.74331%206.24884%208.93992%206.27948%209.13215C6.31012%209.32438%206.4143%209.49717%206.57%209.614L11.57%2013.114C11.696%2013.2022%2011.8462%2013.2495%2012%2013.2495C12.1538%2013.2495%2012.304%2013.2022%2012.43%2013.114L17.43%209.614C17.5142%209.55904%2017.5865%209.48771%2017.6426%209.40425C17.6987%209.32079%2017.7374%209.2269%2017.7565%209.12817C17.7756%209.02943%2017.7746%208.92787%2017.7536%208.82952C17.7327%208.73117%2017.6921%208.63804%2017.6345%208.55567C17.5768%208.4733%2017.5031%208.40337%2017.4179%208.35005C17.3326%208.29672%2017.2375%208.26108%2017.1382%208.24525C17.0389%208.22942%2016.9374%208.23373%2016.8398%208.25791C16.7422%208.28208%2016.6504%208.32565%2016.57%208.386L12%2011.585L7.43%208.386Z'%20fill='%231A1A1A'/%3e%3c/svg%3e";
const topics = ["Hire Engineers", "Product Development", "Technical Consulting"];
const ConsultationForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setSubmitting(true);
    try {
      const response = await fetch("https://formspree.io/f/xeeeqwnb", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });
      if (response.ok) {
        toast.success("Request sent successfully. We'll get back to you shortly.");
        form.reset();
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-ink-100 bg-white p-6 shadow-sm md:p-8", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-ink-900", children: "Send us a message" }),
    /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-ink-500", children: "We'll reply with next steps and a calendar invite." }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "mt-6 space-y-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "firstName", className: "text-sm text-ink-700", children: "First name" }),
          /* @__PURE__ */ jsx("input", { id: "firstName", type: "text", name: "firstName", placeholder: "Jane", required: true, className: "mt-2 w-full rounded-lg border border-ink-200 px-4 py-3 text-sm outline-none transition focus:border-ink-900" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "lastName", className: "text-sm text-ink-700", children: "Last name" }),
          /* @__PURE__ */ jsx("input", { id: "lastName", type: "text", name: "lastName", placeholder: "Doe", required: true, className: "mt-2 w-full rounded-lg border border-ink-200 px-4 py-3 text-sm outline-none transition focus:border-ink-900" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "text-sm text-ink-700", children: "Email address" }),
        /* @__PURE__ */ jsx("input", { id: "email", type: "email", name: "email", placeholder: "jane@email.com", required: true, className: "mt-2 w-full rounded-lg border border-ink-200 px-4 py-3 text-sm outline-none transition focus:border-ink-900" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "topic", className: "text-sm text-ink-700", children: "What do you need help with?" }),
        /* @__PURE__ */ jsxs("select", { id: "topic", name: "topic", required: true, defaultValue: "", className: "mt-2 w-full rounded-lg border border-ink-200 px-4 py-3 text-sm outline-none transition focus:border-ink-900", children: [
          /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: "Select a topic" }),
          topics.map((topic) => /* @__PURE__ */ jsx("option", { value: topic, children: topic }, topic))
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "projectDetails", className: "text-sm text-ink-700", children: "Tell us a bit about your project" }),
        /* @__PURE__ */ jsx("textarea", { id: "projectDetails", name: "projectDetails", rows: 4, required: true, placeholder: "Briefly describe your goals or current challenges.", className: "mt-2 w-full rounded-lg border border-ink-200 px-4 py-3 text-sm outline-none transition focus:border-ink-900" })
      ] }),
      /* @__PURE__ */ jsx("button", { type: "submit", disabled: submitting, className: "w-full rounded-lg bg-ink-950 py-4 text-sm font-medium text-white transition hover:bg-ink-800 disabled:cursor-not-allowed disabled:opacity-60", children: submitting ? "Sending…" : "Request consultation" })
    ] })
  ] });
};
const reasons = [
  {
    title: "Senior Engineers Only",
    text: "You talk directly to the engineers building your system, not account managers."
  },
  {
    title: "24/7 Response Time",
    text: "We respect your timeline with quick turnaround on every technical enquiry."
  },
  {
    title: "Vendor Agnostic",
    text: "We recommend the best stack for your needs (AWS, Azure, GCP) — not what pays us commission."
  }
];
const ContactSection = () => {
  return /* @__PURE__ */ jsx("section", { className: "w-full bg-white px-6 md:px-10 lg:px-[100px] py-24 md:py-32", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20", children: [
    /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-medium uppercase tracking-wider text-ink-400", children: "Get in touch" }),
      /* @__PURE__ */ jsx("h2", { className: "mt-3 text-3xl font-semibold text-ink-900 md:text-4xl", children: "Ready to build your solution?" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-xl text-ink-500", children: "Book a free technical discovery call. No sales fluff — just engineering. We sign NDAs before every consultation." }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 space-y-6", children: reasons.map((reason) => /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsx("span", { className: "mt-2 h-1.5 w-1.5 flex-none rounded-full bg-ink-900" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-medium text-ink-900", children: reason.title }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-ink-500", children: reason.text })
        ] })
      ] }, reason.title)) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-12 max-w-sm rounded-2xl border border-ink-100 bg-ink-50 p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-medium text-ink-900", children: "Contact details" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-3 text-sm text-ink-600", children: [
          /* @__PURE__ */ jsxs("a", { href: "mailto:info@buimas.com", className: "flex items-center gap-2 transition hover:text-ink-900", children: [
            /* @__PURE__ */ jsx("img", { src: emailIcon, alt: "", className: "h-4 w-4" }),
            "info@buimas.com"
          ] }),
          /* @__PURE__ */ jsxs("a", { href: "tel:+2349068563605", className: "flex items-center gap-2 transition hover:text-ink-900", children: [
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "📞" }),
            "+234 906 856 3605, +234 916 767 4015"
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Reveal, { delay: 0.1, children: /* @__PURE__ */ jsx(ConsultationForm, {}) })
  ] }) });
};
const Home = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://www.buimas.com/" }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://www.buimas.com/" })
    ] }),
    /* @__PURE__ */ jsx(Hero, {}),
    /* @__PURE__ */ jsx(CoreExpertiseSection, {}),
    /* @__PURE__ */ jsx(ProcessSection, {}),
    /* @__PURE__ */ jsx(FeaturedWork, {}),
    /* @__PURE__ */ jsx(Testimonials, {}),
    /* @__PURE__ */ jsx(FAQ, {}),
    /* @__PURE__ */ jsx(ContactSection, {})
  ] });
};
const htmlIcon = "/assets/html-BjLpCywo.svg";
const cssIcon = "/assets/css-BrgeG5u3.svg";
const jsIcon = "/assets/javascript-DDbNMwxc.svg";
const reactIcon = "/assets/react-TCqKWqnk.svg";
const flutterIcon = "/assets/flutter-oMGVoczw.svg";
const tailwindIcon = "/assets/tailwind-InampFri.svg";
const bootstrapIcon = "/assets/bootstrap-v1U49Kpy.svg";
const javaIcon = "/assets/java-ljJGTo54.svg";
const csharpIcon = "/assets/csharp-fRZ3wKkW.svg";
const pythonIcon = "/assets/python-CciDFRgX.svg";
const figmaIcon = "/assets/figma-CT4sOeIi.svg";
const getstacImg = "/assets/getstac-BwrxCPyK.png";
const spikkImg = "/assets/spikk-Cii4MKDe.png";
const cyclexImg = "/assets/cyclex-B99Ybqnb.png";
const spikkWeb = "/assets/spikk-web-C5qpTaH-.png";
const glodWeb = "/assets/gloed-DJe-QPbP.png";
const mowoWeb = "/assets/mowoafrica-BA09IWGh.png";
const babysittingWeb = "/assets/babysittingbuddies-DvXYvV69.png";
const persziWeb = "/assets/perzsi-SFpveX9G.png";
const skills = [
  { name: "HTML", icon: htmlIcon },
  { name: "CSS", icon: cssIcon },
  { name: "JavaScript", icon: jsIcon },
  { name: "React", icon: reactIcon },
  { name: "Flutter", icon: flutterIcon },
  { name: "Tailwind CSS", icon: tailwindIcon },
  { name: "Bootstrap", icon: bootstrapIcon },
  { name: "Java", icon: javaIcon },
  { name: "C#", icon: csharpIcon },
  { name: "Python", icon: pythonIcon },
  { name: "Figma", icon: figmaIcon }
];
const roles = [
  "Front-end Engineer",
  "Back-end Engineer",
  "DevOps Engineer",
  "AI/ML Engineer",
  "QA Engineer",
  "Cyber Security Expert",
  "UI/UX Designer",
  "Data Scientist",
  "Product Manager"
];
const mobileProjects = [
  { name: "Mowo Africa", category: "Mobile App", image: mowoImg, href: "https://apps.apple.com/ng/app/mowo-africa/id6746742816", fit: "contain" },
  { name: "Getstac", category: "Mobile App", image: getstacImg, href: "https://play.google.com/store/apps/details?id=com.getstac.getstac_beta&hl=en", fit: "contain" },
  { name: "Spikk", category: "Mobile App", image: spikkImg, href: "https://play.google.com/store/apps/details?id=com.spikk&hl=en", fit: "contain" },
  { name: "CyclexAfrica", category: "Mobile App", image: cyclexImg, href: "https://play.google.com/store/apps/details?id=com.cyclex.mobile&hl=en", fit: "contain" }
];
const webProjects = [
  { name: "Spikk", category: "Web Platform", image: spikkWeb, href: "https://spikk.co" },
  { name: "Ninthgrid", category: "Web Platform", image: ninthgridWeb, href: "https://ninthgrid.com" },
  { name: "Oshodi Food", category: "Web Platform", image: oshodifoodWeb, href: "https://oshodifood.com" },
  { name: "Glod", category: "Web Platform", image: glodWeb, href: "https://glod.io" },
  { name: "Mowo Africa", category: "Web Platform", image: mowoWeb, href: "https://mowoafrica.com" },
  { name: "Babysitting Buddies", category: "Web Platform", image: babysittingWeb, href: "https://babysittingbuddiesci.com" },
  { name: "Perszi", category: "Web Platform", image: persziWeb, href: "https://perszi.com" },
  { name: "CyclexAfrica", category: "Web Platform", image: cyclexWeb, href: "https://cyclexafrica.com" }
];
const About = () => {
  return /* @__PURE__ */ jsxs("main", { className: "w-full", children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "About" }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Learn about Buimas — the team designing, building, and scaling reliable software products and providing senior engineering talent." }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "About Buimas" }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: "The team designing, building, and scaling reliable software products and providing senior engineering talent." }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://www.buimas.com/about" }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://www.buimas.com/about" })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "w-full bg-white px-6 md:px-10 lg:px-[100px] pt-36 pb-24", children: /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-medium uppercase tracking-wider text-ink-400", children: "About Buimas" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-3 text-4xl font-semibold text-ink-900 md:text-5xl", children: "We build the software behind growing businesses" }),
      /* @__PURE__ */ jsx("p", { className: "mt-6 text-lg leading-relaxed text-ink-500", children: "Buimas is a global software development agency providing on-demand teams of engineers and tech professionals to build custom, high-performing solutions. Our mission is to help businesses innovate and scale through technology, with flexible, scalable, and cost-efficient delivery." })
    ] }) }) }),
    /* @__PURE__ */ jsxs("section", { className: "w-full bg-ink-50 px-6 md:px-10 lg:px-[100px] py-24", children: [
      /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium uppercase tracking-wider text-ink-400", children: "Our toolkit" }),
        /* @__PURE__ */ jsx("h2", { className: "mt-3 text-3xl font-semibold text-ink-900 md:text-4xl", children: "Skills & Technologies" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6", children: skills.map((skill, index) => /* @__PURE__ */ jsx(Reveal, { delay: index * 0.05, children: /* @__PURE__ */ jsxs("div", { className: "group flex h-full flex-col items-center justify-center gap-4 rounded-xl border border-ink-100 bg-white p-6 transition duration-300 hover:border-ink-900 hover:bg-ink-950", children: [
        /* @__PURE__ */ jsx("img", { src: skill.icon, alt: "", className: "h-10 w-10" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-ink-800 transition duration-300 group-hover:text-white", children: skill.name })
      ] }) }, skill.name)) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "w-full bg-white px-6 md:px-10 lg:px-[100px] py-24", children: [
      /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium uppercase tracking-wider text-ink-400", children: "Talent on demand" }),
        /* @__PURE__ */ jsx("h2", { className: "mt-3 text-3xl font-semibold text-ink-900 md:text-4xl", children: "Roles we provide" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-ink-500", children: "Embed senior, vetted specialists into your team across the full product lifecycle." })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3", children: roles.map((role, index) => /* @__PURE__ */ jsx(Reveal, { delay: index * 0.05, children: /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-ink-200 bg-white px-6 py-5 text-center font-medium text-ink-900 transition duration-300 hover:border-ink-900 hover:shadow-sm", children: role }) }, role)) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "w-full bg-ink-950 px-6 md:px-10 lg:px-[100px] py-24 md:py-32", children: [
      /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium uppercase tracking-wider text-ink-400", children: "Our work" }),
        /* @__PURE__ */ jsx("h2", { className: "mt-3 text-3xl font-semibold text-white md:text-4xl", children: "Products we've shipped" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-ink-300", children: "A selection of mobile and web products we've designed, built, and launched." })
      ] }) }),
      /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx("h3", { className: "mt-16 text-sm font-medium uppercase tracking-wider text-ink-400", children: "Mobile apps" }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: mobileProjects.map((project, index) => /* @__PURE__ */ jsx(Reveal, { delay: index * 0.05, children: /* @__PURE__ */ jsx(ProjectCard, { project }) }, project.name)) }),
      /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx("h3", { className: "mt-16 text-sm font-medium uppercase tracking-wider text-ink-400", children: "Web platforms" }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: webProjects.map((project, index) => /* @__PURE__ */ jsx(Reveal, { delay: index * 0.05, children: /* @__PURE__ */ jsx(ProjectCard, { project }) }, `${project.name}-web`)) })
    ] })
  ] });
};
const HireTalent = () => {
  return /* @__PURE__ */ jsxs("main", { className: "pt-8 md:pt-12", children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Hire Talent" }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Extend your team with senior Buimas engineers, integrated into your workflow to help you ship faster." }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Hire Engineering Talent · Buimas" }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: "Extend your team with senior Buimas engineers, integrated into your workflow to help you ship faster." }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://www.buimas.com/hire-talent" }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://www.buimas.com/hire-talent" })
    ] }),
    /* @__PURE__ */ jsx(ContactSection, {})
  ] });
};
const Privacy = () => {
  return /* @__PURE__ */ jsxs("main", { className: "w-full bg-white px-6 md:px-10 lg:px-[100px] pt-36 pb-24", children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Privacy Policy" }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "How Buimas collects, uses, and protects your information." }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://www.buimas.com/privacy" }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://www.buimas.com/privacy" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-medium uppercase tracking-wider text-ink-400", children: "Legal" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-3 text-4xl font-semibold text-ink-900 md:text-5xl", children: "Privacy Policy" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm text-ink-500", children: "Last updated: 2026-06-14" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-12 space-y-10 leading-relaxed text-ink-600", children: [
        /* @__PURE__ */ jsx("p", { children: 'This Privacy Policy explains how Buimas Solutions ("Buimas", "we", "us", or "our") collects, uses, and protects your personal information when you visit www.buimas.com or get in touch with us. We are committed to handling your data responsibly and in line with the Nigeria Data Protection Act (NDPA) 2023 and other applicable laws.' }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-ink-900", children: "1. Information we collect" }),
          /* @__PURE__ */ jsx("p", { className: "mt-3", children: "When you submit our contact or consultation form, we collect the information you choose to provide; typically your name, email address, and details about your project. If you reach out by email, phone, or social media, we collect whatever information those messages contain." }),
          /* @__PURE__ */ jsx("p", { className: "mt-3", children: "We may also automatically collect limited technical information, such as your browser type, device, and the pages you visit, to understand how the site is used." })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-ink-900", children: "2. How we use your information" }),
          /* @__PURE__ */ jsxs("ul", { className: "mt-3 list-disc space-y-2 pl-5", children: [
            /* @__PURE__ */ jsx("li", { children: "To respond to your enquiries and provide the services you request." }),
            /* @__PURE__ */ jsx("li", { children: "To communicate with you about your project, proposals, or scheduling." }),
            /* @__PURE__ */ jsx("li", { children: "To operate, maintain, and improve our website." }),
            /* @__PURE__ */ jsx("li", { children: "To comply with our legal and regulatory obligations." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-ink-900", children: "3. How we share your information" }),
          /* @__PURE__ */ jsx("p", { className: "mt-3", children: "We do not sell your personal information. We share it only with trusted service providers who help us run our website and respond to you, including:" }),
          /* @__PURE__ */ jsxs("ul", { className: "mt-3 list-disc space-y-2 pl-5", children: [
            /* @__PURE__ */ jsx("li", { children: "Formspree, which processes our contact-form submissions." }),
            /* @__PURE__ */ jsx("li", { children: "Vercel, which hosts and serves our website." }),
            /* @__PURE__ */ jsx("li", { children: "Google Fonts, which delivers the typography used on the site." })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-3", children: "These providers may process data outside Nigeria. We may also disclose information where required by law." })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-ink-900", children: "4. Cookies and tracking" }),
          /* @__PURE__ */ jsx("p", { className: "mt-3", children: "Buimas does not use cookies for advertising, profiling, or cross-site tracking, and we do not currently run analytics tools that store cookies on your device. The third-party services that power this site, our form provider (Formspree) and font delivery (Google Fonts), may receive standard technical request data, such as your IP address, when those features load or are used, but we do not use this to track you across the web. You can block or delete cookies at any time through your browser settings." })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-ink-900", children: "5. Data retention" }),
          /* @__PURE__ */ jsx("p", { className: "mt-3", children: "We keep your personal information only for as long as needed to fulfil the purposes described in this policy, to maintain our business records, or to comply with the law." })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-ink-900", children: "6. Your rights" }),
          /* @__PURE__ */ jsx("p", { className: "mt-3", children: "Under the NDPA, you have the right to access the personal data we hold about you, to request correction or deletion, to object to or restrict its processing, to data portability, and to withdraw consent at any time. To exercise any of these rights, contact us using the details below." })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-ink-900", children: "7. Data security" }),
          /* @__PURE__ */ jsx("p", { className: "mt-3", children: "We take reasonable technical and organisational measures to protect your information. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security." })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-ink-900", children: "8. Links to other websites" }),
          /* @__PURE__ */ jsx("p", { className: "mt-3", children: "Our site may link to external websites, including the live projects in our portfolio. We are not responsible for the privacy practices of those sites and encourage you to review their policies." })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-ink-900", children: "9. Changes to this policy" }),
          /* @__PURE__ */ jsx("p", { className: "mt-3", children: 'We may update this Privacy Policy from time to time. When we do, we will revise the "last updated" date above. We encourage you to review this page periodically.' })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-ink-900", children: "10. Contact us" }),
          /* @__PURE__ */ jsxs("p", { className: "mt-3", children: [
            "If you have any questions about this policy or how we handle your data, contact us at",
            " ",
            /* @__PURE__ */ jsx("a", { href: "mailto:info@buimas.com", className: "font-medium text-ink-900 underline underline-offset-4 hover:text-ink-600", children: "info@buimas.com" }),
            "."
          ] })
        ] })
      ] })
    ] })
  ] });
};
const NotFound = () => {
  return /* @__PURE__ */ jsxs("main", { className: "flex min-h-screen flex-col items-center justify-center bg-white px-6 py-24 text-center", children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Page Not Found" }),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "noindex" })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-8xl font-bold leading-none text-ink-200 md:text-9xl", children: "404" }),
    /* @__PURE__ */ jsx("h1", { className: "mt-6 text-3xl font-semibold text-ink-900 md:text-4xl", children: "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-md text-ink-500", children: "The page you're looking for doesn't exist or may have moved. Let's get you back on track." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col gap-3 sm:flex-row", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "rounded-full bg-ink-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-ink-800", children: "Back to home" }),
      /* @__PURE__ */ jsx(Link, { to: "/hire-talent", className: "rounded-full border border-ink-200 px-6 py-3 text-sm font-medium text-ink-900 transition hover:border-ink-900 hover:bg-ink-50", children: "Start a project" })
    ] })
  ] });
};
const App = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      Helmet,
      {
        defaultTitle: "Buimas — Custom Software Development & Engineering Talent",
        titleTemplate: "%s · Buimas",
        children: [
          /* @__PURE__ */ jsx("meta", { name: "description", content: "Buimas designs, builds, and scales reliable software products — and embeds senior engineering talent into your team." }),
          /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Buimas — Custom Software Development & Engineering Talent" }),
          /* @__PURE__ */ jsx("meta", { property: "og:description", content: "We design, build, and scale reliable software products with world-class engineering talent." })
        ]
      }
    ),
    /* @__PURE__ */ jsx(Toaster, { position: "top-right" }),
    /* @__PURE__ */ jsx(ScrollToTop, {}),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs(Routes, { children: [
      /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Home, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/about", element: /* @__PURE__ */ jsx(About, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/hire-talent", element: /* @__PURE__ */ jsx(HireTalent, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/privacy", element: /* @__PURE__ */ jsx(Privacy, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFound, {}) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
function render(url) {
  const helmetContext = {};
  const html = renderToString(
    /* @__PURE__ */ jsx(HelmetProvider, { context: helmetContext, children: /* @__PURE__ */ jsx(StaticRouter, { location: url, children: /* @__PURE__ */ jsx(App, {}) }) })
  );
  const { helmet } = helmetContext;
  const head = helmet ? helmet.title.toString() + helmet.meta.toString() + helmet.link.toString() : "";
  return { html, head };
}
export {
  render
};
