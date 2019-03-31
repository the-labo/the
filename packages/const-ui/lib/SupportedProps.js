/**
 * Supported props
 * @enum {string} SupportedProps
 */
'use strict'

const SupportedProps = Object.freeze(
  /** @lends SupportedProps */
  {
    /**
     * All Supported HTML Attributes
     * @see https://facebook.github.io/react/docs/dom-elements.html#all-supported-html-attributes
     */
    htmlAttributes:
      'accept,acceptCharset,accessKey,action,allowFullScreen,allowTransparency,alt,async,autoComplete,autoFocus,autoPlay,capture,cellPadding,cellSpacing,challenge,charSet,checked,cite,classID,className,colSpan,cols,content,contentEditable,contextMenu,controls,coords,crossOrigin,data,dateTime,default,defer,dir,disabled,download,draggable,encType,form,formAction,formEncType,formMethod,formNoValidate,formTarget,frameBorder,headers,height,hidden,high,href,hrefLang,htmlFor,httpEquiv,icon,id,inputMode,integrity,is,keyParams,keyType,kind,label,lang,list,loop,low,manifest,marginHeight,marginWidth,max,maxLength,media,mediaGroup,method,min,minLength,multiple,muted,name,noValidate,nonce,open,optimum,pattern,placeholder,poster,preload,profile,radioGroup,readOnly,rel,required,reversed,role,rowSpan,rows,sandbox,scope,scoped,scrolling,seamless,selected,shape,size,sizes,span,spellCheck,src,srcDoc,srcLang,srcSet,start,step,style,summary,tabIndex,target,title,type,useMap,value,width,wmode,wrap',
    /**
     * Image Events
     * @see https://facebook.github.io/react/docs/events.html#image-events
     */
    imageEvents: 'onLoad,onError',
    /**
     * Media Events
     * @see https://facebook.github.io/react/docs/events.html#media-events
     */
    mediaEvents:
      'onAbort,onCanPlay,onCanPlayThrough,onDurationChange,onEmptied,onEncrypted,onEnded,onError,onLoadedData,onLoadedMetadata,onLoadStart,onPause,onPlay,onPlaying,onProgress,onRateChange,onSeeked,onSeeking,onStalled,onSuspend,onTimeUpdate,onVolumeChange,onWaiting',
    /**
     * Mouse Events
     * @see https://facebook.github.io/react/docs/events.html#mouse-events
     */
    mouseEvents:
      'onClick,onContextMenu,onDoubleClick,onDrag,onDragEnd,onDragEnter,onDragExit,onDragLeave,onDragOver,onDragStart,onDrop,onMouseDown,onMouseEnter,onMouseLeave,onMouseMove,onMouseOut,onMouseOver,onMouseUp',
    /**
     * Selection Events
     * @see https://facebook.github.io/react/docs/events.html#selection-events
     */
    selectionEvents: 'onSelect',
    /**
     * All Supported SVG Attributes
     * @see https://facebook.github.io/react/docs/dom-elements.html#all-supported-svg-attributes
     */
    svgAttributes:
      'accentHeight,accumulate,additive,alignmentBaseline,allowReorder,alphabetic,amplitude,arabicForm,ascent,attributeName,attributeType,autoReverse,azimuth,baseFrequency,baseProfile,baselineShift,bbox,begin,bias,by,calcMode,capHeight,clip,clipPath,clipPathUnits,clipRule,colorInterpolation,colorInterpolationFilters,colorProfile,colorRendering,contentScriptType,contentStyleType,cursor,cx,cy,d,decelerate,descent,diffuseConstant,direction,display,divisor,dominantBaseline,dur,dx,dy,edgeMode,elevation,enableBackground,end,exponent,externalResourcesRequired,fill,fillOpacity,fillRule,filter,filterRes,filterUnits,floodColor,floodOpacity,focusable,fontFamily,fontSize,fontSizeAdjust,fontStretch,fontStyle,fontVariant,fontWeight,format,from,fx,fy,g1,g2,glyphName,glyphOrientationHorizontal,glyphOrientationVertical,glyphRef,gradientTransform,gradientUnits,hanging,horizAdvX,horizOriginX,ideographic,imageRendering,in,in2,intercept,k,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,lengthAdjust,letterSpacing,lightingColor,limitingConeAngle,local,markerEnd,markerHeight,markerMid,markerStart,markerUnits,markerWidth,mask,maskContentUnits,maskUnits,mathematical,mode,numOctaves,offset,opacity,operator,order,orient,orientation,origin,overflow,overlinePosition,overlineThickness,paintOrder,panose1,pathLength,patternContentUnits,patternTransform,patternUnits,pointerEvents,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,r,radius,refX,refY,renderingIntent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,result,rotate,rx,ry,scale,seed,shapeRendering,slope,spacing,specularConstant,specularExponent,speed,spreadMethod,startOffset,stdDeviation,stemh,stemv,stitchTiles,stopColor,stopOpacity,strikethroughPosition,strikethroughThickness,string,stroke,strokeDasharray,strokeDashoffset,strokeLinecap,strokeLinejoin,strokeMiterlimit,strokeOpacity,strokeWidth,surfaceScale,systemLanguage,tableValues,targetX,targetY,textAnchor,textDecoration,textLength,textRendering,to,transform,u1,u2,underlinePosition,underlineThickness,unicode,unicodeBidi,unicodeRange,unitsPerEm,vAlphabetic,vHanging,vIdeographic,vMathematical,values,vectorEffect,version,vertAdvY,vertOriginX,vertOriginY,viewBox,viewTarget,visibility,widths,wordSpacing,writingMode,x,x1,x2,xChannelSelector,xHeight,xlinkActuate,xlinkArcrole,xlinkHref,xlinkRole,xlinkShow,xlinkTitle,xlinkType,xmlns,xmlnsXlink,xmlBase,xmlLang,xmlSpace,y,y1,y2,yChannelSelector,z,zoomAndPan',
    /**
     * Touch Events
     * @see https://facebook.github.io/react/docs/events.html#touch-events
     */
    touchEvents: 'onTouchCancel,onTouchEnd,onTouchMove,onTouchStart',
    /**
     * UI Events
     * @see https://facebook.github.io/react/docs/events.html#ui-events
     */
    uiEvents: 'onScroll',
  },
)

module.exports = SupportedProps
