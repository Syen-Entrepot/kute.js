import KUTE from '../objects/kute.js'
import defaultValues from '../objects/defaultValues.js'
import Components from '../objects/components.js'
import getStyleForProperty from '../process/getStyleForProperty.js' 
import trueDimension from '../util/trueDimension.js' 
import {numbers} from '../objects/interpolate.js' 

// Component Properties
const boxModelProperties = ['top', 'left', 'width', 'height', 'right', 'bottom', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight', 
                          'padding', 'paddingTop','paddingBottom', 'paddingLeft', 'paddingRight', 
                          'margin', 'marginTop','marginBottom', 'marginLeft', 'marginRight', 
                          'borderWidth', 'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth', 'outlineWidth']
const boxModelValues = {}
boxModelProperties.map(x => boxModelValues[x] = 0);

// Component Functions
export function boxModelOnStart(tweenProp){
  if (tweenProp in this.valuesEnd && !KUTE[tweenProp]) {
    KUTE[tweenProp] = (elem, a, b, v) => {
      elem.style[tweenProp] = `${v > 0.99 || v < 0.01 ? ((numbers(a,b,v)*10)>>0)/10 : (numbers(a,b,v) ) >> 0}px`;
      // elem.style[tweenProp] = `${(numbers(a,b,v) ) >> 0}px`;
    }
  }
}
export function getBoxModel(tweenProp){
  return getStyleForProperty(this.element,tweenProp) || defaultValues[tweenProp];
}
export function prepareBoxModel(tweenProp,value){
  const boxValue = trueDimension(value), offsetProp = tweenProp === 'height' ? 'offsetHeight' : 'offsetWidth';
  return boxValue.u === '%' ? boxValue.v * this.element[offsetProp] / 100 : boxValue.v;
}
const boxPropsOnStart = {}
boxModelProperties.map(x => boxPropsOnStart[x] = boxModelOnStart );

// All Component Functions
const boxModelFunctions = {
  prepareStart: getBoxModel,
  prepareProperty: prepareBoxModel,
  onStart: boxPropsOnStart
}

// Component Full Component
export const boxModelOps = {
  component: 'boxModelProps',
  category: 'boxModel',
  properties: boxModelProperties,
  defaultValues: boxModelValues,
  Interpolate: {numbers},
  functions: boxModelFunctions
}

Components.BoxModelProperties = boxModelOps