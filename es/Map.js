"use strict";

import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _omit from "lodash-es/omit";
import { latLngBounds, Map as LeafletMap } from 'leaflet';
import React from 'react';
import { LeafletProvider } from './context';
import MapEvented from './MapEvented';
import updateClassName from './utils/updateClassName';
var OTHER_PROPS = ['children', 'className', 'id', 'style', 'useFlyTo', 'whenReady'];

var normalizeCenter = function normalizeCenter(pos) {
  return Array.isArray(pos) ? [pos[0], pos[1]] : [pos.lat, pos.lon ? pos.lon : pos.lng];
};

var Map =
/*#__PURE__*/
function (_MapEvented) {
  _inheritsLoose(Map, _MapEvented);

  function Map(props) {
    var _this;

    _this = _MapEvented.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "className", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "contextValue", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "container", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "viewport", {
      center: undefined,
      zoom: undefined
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_updating", false);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onViewportChange", function () {
      var center = _this.leafletElement.getCenter();

      _this.viewport = {
        center: center ? [center.lat, center.lng] : undefined,
        zoom: _this.leafletElement.getZoom()
      };

      if (_this.props.onViewportChange && !_this._updating) {
        _this.props.onViewportChange(_this.viewport);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onViewportChanged", function () {
      if (_this.props.onViewportChanged && !_this._updating) {
        _this.props.onViewportChanged(_this.viewport);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "bindContainer", function (container) {
      _this.container = container;
    });

    _this.className = props.className;
    return _this;
  }

  var _proto = Map.prototype;

  _proto.createLeafletElement = function createLeafletElement(props) {
    var viewport = props.viewport,
        options = _objectWithoutPropertiesLoose(props, ["viewport"]);

    if (viewport) {
      if (viewport.center) {
        options.center = viewport.center;
      }

      if (typeof viewport.zoom === 'number') {
        options.zoom = viewport.zoom;
      }
    }

    if (typeof props.rotate === 'number') {
      options.rotate = props.rotate;
    }

    return new LeafletMap(this.container, options);
  };

  _proto.updateLeafletElement = function updateLeafletElement(fromProps, toProps) {
    this._updating = true;
    var animate = toProps.animate,
        bounds = toProps.bounds,
        boundsOptions = toProps.boundsOptions,
        boxZoom = toProps.boxZoom,
        center = toProps.center,
        className = toProps.className,
        doubleClickZoom = toProps.doubleClickZoom,
        dragging = toProps.dragging,
        keyboard = toProps.keyboard,
        maxBounds = toProps.maxBounds,
        scrollWheelZoom = toProps.scrollWheelZoom,
        tap = toProps.tap,
        touchZoom = toProps.touchZoom,
        useFlyTo = toProps.useFlyTo,
        viewport = toProps.viewport,
        rotate = toProps.rotate,
        zoom = toProps.zoom;
    updateClassName(this.container, fromProps.className, className);

    if (viewport && viewport !== fromProps.viewport) {
      var c = viewport.center ? viewport.center : center;
      var z = viewport.zoom == null ? zoom : viewport.zoom;

      if (useFlyTo === true) {
        this.leafletElement.flyTo(c, z, {
          animate: animate
        });
      } else {
        this.leafletElement.setView(c, z, {
          animate: animate
        });
      }
    } else if (center && this.shouldUpdateCenter(center, fromProps.center)) {
      if (useFlyTo === true) {
        this.leafletElement.flyTo(center, zoom, {
          animate: animate
        });
      } else {
        this.leafletElement.setView(center, zoom, {
          animate: animate
        });
      }
    } else if (typeof zoom === 'number' && zoom !== fromProps.zoom) {
      if (fromProps.zoom == null) {
        this.leafletElement.setView(center, zoom);
      } else {
        this.leafletElement.setZoom(zoom);
      }
    }

    if (typeof rotate === 'number' && rotate !== fromProps.rotate) {
      console.log("Bearing", rotate);
      this.leafletElement.setBearing(toProps.rotate);
    }

    if (maxBounds && this.shouldUpdateBounds(maxBounds, fromProps.maxBounds)) {
      this.leafletElement.setMaxBounds(maxBounds);
    }

    if (bounds && (this.shouldUpdateBounds(bounds, fromProps.bounds) || boundsOptions !== fromProps.boundsOptions)) {
      if (useFlyTo === true) {
        this.leafletElement.flyToBounds(bounds, boundsOptions);
      } else {
        this.leafletElement.fitBounds(bounds, boundsOptions);
      }
    }

    if (boxZoom !== fromProps.boxZoom) {
      if (boxZoom === true) {
        this.leafletElement.boxZoom.enable();
      } else {
        this.leafletElement.boxZoom.disable();
      }
    }

    if (doubleClickZoom !== fromProps.doubleClickZoom) {
      if (doubleClickZoom === true) {
        this.leafletElement.doubleClickZoom.enable();
      } else {
        this.leafletElement.doubleClickZoom.disable();
      }
    }

    if (dragging !== fromProps.dragging) {
      if (dragging === true) {
        this.leafletElement.dragging.enable();
      } else {
        this.leafletElement.dragging.disable();
      }
    }

    if (keyboard !== fromProps.keyboard) {
      if (keyboard === true) {
        this.leafletElement.keyboard.enable();
      } else {
        this.leafletElement.keyboard.disable();
      }
    }

    if (scrollWheelZoom !== fromProps.scrollWheelZoom) {
      if (scrollWheelZoom === true || typeof scrollWheelZoom === 'string') {
        this.leafletElement.options.scrollWheelZoom = scrollWheelZoom;
        this.leafletElement.scrollWheelZoom.enable();
      } else {
        this.leafletElement.scrollWheelZoom.disable();
      }
    }

    if (tap !== fromProps.tap) {
      if (tap === true) {
        this.leafletElement.tap.enable();
      } else {
        this.leafletElement.tap.disable();
      }
    }

    if (touchZoom !== fromProps.touchZoom) {
      if (touchZoom === true || typeof touchZoom === 'string') {
        this.leafletElement.options.touchZoom = touchZoom;
        this.leafletElement.touchZoom.enable();
      } else {
        this.leafletElement.touchZoom.disable();
      }
    }

    this._updating = false;
  };

  _proto.componentDidMount = function componentDidMount() {
    var props = _omit(this.props, OTHER_PROPS);

    this.leafletElement = this.createLeafletElement(props);
    this.leafletElement.on('move', this.onViewportChange);
    this.leafletElement.on('moveend', this.onViewportChanged);

    if (props.bounds != null) {
      this.leafletElement.fitBounds(props.bounds, props.boundsOptions);
    }

    if (props.rotate != null) {
      this.leafletElement.setBearing(props.rotate);
    }

    if (this.props.whenReady) {
      this.leafletElement.whenReady(this.props.whenReady);
    }

    this.contextValue = {
      layerContainer: this.leafletElement,
      map: this.leafletElement
    };

    _MapEvented.prototype.componentDidMount.call(this);

    this.forceUpdate(); // Re-render now that leafletElement is created
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    this.updateLeafletElement(prevProps, this.props);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    _MapEvented.prototype.componentWillUnmount.call(this);

    this.leafletElement.off('move', this.onViewportChange);
    this.leafletElement.off('moveend', this.onViewportChanged); // The canvas renderer uses requestAnimationFrame, making a deferred call to a deleted object
    // When preferCanvas is set, use simpler teardown logic

    if (this.props.preferCanvas === true) {
      this.leafletElement._initEvents(true);

      this.leafletElement._stop();
    } else {
      this.leafletElement.remove();
    }
  };

  _proto.shouldUpdateCenter = function shouldUpdateCenter(next, prev) {
    if (!prev) return true;
    next = normalizeCenter(next);
    prev = normalizeCenter(prev);
    return next[0] !== prev[0] || next[1] !== prev[1];
  };

  _proto.shouldUpdateBounds = function shouldUpdateBounds(next, prev) {
    return prev ? !latLngBounds(next).equals(latLngBounds(prev)) : true;
  };

  _proto.render = function render() {
    return React.createElement("div", {
      className: this.className,
      id: this.props.id,
      ref: this.bindContainer,
      style: this.props.style
    }, this.contextValue ? React.createElement(LeafletProvider, {
      value: this.contextValue
    }, this.props.children) : null);
  };

  return Map;
}(MapEvented);

export { Map as default };