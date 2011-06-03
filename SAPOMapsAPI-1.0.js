if (typeof (SAPO) == 'undefined') {
    window.SAPO = {};
} else {
    window.SAPO = window.SAPO;
}
SAPO.namespace = function (ns) {
    if (!ns || !ns.length) {
        return null;
    }
    var levels = ns.split(".");
    var nsobj = SAPO;
    for (var i = (levels[0] == "SAPO") ? 1 : 0; i < levels.length; ++i) {
        nsobj[levels[i]] = nsobj[levels[i]] || {};
        nsobj = nsobj[levels[i]];
    }
    return nsobj;
};

function s$(element) {
    if (arguments.length > 1) {
        for (var i = 0, elements = [], length = arguments.length; i < length; i++) {
            elements.push(s$(arguments[i]));
        }
        return elements;
    }
    if (typeof (element) == 'string') {
        element = document.getElementById(element);
    }
    return element;
}
Function.prototype.bindObj = function () {
    if (arguments.length < 2 && arguments[0] === undefined) {
        return this;
    }
    var __method = this;
    var args = [];
    for (var i = 0, total = arguments.length; i < total; i++) {
        args.push(arguments[i]);
    }
    var object = args.shift();
    return function () {
        return __method.apply(object, args.concat(function (tmpArgs) {
            var args2 = [];
            for (var j = 0, total = tmpArgs.length; j < total; j++) {
                args2.push(tmpArgs[j]);
            }
            return args2;
        }(arguments)));
    };
};
Function.prototype.bindObjEvent = function () {
    var __method = this;
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    var object = args.shift();
    return function (event) {
        return __method.apply(object, [event || window.event].concat(args));
    };
};
Object.extend = function (destination, source) {
    for (var property in source) {
        destination[property] = source[property];
    }
    return destination;
};
SAPO.extendObj = function (destination, source) {
    for (var property in source) {
        if (source.hasOwnProperty(property)) {
            destination[property] = source[property];
        }
    }
    return destination;
};
if (typeof (SAPO.Browser) == 'undefined') {
    SAPO.Browser = {
        IE: false,
        GECKO: false,
        OPERA: false,
        SAFARI: false,
        KONQUEROR: false,
        CHROME: false,
        model: false,
        version: false,
        userAgent: false,
        init: function () {
            this.detectBrowser();
            this.setDimensions();
            this.setReferrer();
        },
        setDimensions: function () {
            var myWidth = 0,
                myHeight = 0;
            if (typeof (window.innerWidth) == 'number') {
                myWidth = window.innerWidth;
                myHeight = window.innerHeight;
            } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
                myWidth = document.documentElement.clientWidth;
                myHeight = document.documentElement.clientHeight;
            } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
                myWidth = document.body.clientWidth;
                myHeight = document.body.clientHeight;
            }
            this.windowWidth = myWidth;
            this.windowHeight = myHeight;
        },
        setReferrer: function () {
            this.referrer = document.referrer !== undefined ? document.referrer.length > 0 ? escape(document.referrer) : false : false;
        },
        detectBrowser: function () {
            var sAgent = navigator.userAgent;
            this.userAgent = sAgent;
            sAgent = sAgent.toLowerCase();
            if ((new RegExp("applewebkit\/")).test(sAgent)) {
                if ((new RegExp("chrome\/")).test(sAgent)) {
                    this.CHROME = true;
                    this.model = 'chrome';
                    this.version = sAgent.replace(new RegExp("(.*)chrome\/([^\\s]+)(.*)"), "$2");
                } else {
                    this.SAFARI = true;
                    this.model = 'safari';
                    this.version = sAgent.replace(new RegExp("(.*)applewebkit\/([^\\s]+)(.*)"), "$2");
                }
            } else if ((new RegExp("opera")).test(sAgent)) {
                this.OPERA = true;
                this.model = 'opera';
                this.version = sAgent.replace(new RegExp("(.*)opera.([^\\s$]+)(.*)"), "$2");
            } else if ((new RegExp("konqueror")).test(sAgent)) {
                this.KONQUEROR = true;
                this.model = 'konqueror';
                this.version = sAgent.replace(new RegExp("(.*)konqueror\/([^;]+);(.*)"), "$2");
            } else if ((new RegExp("msie\ ")).test(sAgent)) {
                this.IE = true;
                this.model = 'ie';
                this.version = sAgent.replace(new RegExp("(.*)\\smsie\\s([^;]+);(.*)"), "$2");
            } else if ((new RegExp("gecko")).test(sAgent)) {
                this.GECKO = true;
                var re = new RegExp("(camino|chimera|epiphany|minefield|firefox|firebird|phoenix|galeon|iceweasel|k\-meleon|seamonkey|netscape|songbird|sylera)");
                if (re.test(sAgent)) {
                    this.model = sAgent.match(re)[1];
                    this.version = sAgent.replace(new RegExp("(.*)" + this.model + "\/([^;\\s$]+)(.*)"), "$2");
                } else {
                    this.model = 'mozilla';
                    var reVersion = new RegExp("(.*)rv\:([^\)]+)(.*)");
                    if (reVersion.test(sAgent)) {
                        this.version = sAgent.replace(reVersion, "$2");
                    }
                }
            }
        },
        debug: function () {
            var str = "known browsers: (ie, gecko, opera, safari, konqueror) \n";
            str += [this.IE, this.GECKO, this.OPERA, this.SAFARI, this.KONQUEROR] + "\n";
            str += "model -> " + this.model + "\n";
            str += "version -> " + this.version + "\n";
            str += "\n";
            str += "original UA -> " + this.userAgent;
            alert(str);
        }
    };
    SAPO.Browser.init();
}
SAPO.logReferer = function (classURL) {
    var thisOptions = SAPO.extendObj({
        s: 'js.sapo.pt',
        swakt: '59a97a5f-0924-3720-a62e-0c44d9ea4f16',
        pg: false,
        swasection: false,
        swasubsection: '',
        dc: '',
        ref: false,
        etype: 'libsapojs-view',
        swav: '1',
        swauv: '1',
        bcs: '1',
        bsr: '1',
        bul: '1',
        bje: '1',
        bfl: '1',
        debug: false
    }, arguments[1] || {});
    if (typeof (classURL) != 'undefined' && classURL != null) {
        if (!thisOptions.pg) {
            thisOptions.pg = classURL;
        }
        if (!thisOptions.swasection) {
            thisOptions.swasection = classURL;
        }
        if (!thisOptions.ref) {
            thisOptions.ref = location.href;
        }
        var waURI = 'http://wa.sl.pt/wa.gif?';
        var waURISSL = 'https://ssl.sapo.pt/wa.sl.pt/wa.gif?';
        var aQuery = ['pg=' + encodeURIComponent(thisOptions.pg), 'swasection=' + encodeURIComponent(thisOptions.swasection), 'swasubsection=' + encodeURIComponent(thisOptions.swasubsection), 'dc=' + encodeURIComponent(thisOptions.dc), 's=' + thisOptions.s, 'ref=' + encodeURIComponent(thisOptions.ref), 'swakt=' + thisOptions.swakt, 'etype=' + encodeURIComponent(thisOptions.etype), 'swav=' + encodeURIComponent(thisOptions.swav), 'swauv=' + encodeURIComponent(thisOptions.swauv), 'bcs=' + encodeURIComponent(thisOptions.bcs), 'bsr=' + encodeURIComponent(thisOptions.bsr), 'bul=' + encodeURIComponent(thisOptions.bul), 'bje=' + encodeURIComponent(thisOptions.bje), 'bfl=' + encodeURIComponent(thisOptions.bfl), ''];
        if (location.protocol == 'https:') {
            var waLogURI = waURISSL;
        } else {
            var waLogURI = waURI;
        }
        var img = new Image();
        img.src = waLogURI + aQuery.join('&');
    }
};
SAPO._require = function (uri, callBack) {
    if (typeof (uri) != 'string') {
        return;
    }
    var script = document.createElement('script');
    script.type = 'text/javascript';
    var aHead = document.getElementsByTagName('HEAD');
    if (aHead.length > 0) {
        aHead[0].appendChild(script);
    }
    if (document.addEventListener) {
        script.onload = function (e) {
            if (typeof (callBack) != 'undefined') {
                callBack();
            }
        };
    } else {
        script.onreadystatechange = function (e) {
            if (this.readyState == 'loaded') {
                if (typeof (callBack) != 'undefined') {
                    callBack();
                }
            }
        };
    }
    script.src = uri;
};
SAPO.require = function (reqArray, callBack) {
    var objectsToCheck = [];
    var uriToAdd = [];
    var _isSAPOObject = function (param) {
            if (typeof (param) == 'string') {
                if (/^SAPO\./.test(param)) {
                    return true;
                }
            }
            return false;
        };
    var _isObjectUri = function (param) {
            if (typeof (param) == 'object' && param.constructor == Object) {
                if (typeof (param.uri) == 'string') {
                    return true;
                }
            }
            return false;
        };
    var _isObjectArray = function (param) {
            if (typeof (param) == 'object' && param.constructor == Array) {
                return true;
            }
            return false;
        };
    var _parseSAPOObject = function (param) {
            var aSAPO = param.split('.');
            var sapoURI = aSAPO.join('/');
            return 'http://js.sapo.pt/' + sapoURI + '/';
        };
    var _parseObjectUri = function (param) {
            return param.uri;
        };
    var _objectExists = function (objStr, ver) {
            if (typeof (objStr) != 'undefined') {
                var aStrObj = objStr.split('.');
                var objParent = window;
                for (var k = 0, aStrObjLength = aStrObj.length; k < aStrObjLength; k++) {
                    if (typeof (objParent[aStrObj[k]]) != 'undefined') {
                        objParent = objParent[aStrObj[k]];
                    } else {
                        return false;
                    }
                }
                if (typeof (ver) != 'undefined' && ver !== null) {
                    if (typeof (objParent.version) != 'undefined') {
                        if (objParent.version == ver) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        return true;
                    }
                }
                return true;
            }
        };
    var requestRecursive = function () {
            if (uriToAdd.length > 1) {
                SAPO._require(uriToAdd[0], requestRecursive);
                uriToAdd.splice(0, 1);
            } else if (uriToAdd.length == 1) {
                if (typeof (callBack) != 'undefined') {
                    SAPO._require(uriToAdd[0], callBack);
                } else {
                    SAPO._require(uriToAdd[0]);
                }
                uriToAdd.splice(0, 1);
            } else if (uriToAdd.length === 0) {
                if (typeof (callBack) != 'undefined') {
                    callBack();
                }
            }
        };
    if (typeof (reqArray) != 'undefined') {
        var cur = false;
        var curURI = false;
        if (typeof (reqArray) == 'string') {
            if (_isSAPOObject(reqArray)) {
                if (!_objectExists(reqArray)) {
                    uriToAdd.push(_parseSAPOObject(reqArray));
                }
            } else {
                uriToAdd.push(reqArray);
            }
        } else {
            for (var i = 0, reqArrayLength = reqArray.length; i < reqArrayLength; i++) {
                cur = reqArray[i];
                if (_isSAPOObject(cur)) {
                    if (!_objectExists(cur)) {
                        objectsToCheck.push(cur);
                        uriToAdd.push(_parseSAPOObject(cur));
                    }
                } else if (_isObjectArray(cur)) {
                    if (cur.length > 0) {
                        if (_isSAPOObject(cur[0])) {
                            if (!_objectExists(cur[0])) {
                                if (cur.length === 2) {
                                    uriToAdd.push(_parseSAPOObject(cur[0]) + cur[1] + '/');
                                } else {
                                    uriToAdd.push(_parseSAPOObject(cur[0]));
                                }
                            }
                        }
                    }
                } else {
                    if (typeof (cur) == 'string') {
                        uriToAdd.push(cur);
                    } else {
                        if (_isObjectUri(cur)) {
                            if (typeof (cur.check) == 'string') {
                                if (typeof (cur.version) == 'string') {
                                    if (!_objectExists(cur.check, cur.version)) {
                                        uriToAdd.push(_parseObjectUri(cur));
                                    }
                                } else {
                                    if (!_objectExists(cur.check)) {
                                        uriToAdd.push(_parseObjectUri(cur));
                                    }
                                }
                            } else {
                                uriToAdd.push(_parseObjectUri(cur));
                            }
                        }
                    }
                }
            }
        }
        if (arguments.length == 3) {
            if (typeof (arguments[2]) == 'boolean') {
                if (arguments[2] === true) {
                    for (var l = 0, uriToAddLength = uriToAdd.length; l < uriToAddLength; l++) {
                        SAPO._require(uriToAdd[l]);
                    }
                    if (typeof (callBack) != 'undefined') {
                        callBack();
                    }
                    return;
                }
            }
            requestRecursive();
        } else {
            requestRecursive();
        }
    }
};
if (!SAPO.Communication || SAPO.Communication == 'undefined') {
    SAPO.namespace('Communication');
}
SAPO.Communication.Syndication = function (url, options) {
    this.init(url, options);
};
SAPO.Communication.Syndication.version = '0.1';
SAPO.Communication.Syndication.prototype = {
    init: function (url) {
        this.feeds = [];
        if (url && typeof (url) != 'undefined' && url != null) {
            var id = this.push(url, arguments[1] || {});
            if (id !== false && typeof (id) != 'undefined') {
                this.run(id);
            }
        }
        this._doDebug = false;
    },
    push: function (url) {
        if (!url || typeof (url) == 'undefined') {
            if (this.exception) {
                this.exception.log('Missed URL');
            }
            throw "Missed URL in SAPO.Communication.Syndication";
            return false;
        }
        try {
            var options = Object.extend({
                objectName: false,
                onComplete: false,
                onLoading: false,
                onTimeout: false,
                onExit: false,
                timeout: 10,
                optOnComplete: false,
                optOnLoading: false,
                optOnTimeout: false,
                optOnExit: false,
                charset: 'utf-8'
            }, arguments[1] || {});
            this.feeds.push({});
            this.onStart = false;
            this.onEnd = false;
            var id = this.feeds.length - 1;
            this.feeds[id].u = url;
            this.feeds[id].onComplete = options.onComplete;
            this.feeds[id].onLoading = options.onLoading;
            this.feeds[id].onTimeout = options.onTimeout;
            this.feeds[id].onExit = options.onExit;
            if (options.objectName) {
                this.feeds[id].obj = options.objectName;
            } else {
                if (typeof (SAPO.Utility) != 'undefined' && typeof (SAPO.Utility.Crypto) != 'undefined') {
                    this.feeds[id].obj = 'json' + SAPO.Utility.Crypto.md5(this.feeds[id].u);
                } else {
                    this.feeds[id].obj = 'json' + Math.round(1000000 * Math.random());
                }
            }
            this.feeds[id].urlJSON = false;
            this.feeds[id].urlImage = false;
            this.feeds[id].req = 0;
            this.feeds[id].limitReq = parseInt((options.timeout * 1000) / 100);
            this.feeds[id].stoReq = false;
            this.feeds[id].charset = options.charset;
            this.feeds[id].optionsOnLoading = options.optOnLoading || false;
            this.feeds[id].optionsOnComplete = options.optOnComplete || false;
            this.feeds[id].optionsOnTimeout = options.optOnTimeout || false;
            this.feeds[id].optionsOnExit = options.optOnExit || false;
            return id;
        } catch (e) {
            if (this.exception) {
                this.exception.log(e, 'push');
            }
        }
        return false;
    },
    run: function (id) {
        if (id !== false && typeof (id) != 'undefined') {
            try {
                if (this.feeds[id].onLoading) {
                    if (this.feeds[id].optionsOnLoading) {
                        this.feeds[id].onLoading(this.feeds[id].optionsOnLoading);
                    } else {
                        this.feeds[id].onLoading();
                    }
                }
                this._setUrl(id);
                this._createScriptTag(id);
            } catch (e) {
                this.exception.log(e, 'run (ID: ' + id + ')');
            }
        }
    },
    runAll: function () {
        if (this.feeds.length > 0) {
            this.onStart = arguments[0] || false;
            if (this.onStart) {
                this.onStart();
            }
            var argToOnEnd = arguments[1] || false;
            this.iter = 0;
            this.setInter = setInterval(function (arguments) {
                this.run(this.iter);
                if (this.iter === (this.feeds.length - 1)) {
                    this.onEnd = argToOnEnd;
                }
                this.iter++;
                if (this.iter == this.feeds.length) {
                    clearInterval(this.setInter);
                }
            }.bindObj(this), 300);
        }
    },
    remove: function (id) {
        if (typeof (this.feeds[id]) != 'undefined' && this.feeds[id] != null) {
            try {
                this.feeds[id] = null;
            } catch (e) {
                this.exception.log(e, 'delete (ID: ' + id + ')');
            }
        }
    },
    removeAll: function () {
        if (this.feeds.length > 0) {
            for (var i = 0; i < this.feeds.length; i++) {
                this.remove(i);
            }
        }
    },
    destroy: function () {
        for (var i in this) {
            this[i] = null;
        }
    },
    _setUrl: function (id) {
        var re = new RegExp("\\?(.+)");
        if (re.test(this.feeds[id].u)) {
            this.feeds[id].urlJSON = this.feeds[id].u + '&jsonTag=' + this.feeds[id].obj;
        } else {
            this.feeds[id].urlJSON = this.feeds[id].u + '?jsonTag=' + this.feeds[id].obj;
        }
    },
    _createScriptTag: function (id) {
        try {
            this.feeds[id].script = document.createElement('SCRIPT');
            this.feeds[id].script.type = 'text/javascript';
            this.feeds[id].script.src = this.feeds[id].urlJSON;
            this.feeds[id].script.charset = this.feeds[id].charset;
            document.getElementsByTagName('HEAD')[0].appendChild(this.feeds[id].script);
            this._callBack(id);
        } catch (e) {
            if (this.exception) {
                this.exception.log(e, '_createScriptTag');
            }
        }
    },
    _callBack: function (id) {
        try {
            if (this.feeds[id].req < this.feeds[id].limitReq) {
                if (this.feeds[id].onComplete) {
                    if (this.feeds[id].optionsOnComplete) {
                        this.feeds[id].optionsOnComplete.__id = id;
                        this.feeds[id].onComplete(eval(this.feeds[id].obj), this.feeds[id].optionsOnComplete);
                        this._removeScript(id);
                    } else {
                        this.feeds[id].onComplete(eval(this.feeds[id].obj));
                        this._removeScript(id);
                    }
                }
                if (this.feeds[id].onExit) {
                    if (this.feeds[id].optionsOnExit) {
                        this.feeds[id].onExit(this.feeds[id].optionsOnExit);
                    } else {
                        this.feeds[id].onExit();
                    }
                }
                if (this.onEnd && id == (this.feeds.length - 1)) {
                    this.onEnd();
                }
            } else {
                throw "Time out ";
            }
        } catch (e) {
            if (this.feeds[id].req < this.feeds[id].limitReq) {
                if (this.feeds[id].stoReq) {
                    clearTimeout(this.feeds[id].stoReq);
                }
                this.feeds[id].req++;
                this.feeds[id].stoReq = setTimeout(function () {
                    this._callBack(id);
                }.bindObj(this), 100);
            } else {
                if (this.exception) {
                    this.exception.log(e + ' - URI: ' + this.feeds[id].urlJSON, '_callBack');
                }
                if (this.feeds[id].onTimeout) {
                    if (this.feeds[id].optionsOnTimeout) {
                        this.feeds[id].onTimeout(this.feeds[id].optionsOnTimeout);
                    } else {
                        this.feeds[id].onTimeout();
                    }
                }
                this._removeScript(id);
                if (this.feeds[id].onExit) {
                    if (this.feeds[id].optionsOnExit) {
                        this.feeds[id].onExit(this.feeds[id].optionsOnExit);
                    } else {
                        this.feeds[id].onExit();
                    }
                }
            }
        }
    },
    _removeScript: function (id) {
        try {
            if (this.feeds[id].script.parentNode && typeof (this.feeds[id].script.parentNode) != 'undefined') {
                this.feeds[id].script.parentNode.removeChild(this.feeds[id].script);
            }
        } catch (e) {
            if (this.exception) {
                this.exception.log(e, '_removeScript');
            }
        }
    },
    _debug: function (txt) {
        if (this._doDebug) {
            document.getElementById('debug').innerHTML += txt + '<br/>';
        }
    }
};
(function () {
    if (typeof (SAPO) == 'undefined') {
        window.SAPO = {};
    } else {
        window.SAPO = SAPO;
    }
    window.SAPO.Maps = {
        _scriptName: "SapoMapsAPI.js",
        _getScriptLocation: function () {
            var scriptLocation = "";
            var scriptName = SAPO.Maps._scriptName;
            var scripts = document.getElementsByTagName('script');
            for (var i = 0, len = scripts.length; i < len; i++) {
                var src = scripts[i].getAttribute('src');
                if (src) {
                    var index = src.lastIndexOf(scriptName);
                    var pathLength = src.lastIndexOf('?');
                    if (pathLength < 0) {
                        pathLength = src.length;
                    }
                    if ((index > -1) && (index + scriptName.length == pathLength)) {
                        scriptLocation = src.slice(0, pathLength - scriptName.length);
                        break;
                    }
                }
            }
            return scriptLocation;
        }
    };
    window.OpenLayers = {
        _getScriptLocation: function () {
            var scriptLocation = "";
            var scriptName = SAPO.Maps._scriptName;
            var scripts = document.getElementsByTagName('script');
            for (var i = 0, len = scripts.length; i < len; i++) {
                var src = scripts[i].getAttribute('src');
                if (src) {
                    var index = src.lastIndexOf(scriptName);
                    var pathLength = src.lastIndexOf('?');
                    if (pathLength < 0) {
                        pathLength = src.length;
                    }
                    if ((index > -1) && (index + scriptName.length == pathLength)) {
                        scriptLocation = src.slice(0, pathLength - scriptName.length);
                        break;
                    }
                }
            }
            return scriptLocation + "OpenLayers-2.7/";
        }
    };
    var host = SAPO.Maps._getScriptLocation();
    if (host === "") {
        SAPO.Maps._scriptName = "SAPOMapsAPI-1.0.js";
        host = SAPO.Maps._getScriptLocation();
    }
    if (host === "") {
        SAPO.Maps._scriptName = "Maps.js";
        host = SAPO.Maps._getScriptLocation();
    }
    var cssfiles, jsfiles;
    if (host.indexOf("js.sapo.pt") !== -1) {
        cssfiles = ["http://js.sapo.pt/Assets/Maps/api/1.0/Style.css"];
        jsfiles = [];
    } else {
        if (host.indexOf("js.staging.sapo.pt") !== -1) {
            cssfiles = ["http://js.staging.sapo.pt/Assets/Maps/api/1.0/Style.css"];
            jsfiles = [];
        } else {
            cssfiles = ["Style.css"];
            jsfiles = ["http://js.sapo.pt/SAPO/0.1/", "http://js.sapo.pt/SAPO/Communication/Syndication/", "Raphael/raphael-min.js", "SapoMaps_OL_min.js"];
        }
    }
    var agent = navigator.userAgent;
    var docWrite = (agent.match("MSIE") || agent.match("Safari"));
    if (docWrite) {
        var allScriptTags = new Array(jsfiles.length + cssfiles.length);
    }
    for (var i = 0, len = jsfiles.length; i < len; i++) {
        if (docWrite) {
            if (jsfiles[i].indexOf("http://") != -1) {
                allScriptTags[i] = "<script src='" + jsfiles[i] + "'></script>";
            } else {
                allScriptTags[i] = "<script src='" + host + jsfiles[i] + "'></script>";
            }
        } else {
            var s = document.createElement("script");
            if (jsfiles[i].indexOf("http://") != -1) {
                s.src = jsfiles[i];
            } else {
                s.src = host + jsfiles[i];
            }
            var h = document.getElementsByTagName("head").length ? document.getElementsByTagName("head")[0] : document.body;
            h.appendChild(s);
        }
    }
    for (var i = 0, j = jsfiles.length, len = cssfiles.length; i < len; i++, j++) {
        if (docWrite) {
            if (cssfiles[i].indexOf("http://") != -1) {
                allScriptTags[j] = "<link rel='stylesheet' type='text/css' href='" + cssfiles[i] + "'></link>";
            } else {
                allScriptTags[j] = "<link rel='stylesheet' type='text/css' href='" + host + cssfiles[i] + "'></link>";
            }
        } else {
            var s = document.createElement("link");
            s.type = 'text/css';
            s.rel = 'stylesheet';
            if (cssfiles[i].indexOf("http://") != -1) {
                s.href = cssfiles[i];
            } else {
                s.href = host + cssfiles[i];
            }
            var h = document.getElementsByTagName("head").length ? document.getElementsByTagName("head")[0] : document.body;
            h.appendChild(s);
        }
    }
    if (docWrite) {
        document.write(allScriptTags.join(""));
    }
})();
SAPO.Maps.VERSION_NUMBER = "$Revision: 8012 $";
window.Raphael = (function () {
    var v = /[, ]+/,
        F = document,
        l = window,
        o = {
            was: "Raphael" in window,
            is: window.Raphael
        },
        E = function () {
            return K.apply(E, arguments);
        },
        B = {},
        T = {
            cx: 0,
            cy: 0,
            fill: "#fff",
            "fill-opacity": 1,
            font: '10px "Arial"',
            "font-family": '"Arial"',
            "font-size": "10",
            "font-style": "normal",
            "font-weight": 400,
            gradient: 0,
            height: 0,
            href: "http://raphaeljs.com/",
            opacity: 1,
            path: "M0,0",
            r: 0,
            rotation: 0,
            rx: 0,
            ry: 0,
            scale: "1 1",
            src: "",
            stroke: "#000",
            "stroke-dasharray": "",
            "stroke-linecap": "butt",
            "stroke-linejoin": "butt",
            "stroke-miterlimit": 0,
            "stroke-opacity": 1,
            "stroke-width": 1,
            target: "_blank",
            "text-anchor": "middle",
            title: "Raphael",
            translation: "0 0",
            width: 0,
            x: 0,
            y: 0
        },
        V = {
            cx: "number",
            cy: "number",
            fill: "colour",
            "fill-opacity": "number",
            "font-size": "number",
            height: "number",
            opacity: "number",
            path: "path",
            r: "number",
            rotation: "csv",
            rx: "number",
            ry: "number",
            scale: "csv",
            stroke: "colour",
            "stroke-opacity": "number",
            "stroke-width": "number",
            translation: "csv",
            width: "number",
            x: "number",
            y: "number"
        },
        W = ["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup"];
    E.version = "0.8.6";
    E.type = (window.SVGAngle || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML");
    E.svg = !(E.vml = E.type == "VML");
    E.idGenerator = 0;
    E.fn = {};
    E.isArray = function (R) {
        return Object.prototype.toString.call(R) == "[object Array]";
    };
    E.setWindow = function (R) {
        l = R;
        F = l.document;
    };
    E.hsb2rgb = function (AC, AA, AG) {
        if (typeof AC == "object" && "h" in AC && "s" in AC && "b" in AC) {
            AG = AC.b;
            AA = AC.s;
            AC = AC.h;
        }
        var x, y, AH;
        if (AG == 0) {
            return {
                r: 0,
                g: 0,
                b: 0,
                hex: "#000"
            };
        }
        if (AC > 1 || AA > 1 || AG > 1) {
            AC /= 255;
            AA /= 255;
            AG /= 255;
        }
        var z = Math.floor(AC * 6),
            AD = (AC * 6) - z,
            w = AG * (1 - AA),
            e = AG * (1 - (AA * AD)),
            AI = AG * (1 - (AA * (1 - AD)));
        x = [AG, e, w, w, AI, AG, AG][z];
        y = [AI, AG, AG, e, w, w, AI][z];
        AH = [w, w, AI, AG, AG, e, w][z];
        x *= 255;
        y *= 255;
        AH *= 255;
        var AE = {
            r: x,
            g: y,
            b: AH
        },
            R = Math.round(x).toString(16),
            AB = Math.round(y).toString(16),
            AF = Math.round(AH).toString(16);
        if (R.length == 1) {
            R = "0" + R;
        }
        if (AB.length == 1) {
            AB = "0" + AB;
        }
        if (AF.length == 1) {
            AF = "0" + AF;
        }
        AE.hex = "#" + R + AB + AF;
        return AE;
    };
    E.rgb2hsb = function (R, e, AA) {
        if (typeof R == "object" && "r" in R && "g" in R && "b" in R) {
            AA = R.b;
            e = R.g;
            R = R.r;
        }
        if (typeof R == "string") {
            var AC = E.getRGB(R);
            R = AC.r;
            e = AC.g;
            AA = AC.b;
        }
        if (R > 1 || e > 1 || AA > 1) {
            R /= 255;
            e /= 255;
            AA /= 255;
        }
        var z = Math.max(R, e, AA),
            i = Math.min(R, e, AA),
            x, w, y = z;
        if (i == z) {
            return {
                h: 0,
                s: 0,
                b: z
            };
        } else {
            var AB = (z - i);
            w = AB / z;
            if (R == z) {
                x = (e - AA) / AB;
            } else {
                if (e == z) {
                    x = 2 + ((AA - R) / AB);
                } else {
                    x = 4 + ((R - e) / AB);
                }
            }
            x /= 6;
            if (x < 0) {
                x += 1;
            }
            if (x > 1) {
                x -= 1;
            }
        }
        return {
            h: x,
            s: w,
            b: y
        };
    };
    var O = {},
        m = [];
    E.getRGB = function (R) {
        if (R in O) {
            return O[R];
        }
        var AC = {
            aliceblue: "#f0f8ff",
            amethyst: "#96c",
            antiquewhite: "#faebd7",
            aqua: "#0ff",
            aquamarine: "#7fffd4",
            azure: "#f0ffff",
            beige: "#f5f5dc",
            bisque: "#ffe4c4",
            black: "#000",
            blanchedalmond: "#ffebcd",
            blue: "#00f",
            blueviolet: "#8a2be2",
            brown: "#a52a2a",
            burlywood: "#deb887",
            cadetblue: "#5f9ea0",
            chartreuse: "#7fff00",
            chocolate: "#d2691e",
            coral: "#ff7f50",
            cornflowerblue: "#6495ed",
            cornsilk: "#fff8dc",
            crimson: "#dc143c",
            cyan: "#0ff",
            darkblue: "#00008b",
            darkcyan: "#008b8b",
            darkgoldenrod: "#b8860b",
            darkgray: "#a9a9a9",
            darkgreen: "#006400",
            darkkhaki: "#bdb76b",
            darkmagenta: "#8b008b",
            darkolivegreen: "#556b2f",
            darkorange: "#ff8c00",
            darkorchid: "#9932cc",
            darkred: "#8b0000",
            darksalmon: "#e9967a",
            darkseagreen: "#8fbc8f",
            darkslateblue: "#483d8b",
            darkslategray: "#2f4f4f",
            darkturquoise: "#00ced1",
            darkviolet: "#9400d3",
            deeppink: "#ff1493",
            deepskyblue: "#00bfff",
            dimgray: "#696969",
            dodgerblue: "#1e90ff",
            firebrick: "#b22222",
            floralwhite: "#fffaf0",
            forestgreen: "#228b22",
            fuchsia: "#f0f",
            gainsboro: "#dcdcdc",
            ghostwhite: "#f8f8ff",
            gold: "#ffd700",
            goldenrod: "#daa520",
            gray: "#808080",
            green: "#008000",
            greenyellow: "#adff2f",
            honeydew: "#f0fff0",
            hotpink: "#ff69b4",
            indianred: "#cd5c5c",
            indigo: "#4b0082",
            ivory: "#fffff0",
            khaki: "#f0e68c",
            lavender: "#e6e6fa",
            lavenderblush: "#fff0f5",
            lawngreen: "#7cfc00",
            lemonchiffon: "#fffacd",
            lightblue: "#add8e6",
            lightcoral: "#f08080",
            lightcyan: "#e0ffff",
            lightgoldenrodyellow: "#fafad2",
            lightgreen: "#90ee90",
            lightgrey: "#d3d3d3",
            lightpink: "#ffb6c1",
            lightsalmon: "#ffa07a",
            lightsalmon: "#ffa07a",
            lightseagreen: "#20b2aa",
            lightskyblue: "#87cefa",
            lightslategray: "#789",
            lightsteelblue: "#b0c4de",
            lightyellow: "#ffffe0",
            lime: "#0f0",
            limegreen: "#32cd32",
            linen: "#faf0e6",
            magenta: "#f0f",
            maroon: "#800000",
            mediumaquamarine: "#66cdaa",
            mediumblue: "#0000cd",
            mediumorchid: "#ba55d3",
            mediumpurple: "#9370db",
            mediumseagreen: "#3cb371",
            mediumslateblue: "#7b68ee",
            mediumslateblue: "#7b68ee",
            mediumspringgreen: "#00fa9a",
            mediumturquoise: "#48d1cc",
            mediumvioletred: "#c71585",
            midnightblue: "#191970",
            mintcream: "#f5fffa",
            mistyrose: "#ffe4e1",
            moccasin: "#ffe4b5",
            navajowhite: "#ffdead",
            navy: "#000080",
            oldlace: "#fdf5e6",
            olive: "#808000",
            olivedrab: "#6b8e23",
            orange: "#ffa500",
            orangered: "#ff4500",
            orchid: "#da70d6",
            palegoldenrod: "#eee8aa",
            palegreen: "#98fb98",
            paleturquoise: "#afeeee",
            palevioletred: "#db7093",
            papayawhip: "#ffefd5",
            peachpuff: "#ffdab9",
            peru: "#cd853f",
            pink: "#ffc0cb",
            plum: "#dda0dd",
            powderblue: "#b0e0e6",
            purple: "#800080",
            red: "#f00",
            rosybrown: "#bc8f8f",
            royalblue: "#4169e1",
            saddlebrown: "#8b4513",
            salmon: "#fa8072",
            sandybrown: "#f4a460",
            seagreen: "#2e8b57",
            seashell: "#fff5ee",
            sienna: "#a0522d",
            silver: "#c0c0c0",
            skyblue: "#87ceeb",
            slateblue: "#6a5acd",
            slategray: "#708090",
            snow: "#fffafa",
            springgreen: "#00ff7f",
            steelblue: "#4682b4",
            tan: "#d2b48c",
            teal: "#008080",
            thistle: "#d8bfd8",
            tomato: "#ff6347",
            turquoise: "#40e0d0",
            violet: "#ee82ee",
            wheat: "#f5deb3",
            white: "#fff",
            whitesmoke: "#f5f5f5",
            yellow: "#ff0",
            yellowgreen: "#9acd32"
        },
            y;
        if ((R + "").toLowerCase() in AC) {
            R = AC[R.toString().toLowerCase()];
        }
        if (!R) {
            return {
                r: 0,
                g: 0,
                b: 0,
                hex: "#000"
            };
        }
        if (R == "none") {
            return {
                r: -1,
                g: -1,
                b: -1,
                hex: "none"
            };
        }
        var i, w, AB, z = (R + "").match(/^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgb\(\s*([\d\.]+\s*,\s*[\d\.]+\s*,\s*[\d\.]+)\s*\)|rgb\(\s*([\d\.]+%\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%)\s*\)|hsb\(\s*([\d\.]+\s*,\s*[\d\.]+\s*,\s*[\d\.]+)\s*\)|hsb\(\s*([\d\.]+%\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%)\s*\))\s*$/i);
        if (z) {
            if (z[2]) {
                AB = parseInt(z[2].substring(5), 16);
                w = parseInt(z[2].substring(3, 5), 16);
                i = parseInt(z[2].substring(1, 3), 16);
            }
            if (z[3]) {
                AB = parseInt(z[3].substring(3) + z[3].substring(3), 16);
                w = parseInt(z[3].substring(2, 3) + z[3].substring(2, 3), 16);
                i = parseInt(z[3].substring(1, 2) + z[3].substring(1, 2), 16);
            }
            if (z[4]) {
                z = z[4].split(/\s*,\s*/);
                i = parseFloat(z[0]);
                w = parseFloat(z[1]);
                AB = parseFloat(z[2]);
            }
            if (z[5]) {
                z = z[5].split(/\s*,\s*/);
                i = parseFloat(z[0]) * 2.55;
                w = parseFloat(z[1]) * 2.55;
                AB = parseFloat(z[2]) * 2.55;
            }
            if (z[6]) {
                z = z[6].split(/\s*,\s*/);
                i = parseFloat(z[0]);
                w = parseFloat(z[1]);
                AB = parseFloat(z[2]);
                return E.hsb2rgb(i, w, AB);
            }
            if (z[7]) {
                z = z[7].split(/\s*,\s*/);
                i = parseFloat(z[0]) * 2.55;
                w = parseFloat(z[1]) * 2.55;
                AB = parseFloat(z[2]) * 2.55;
                return E.hsb2rgb(i, w, AB);
            }
            var z = {
                r: i,
                g: w,
                b: AB
            },
                e = Math.round(i).toString(16),
                x = Math.round(w).toString(16),
                AA = Math.round(AB).toString(16);
            (e.length == 1) && (e = "0" + e);
            (x.length == 1) && (x = "0" + x);
            (AA.length == 1) && (AA = "0" + AA);
            z.hex = "#" + e + x + AA;
            y = z;
        } else {
            y = {
                r: -1,
                g: -1,
                b: -1,
                hex: "none"
            };
        }
        if (m.length > 20) {
            delete O[m.unshift()];
        }
        m.push(R);
        O[R] = y;
        return y;
    };
    E.getColor = function (e) {
        var i = this.getColor.start = this.getColor.start || {
            h: 0,
            s: 1,
            b: e || 0.75
        },
            R = this.hsb2rgb(i.h, i.s, i.b);
        i.h += 0.075;
        if (i.h > 1) {
            i.h = 0;
            i.s -= 0.2;
            if (i.s <= 0) {
                this.getColor.start = {
                    h: 0,
                    s: 1,
                    b: i.b
                };
            }
        }
        return R.hex;
    };
    E.getColor.reset = function () {
        delete this.start;
    };
    var Y = {},
        D = [];
    E.parsePathString = function (R) {
        if (R in Y) {
            return Y[R];
        }
        var w = {
            a: 7,
            c: 6,
            h: 1,
            l: 2,
            m: 2,
            q: 4,
            s: 4,
            t: 2,
            v: 1,
            z: 0
        },
            e = [],
            i = function () {
                var y = "";
                for (var x = 0, z = this.length; x < z; x++) {
                    y += this[x][0] + this[x].join(",").substring(2);
                }
                return y;
            };
        if (R.toString.toString() == i.toString()) {
            e = R;
        }
        if (!e.length) {
            R.replace(/([achlmqstvz])[\s,]*((-?\d*\.?\d*(?:e[-+]?\d+)?\s*,?\s*)+)/ig, function (y, x, AB) {
                var AA = [],
                    z = x.toLowerCase();
                AB.replace(/(-?\d*\.?\d*(?:e[-+]?\d+)?)\s*,?\s*/ig, function (AD, AC) {
                    AC && AA.push(+AC);
                });
                while (AA.length >= w[z]) {
                    e.push([x].concat(AA.splice(0, w[z])));
                    if (!w[z]) {
                        break;
                    }
                }
            });
            e.toString = i;
        }
        if (D.length > 20) {
            delete Y[D.unshift()];
        }
        D.push(R);
        Y[R] = e;
        return e;
    };
    var a = function (AH) {
            var R = AH;
            if (typeof AH == "string") {
                R = E.parsePathString(AH);
            }
            R = X(R);
            var AC = [],
                AB = [],
                e = 0;
            for (var z = 0, AG = R.length; z < AG; z++) {
                var AD = R[z];
                switch (AD[0]) {
                case "Z":
                    break;
                case "A":
                    AC.push(AD[AD.length - 2]);
                    AB.push(AD[AD.length - 1]);
                    break;
                default:
                    for (var w = 1, AA = AD.length; w < AA; w++) {
                        (w % 2 ? AC : AB).push(AD[w]);
                    }
                }
            }
            var AF = Math.min.apply(Math, AC),
                AE = Math.min.apply(Math, AB);
            if (!AC.length) {
                return {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                    X: 0,
                    Y: 0
                };
            } else {
                return {
                    x: AF,
                    y: AE,
                    width: Math.max.apply(Math, AC) - AF,
                    height: Math.max.apply(Math, AB) - AE,
                    X: AC,
                    Y: AB
                };
            }
        },
        S = function (x, i) {
            var w = 0.5522 * x,
                e = this.isAbsolute,
                z = this;
            if (e) {
                this.relatively();
                e = function () {
                    z.absolutely();
                };
            } else {
                e = function () {};
            }
            var y = {
                l: function () {
                    return {
                        u: function () {
                            z.curveTo(-w, 0, -x, -(x - w), -x, -x);
                        },
                        d: function () {
                            z.curveTo(-w, 0, -x, x - w, -x, x);
                        }
                    };
                },
                r: function () {
                    return {
                        u: function () {
                            z.curveTo(w, 0, x, -(x - w), x, -x);
                        },
                        d: function () {
                            z.curveTo(w, 0, x, x - w, x, x);
                        }
                    };
                },
                u: function () {
                    return {
                        r: function () {
                            z.curveTo(0, -w, -(w - x), -x, x, -x);
                        },
                        l: function () {
                            z.curveTo(0, -w, w - x, -x, -x, -x);
                        }
                    };
                },
                d: function () {
                    return {
                        r: function () {
                            z.curveTo(0, w, -(w - x), x, x, x);
                        },
                        l: function () {
                            z.curveTo(0, w, w - x, x, -x, x);
                        }
                    };
                }
            };
            y[i.charAt(0)]()[i.charAt(1)]();
            e();
            return z;
        },
        C = function (z) {
            var AF = [],
                AH = 0,
                AG = 0,
                w = 0;
            if (typeof z == "string") {
                z = E.parsePathString(z);
            }
            if (z[0][0] == "M") {
                AH = z[0][1];
                AG = z[0][2];
                w++;
                AF.push(["M", AH, AG]);
            }
            for (var AC = w, AJ = z.length; AC < AJ; AC++) {
                var R = AF[AC] = [],
                    AI = z[AC];
                if (AI[0] != AI[0].toLowerCase()) {
                    R[0] = AI[0].toLowerCase();
                    switch (R[0]) {
                    case "a":
                        R[1] = AI[1];
                        R[2] = AI[2];
                        R[3] = AI[3];
                        R[4] = AI[4];
                        R[5] = AI[5];
                        R[6] = +(AI[6] - AH).toFixed(3);
                        R[7] = +(AI[7] - AG).toFixed(3);
                        break;
                    case "v":
                        R[1] = +(AI[1] - AG).toFixed(3);
                        break;
                    default:
                        for (var AB = 1, AD = AI.length; AB < AD; AB++) {
                            R[AB] = +(AI[AB] - ((AB % 2) ? AH : AG)).toFixed(3);
                        }
                    }
                } else {
                    R = AF[AC] = [];
                    for (var AA = 0, e = AI.length; AA < e; AA++) {
                        AF[AC][AA] = AI[AA];
                    }
                }
                var AE = AF[AC].length;
                switch (AF[AC][0]) {
                case "z":
                    break;
                case "h":
                    AH += +AF[AC][AE - 1];
                    break;
                case "v":
                    AG += +AF[AC][AE - 1];
                    break;
                default:
                    AH += +AF[AC][AE - 2];
                    AG += +AF[AC][AE - 1];
                }
            }
            AF.toString = z.toString;
            return AF;
        },
        X = function (z) {
            var AE = [];
            if (typeof z == "string") {
                z = E.parsePathString(z);
            }
            var AG = 0,
                AF = 0,
                w = 0;
            if (z[0][0] == "M") {
                AG = +z[0][1];
                AF = +z[0][2];
                w++;
                AE[0] = ["M", AG, AF];
            }
            for (var AC = w, AI = z.length; AC < AI; AC++) {
                var R = AE[AC] = [],
                    AH = z[AC];
                if (AH[0] != (AH[0] + "").toUpperCase()) {
                    R[0] = (AH[0] + "").toUpperCase();
                    switch (R[0]) {
                    case "A":
                        R[1] = AH[1];
                        R[2] = AH[2];
                        R[3] = 0;
                        R[4] = AH[4];
                        R[5] = AH[5];
                        R[6] = +(AH[6] + AG).toFixed(3);
                        R[7] = +(AH[7] + AF).toFixed(3);
                        break;
                    case "V":
                        R[1] = +AH[1] + AF;
                        break;
                    case "H":
                        R[1] = +AH[1] + AG;
                        break;
                    default:
                        for (var AB = 1, AD = AH.length; AB < AD; AB++) {
                            R[AB] = +AH[AB] + ((AB % 2) ? AG : AF);
                        }
                    }
                } else {
                    R = AE[AC] = [];
                    for (var AA = 0, e = AH.length; AA < e; AA++) {
                        AE[AC][AA] = AH[AA];
                    }
                }
                switch (R[0]) {
                case "Z":
                    break;
                case "H":
                    AG = R[1];
                    break;
                case "V":
                    AF = R[1];
                    break;
                default:
                    AG = AE[AC][AE[AC].length - 2];
                    AF = AE[AC][AE[AC].length - 1];
                }
            }
            AE.toString = z.toString;
            return AE;
        },
        Z = {},
        L = [],
        d = function (z, y) {
            if ((z + y) in Z) {
                return Z[z + y];
            }
            var x = [X(E.parsePathString(z)), X(E.parsePathString(y))],
                e = [{
                    x: 0,
                    y: 0,
                    bx: 0,
                    by: 0,
                    X: 0,
                    Y: 0
                }, {
                    x: 0,
                    y: 0,
                    bx: 0,
                    by: 0,
                    X: 0,
                    Y: 0
                }],
                R = function (AB, AC) {
                    if (!AB) {
                        return ["U"];
                    }
                    switch (AB[0]) {
                    case "M":
                        AC.X = AB[1];
                        AC.Y = AB[2];
                        break;
                    case "S":
                        var i = AC.x + (AC.x - (AC.bx || AC.x)),
                            AD = AC.y + (AC.y - (AC.by || AC.y));
                        AB = ["C", i, AD, AB[1], AB[2], AB[3], AB[4]];
                        break;
                    case "T":
                        var i = AC.x + (AC.x - (AC.bx || AC.x)),
                            AD = AC.y + (AC.y - (AC.by || AC.y));
                        AB = ["Q", i, AD, AB[1], AB[2]];
                        break;
                    case "H":
                        AB = ["L", AB[1], AC.y];
                        break;
                    case "V":
                        AB = ["L", AC.x, AB[1]];
                        break;
                    case "Z":
                        AB = ["L", AC.X, AC.Y];
                        break;
                    }
                    return AB;
                },
                AA = function (AD, AC, AF) {
                    if (x[AD][AF][0] == "M" && x[AC][AF][0] != "M") {
                        x[AC].splice(AF, 0, ["M", e[AC].x, e[AC].y]);
                        e[AD].bx = x[AD][AF][x[AD][AF].length - 4] || 0;
                        e[AD].by = x[AD][AF][x[AD][AF].length - 3] || 0;
                        e[AD].x = x[AD][AF][x[AD][AF].length - 2];
                        e[AD].y = x[AD][AF][x[AD][AF].length - 1];
                        return true;
                    } else {
                        if (x[AD][AF][0] == "L" && x[AC][AF][0] == "C") {
                            x[AD][AF] = ["C", e[AD].x, e[AD].y, x[AD][AF][1], x[AD][AF][2], x[AD][AF][1], x[AD][AF][2]];
                        } else {
                            if (x[AD][AF][0] == "L" && x[AC][AF][0] == "Q") {
                                x[AD][AF] = ["Q", x[AD][AF][1], x[AD][AF][2], x[AD][AF][1], x[AD][AF][2]];
                            } else {
                                if (x[AD][AF][0] == "Q" && x[AC][AF][0] == "C") {
                                    var AB = x[AC][AF][x[AC][AF].length - 2],
                                        AH = x[AC][AF][x[AC][AF].length - 1];
                                    x[AC].splice(AF + 1, 0, ["Q", AB, AH, AB, AH]);
                                    x[AD].splice(AF, 0, ["C", e[AD].x, e[AD].y, e[AD].x, e[AD].y, e[AD].x, e[AD].y]);
                                    AF++;
                                    e[AC].bx = x[AC][AF][x[AC][AF].length - 4] || 0;
                                    e[AC].by = x[AC][AF][x[AC][AF].length - 3] || 0;
                                    e[AC].x = x[AC][AF][x[AC][AF].length - 2];
                                    e[AC].y = x[AC][AF][x[AC][AF].length - 1];
                                    return true;
                                } else {
                                    if (x[AD][AF][0] == "A" && x[AC][AF][0] == "C") {
                                        var AB = x[AC][AF][x[AC][AF].length - 2],
                                            AH = x[AC][AF][x[AC][AF].length - 1];
                                        x[AC].splice(AF + 1, 0, ["A", 0, 0, x[AD][AF][3], x[AD][AF][4], x[AD][AF][5], AB, AH]);
                                        x[AD].splice(AF, 0, ["C", e[AD].x, e[AD].y, e[AD].x, e[AD].y, e[AD].x, e[AD].y]);
                                        AF++;
                                        e[AC].bx = x[AC][AF][x[AC][AF].length - 4] || 0;
                                        e[AC].by = x[AC][AF][x[AC][AF].length - 3] || 0;
                                        e[AC].x = x[AC][AF][x[AC][AF].length - 2];
                                        e[AC].y = x[AC][AF][x[AC][AF].length - 1];
                                        return true;
                                    } else {
                                        if (x[AD][AF][0] == "U") {
                                            x[AD][AF][0] = x[AC][AF][0];
                                            for (var AE = 1, AG = x[AC][AF].length; AE < AG; AE++) {
                                                x[AD][AF][AE] = (AE % 2) ? e[AD].x : e[AD].y;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return false;
                };
            for (var w = 0; w < Math.max(x[0].length, x[1].length); w++) {
                x[0][w] = R(x[0][w], e[0]);
                x[1][w] = R(x[1][w], e[1]);
                if (x[0][w][0] != x[1][w][0] && (AA(0, 1, w) || AA(1, 0, w))) {
                    continue;
                }
                e[0].bx = x[0][w][x[0][w].length - 4] || 0;
                e[0].by = x[0][w][x[0][w].length - 3] || 0;
                e[0].x = x[0][w][x[0][w].length - 2];
                e[0].y = x[0][w][x[0][w].length - 1];
                e[1].bx = x[1][w][x[1][w].length - 4] || 0;
                e[1].by = x[1][w][x[1][w].length - 3] || 0;
                e[1].x = x[1][w][x[1][w].length - 2];
                e[1].y = x[1][w][x[1][w].length - 1];
            }
            if (L.length > 20) {
                delete Z[L.unshift()];
            }
            L.push(z + y);
            Z[z + y] = x;
            return x;
        },
        N = function (AE) {
            if (typeof AE == "string") {
                AE = AE.split(/\s*\-\s*/);
                var w = AE.shift();
                if (w.toLowerCase() == "v") {
                    w = 90;
                } else {
                    if (w.toLowerCase() == "h") {
                        w = 0;
                    } else {
                        w = parseFloat(w);
                    }
                }
                w = -w;
                var AC = {
                    angle: w,
                    type: "linear",
                    dots: [],
                    vector: [0, 0, Math.cos(w * Math.PI / 180).toFixed(3), Math.sin(w * Math.PI / 180).toFixed(3)]
                },
                    AD = 1 / (Math.max(Math.abs(AC.vector[2]), Math.abs(AC.vector[3])) || 1);
                AC.vector[2] *= AD;
                AC.vector[3] *= AD;
                if (AC.vector[2] < 0) {
                    AC.vector[0] = -AC.vector[2];
                    AC.vector[2] = 0;
                }
                if (AC.vector[3] < 0) {
                    AC.vector[1] = -AC.vector[3];
                    AC.vector[3] = 0;
                }
                AC.vector[0] = AC.vector[0].toFixed(3);
                AC.vector[1] = AC.vector[1].toFixed(3);
                AC.vector[2] = AC.vector[2].toFixed(3);
                AC.vector[3] = AC.vector[3].toFixed(3);
                for (var z = 0, AF = AE.length; z < AF; z++) {
                    var R = {},
                        AB = AE[z].match(/^([^:]*):?([\d\.]*)/);
                    R.color = E.getRGB(AB[1]).hex;
                    AB[2] && (R.offset = AB[2] + "%");
                    AC.dots.push(R);
                }
                for (var z = 1, AF = AC.dots.length - 1; z < AF; z++) {
                    if (!AC.dots[z].offset) {
                        var e = parseFloat(AC.dots[z - 1].offset || 0),
                            x = false;
                        for (var y = z + 1; y < AF; y++) {
                            if (AC.dots[y].offset) {
                                x = AC.dots[y].offset;
                                break;
                            }
                        }
                        if (!x) {
                            x = 100;
                            y = AF;
                        }
                        x = parseFloat(x);
                        var AA = (x - e) / (y - z + 1);
                        for (; z < y; z++) {
                            e += AA;
                            AC.dots[z].offset = e + "%";
                        }
                    }
                }
                return AC;
            } else {
                return AE;
            }
        },
        g = function () {
            var i, e, z, w, R;
            if (typeof arguments[0] == "string" || typeof arguments[0] == "object") {
                if (typeof arguments[0] == "string") {
                    i = F.getElementById(arguments[0]);
                } else {
                    i = arguments[0];
                }
                if (i.tagName) {
                    if (arguments[1] == null) {
                        return {
                            container: i,
                            width: i.style.pixelWidth || i.offsetWidth,
                            height: i.style.pixelHeight || i.offsetHeight
                        };
                    } else {
                        return {
                            container: i,
                            width: arguments[1],
                            height: arguments[2]
                        };
                    }
                }
            } else {
                if (typeof arguments[0] == "number" && arguments.length > 3) {
                    return {
                        container: 1,
                        x: arguments[0],
                        y: arguments[1],
                        width: arguments[2],
                        height: arguments[3]
                    };
                }
            }
        },
        A = function (R, i) {
            var e = this;
            for (var w in i) {
                if (i.hasOwnProperty(w) && !(w in R)) {
                    switch (typeof i[w]) {
                    case "function":
                        (function (x) {
                            R[w] = R === e ? x : function () {
                                return x.apply(e, arguments);
                            };
                        })(i[w]);
                        break;
                    case "object":
                        R[w] = R[w] || {};
                        A.call(this, R[w], i[w]);
                        break;
                    default:
                        R[w] = i[w];
                        break;
                    }
                }
            }
        };
    if (E.svg) {
        E.toString = function () {
            return "Your browser supports SVG.\nYou are running Rapha\u00ebl " + this.version;
        };
        var H = {
            absolutely: function () {
                this.isAbsolute = true;
                return this;
            },
            relatively: function () {
                this.isAbsolute = false;
                return this;
            },
            moveTo: function (R, w) {
                var i = this.isAbsolute ? "M" : "m";
                i += parseFloat(R).toFixed(3) + " " + parseFloat(w).toFixed(3) + " ";
                var e = this[0].getAttribute("d") || "";
                (e == "M0,0") && (e = "");
                this[0].setAttribute("d", e + i);
                this.last.x = (this.isAbsolute ? 0 : this.last.x) + parseFloat(R);
                this.last.y = (this.isAbsolute ? 0 : this.last.y) + parseFloat(w);
                this.attrs.path = e + i;
                return this;
            },
            lineTo: function (R, w) {
                this.last.x = (!this.isAbsolute * this.last.x) + parseFloat(R);
                this.last.y = (!this.isAbsolute * this.last.y) + parseFloat(w);
                var i = this.isAbsolute ? "L" : "l";
                i += parseFloat(R).toFixed(3) + " " + parseFloat(w).toFixed(3) + " ";
                var e = this.node.getAttribute("d") || "";
                this.node.setAttribute("d", e + i);
                this.attrs.path = e + i;
                return this;
            },
            arcTo: function (AA, z, e, w, R, AC) {
                var AB = this.isAbsolute ? "A" : "a";
                AB += [parseFloat(AA).toFixed(3), parseFloat(z).toFixed(3), 0, e, w, parseFloat(R).toFixed(3), parseFloat(AC).toFixed(3)].join(" ");
                var i = this[0].getAttribute("d") || "";
                this.node.setAttribute("d", i + AB);
                this.last.x = parseFloat(R);
                this.last.y = parseFloat(AC);
                this.attrs.path = i + AB;
                return this;
            },
            cplineTo: function (e, AF, AA) {
                if (!AA) {
                    return this.lineTo(e, AF);
                } else {
                    var R = {},
                        AG = parseFloat(e),
                        AD = parseFloat(AF),
                        AH = parseFloat(AA),
                        AC = this.isAbsolute ? "C" : "c",
                        AB = [+this.last.x + AH, +this.last.y, AG - AH, AD, AG, AD];
                    for (var z = 0, AI = AB.length; z < AI; z++) {
                        AC += AB[z] + " ";
                    }
                    this.last.x = (this.isAbsolute ? 0 : this.last.x) + AB[4];
                    this.last.y = (this.isAbsolute ? 0 : this.last.y) + AB[5];
                    this.last.bx = AB[2];
                    this.last.by = AB[3];
                    var AE = this.node.getAttribute("d") || "";
                    this.node.setAttribute("d", AE + AC);
                    this.attrs.path = AE + AC;
                    return this;
                }
            },
            curveTo: function () {
                var x = {},
                    y = [0, 1, 2, 3, "s", 5, "c"][arguments.length];
                if (this.isAbsolute) {
                    y = y.toUpperCase();
                }
                for (var e = 0, w = arguments.length; e < w; e++) {
                    y += parseFloat(arguments[e]).toFixed(3) + " ";
                }
                this.last.x = (this.isAbsolute ? 0 : this.last.x) + parseFloat(arguments[arguments.length - 2]);
                this.last.y = (this.isAbsolute ? 0 : this.last.y) + parseFloat(arguments[arguments.length - 1]);
                this.last.bx = parseFloat(arguments[arguments.length - 4]);
                this.last.by = parseFloat(arguments[arguments.length - 3]);
                var R = this.node.getAttribute("d") || "";
                this.node.setAttribute("d", R + y);
                this.attrs.path = R + y;
                return this;
            },
            qcurveTo: function () {
                var x = {},
                    y = [0, 1, "t", 3, "q"][arguments.length];
                if (this.isAbsolute) {
                    y = y.toUpperCase();
                }
                for (var e = 0, w = arguments.length; e < w; e++) {
                    y += parseFloat(arguments[e]).toFixed(3) + " ";
                }
                this.last.x = (this.isAbsolute ? 0 : this.last.x) + parseFloat(arguments[arguments.length - 2]);
                this.last.y = (this.isAbsolute ? 0 : this.last.y) + parseFloat(arguments[arguments.length - 1]);
                if (arguments.length != 2) {
                    this.last.qx = parseFloat(arguments[arguments.length - 4]);
                    this.last.qy = parseFloat(arguments[arguments.length - 3]);
                }
                var R = this.node.getAttribute("d") || "";
                this.node.setAttribute("d", R + y);
                this.attrs.path = R + y;
                return this;
            },
            addRoundedCorner: S,
            andClose: function () {
                var R = this[0].getAttribute("d") || "";
                this[0].setAttribute("d", R + "Z ");
                this.attrs.path = R + "Z ";
                return this;
            }
        };
        var u = function (w, R, y) {
                w = w || {};
                var e = F.createElementNS(y.svgns, "path");
                if (y.canvas) {
                    y.canvas.appendChild(e);
                }
                var i = new M(e, y);
                i.isAbsolute = true;
                for (var x in H) {
                    i[x] = H[x];
                }
                i.type = "path";
                i.last = {
                    x: 0,
                    y: 0,
                    bx: 0,
                    by: 0
                };
                if (R) {
                    i.attrs.path = "" + R;
                    i.absolutely();
                    B.pathfinder(i, i.attrs.path);
                }
                if (w) {
                    !w.gradient && (w.fill = w.fill || "none");
                    w.stroke = w.stroke || "#000";
                } else {
                    w = {
                        fill: "none",
                        stroke: "#000"
                    };
                }
                f(i, w);
                return i;
            };
        var n = function (AA, y, AB) {
                y = N(y);
                var x = F.createElementNS(AB.svgns, (y.type || "linear") + "Gradient");
                x.id = "raphael-gradient-" + E.idGenerator++;
                if (y.vector && y.vector.length) {
                    x.setAttribute("x1", y.vector[0]);
                    x.setAttribute("y1", y.vector[1]);
                    x.setAttribute("x2", y.vector[2]);
                    x.setAttribute("y2", y.vector[3]);
                }
                AB.defs.appendChild(x);
                var z = true;
                for (var e = 0, w = y.dots.length; e < w; e++) {
                    var R = F.createElementNS(AB.svgns, "stop");
                    if (y.dots[e].offset) {
                        z = false;
                    }
                    R.setAttribute("offset", y.dots[e].offset ? y.dots[e].offset : (e == 0) ? "0%" : "100%");
                    R.setAttribute("stop-color", E.getRGB(y.dots[e].color).hex || "#fff");
                    x.appendChild(R);
                }
                if (z && typeof y.dots[w - 1].opacity != "undefined") {
                    R.setAttribute("stop-opacity", y.dots[w - 1].opacity);
                }
                AA.setAttribute("fill", "url(#" + x.id + ")");
                AA.style.fill = "";
                AA.style.opacity = 1;
                AA.style.fillOpacity = 1;
                AA.setAttribute("opacity", 1);
                AA.setAttribute("fill-opacity", 1);
            };
        var U = function (e) {
                if (e.pattern) {
                    var R = e.getBBox();
                    e.pattern.setAttribute("patternTransform", "translate(".concat(R.x, ",", R.y, ")"));
                }
            };
        var f = function (AD, AK) {
                var AG = {
                    "": [0],
                    none: [0],
                    "-": [3, 1],
                    ".": [1, 1],
                    "-.": [3, 1, 1, 1],
                    "-..": [3, 1, 1, 1, 1, 1],
                    ". ": [1, 3],
                    "- ": [4, 3],
                    "--": [8, 3],
                    "- .": [4, 3, 1, 3],
                    "--.": [8, 3, 1, 3],
                    "--..": [8, 3, 1, 3, 1, 3]
                },
                    AI = AD.node,
                    AE = AD.attrs,
                    AA = AE.rotation,
                    x = function (AS, AR) {
                        AR = AG[AR.toString().toLowerCase()];
                        if (AR) {
                            var AP = AS.attrs["stroke-width"] || "1",
                                AM = {
                                    round: AP,
                                    square: AP,
                                    butt: 0
                                }[AS.attrs["stroke-linecap"] || AK["stroke-linecap"]] || 0,
                                AQ = [];
                            for (var AN = 0, AO = AR.length; AN < AO; AN++) {
                                AQ.push(AR[AN] * AP + ((AN % 2) ? 1 : -1) * AM);
                            }
                            AR = AQ.join(",");
                            AI.setAttribute("stroke-dasharray", AR);
                        }
                    };
                AD.rotate(0, true);
                for (var AH in AK) {
                    if (!(AH in T)) {
                        continue;
                    }
                    var AF = AK[AH];
                    AE[AH] = AF;
                    switch (AH) {
                    case "href":
                    case "title":
                    case "target":
                        var AJ = AI.parentNode;
                        if (AJ.tagName.toLowerCase() != "a") {
                            var i = F.createElementNS(AD.paper.svgns, "a");
                            AJ.insertBefore(i, AI);
                            i.appendChild(AI);
                            AJ = i;
                        }
                        AJ.setAttributeNS(AD.paper.xlink, AH, AF);
                        break;
                    case "path":
                        if (AD.type == "path") {
                            AI.setAttribute("d", "M0,0");
                            B.pathfinder(AD, AF);
                        }
                    case "width":
                        AI.setAttribute(AH, AF);
                        if (AE.fx) {
                            AH = "x";
                            AF = AE.x;
                        } else {
                            break;
                        }
                    case "x":
                        if (AE.fx) {
                            AF = -AE.x - (AE.width || 0);
                        }
                    case "rx":
                    case "cx":
                        AI.setAttribute(AH, AF);
                        U(AD);
                        break;
                    case "height":
                        AI.setAttribute(AH, AF);
                        if (AE.fy) {
                            AH = "y";
                            AF = AE.y;
                        } else {
                            break;
                        }
                    case "y":
                        if (AE.fy) {
                            AF = -AE.y - (AE.height || 0);
                        }
                    case "ry":
                    case "cy":
                        AI.setAttribute(AH, AF);
                        U(AD);
                        break;
                    case "r":
                        if (AD.type == "rect") {
                            AI.setAttribute("rx", AF);
                            AI.setAttribute("ry", AF);
                        } else {
                            AI.setAttribute(AH, AF);
                        }
                        break;
                    case "src":
                        if (AD.type == "image") {
                            AI.setAttributeNS(AD.paper.xlink, "href", AF);
                        }
                        break;
                    case "stroke-width":
                        AI.style.strokeWidth = AF;
                        AI.setAttribute(AH, AF);
                        if (AE["stroke-dasharray"]) {
                            x(AD, AE["stroke-dasharray"]);
                        }
                        break;
                    case "stroke-dasharray":
                        x(AD, AF);
                        break;
                    case "rotation":
                        AD.rotate(AF, true);
                        break;
                    case "translation":
                        var y = (AF + "").split(v);
                        AD.translate((+y[0] + 1 || 2) - 1, (+y[1] + 1 || 2) - 1);
                        break;
                    case "scale":
                        var y = (AF + "").split(v);
                        AD.scale(+y[0] || 1, +y[1] || +y[0] || 1, +y[2] || null, +y[3] || null);
                        break;
                    case "fill":
                        var w = (AF + "").match(/^url\(([^\)]+)\)$/i);
                        if (w) {
                            var e = F.createElementNS(AD.paper.svgns, "pattern"),
                                AC = F.createElementNS(AD.paper.svgns, "image");
                            e.id = "raphael-pattern-" + E.idGenerator++;
                            e.setAttribute("x", 0);
                            e.setAttribute("y", 0);
                            e.setAttribute("patternUnits", "userSpaceOnUse");
                            AC.setAttribute("x", 0);
                            AC.setAttribute("y", 0);
                            AC.setAttributeNS(AD.paper.xlink, "href", w[1]);
                            e.appendChild(AC);
                            var AL = F.createElement("img");
                            AL.style.position = "absolute";
                            AL.style.top = "-9999em";
                            AL.style.left = "-9999em";
                            AL.onload = function () {
                                e.setAttribute("width", this.offsetWidth);
                                e.setAttribute("height", this.offsetHeight);
                                AC.setAttribute("width", this.offsetWidth);
                                AC.setAttribute("height", this.offsetHeight);
                                F.body.removeChild(this);
                                B.safari();
                            };
                            F.body.appendChild(AL);
                            AL.src = w[1];
                            AD.paper.defs.appendChild(e);
                            AI.style.fill = "url(#" + e.id + ")";
                            AI.setAttribute("fill", "url(#" + e.id + ")");
                            AD.pattern = e;
                            U(AD);
                            break;
                        }
                        delete AK.gradient;
                        delete AE.gradient;
                        if (typeof AE.opacity != "undefined" && typeof AK.opacity == "undefined") {
                            AI.style.opacity = AE.opacity;
                            AI.setAttribute("opacity", AE.opacity);
                        }
                        if (typeof AE["fill-opacity"] != "undefined" && typeof AK["fill-opacity"] == "undefined") {
                            AI.style.fillOpacity = AD.attrs["fill-opacity"];
                            AI.setAttribute("fill-opacity", AE["fill-opacity"]);
                        }
                    case "stroke":
                        AI.style[AH] = E.getRGB(AF).hex;
                        AI.setAttribute(AH, E.getRGB(AF).hex);
                        break;
                    case "gradient":
                        n(AI, AF, AD.paper);
                        break;
                    case "opacity":
                    case "fill-opacity":
                        if (AE.gradient) {
                            var R = F.getElementById(AI.getAttribute("fill").replace(/^url\(#|\)$/g, ""));
                            if (R) {
                                var z = R.getElementsByTagName("stop");
                                z[z.length - 1].setAttribute("stop-opacity", AF);
                            }
                            break;
                        }
                    default:
                        var AB = AH.replace(/(\-.)/g, function (AM) {
                            return AM.substring(1).toUpperCase();
                        });
                        AI.style[AB] = AF;
                        AI.setAttribute(AH, AF);
                        break;
                    }
                }
                r(AD, AK);
                AD.rotate(AE.rotation, true);
            };
        var k = 1.2;
        var r = function (R, x) {
                if (R.type != "text" || !("text" in x || "font" in x || "font-size" in x || "x" in x || "y" in x)) {
                    return;
                }
                var AC = R.attrs,
                    e = R.node,
                    AE = e.firstChild ? parseInt(F.defaultView.getComputedStyle(e.firstChild, "").getPropertyValue("font-size"), 10) : 10;
                if ("text" in x) {
                    while (e.firstChild) {
                        e.removeChild(e.firstChild);
                    }
                    var w = (x.text + "").split("\n");
                    for (var y = 0, AD = w.length; y < AD; y++) {
                        var AA = F.createElementNS(R.paper.svgns, "tspan");
                        y && AA.setAttribute("dy", AE * k);
                        y && AA.setAttribute("x", AC.x);
                        AA.appendChild(F.createTextNode(w[y]));
                        e.appendChild(AA);
                    }
                } else {
                    var w = e.getElementsByTagName("tspan");
                    for (var y = 0, AD = w.length; y < AD; y++) {
                        y && w[y].setAttribute("dy", AE * k);
                        y && w[y].setAttribute("x", AC.x);
                    }
                }
                e.setAttribute("y", AC.y);
                var z = R.getBBox(),
                    AB = AC.y - (z.y + z.height / 2);
                AB && e.setAttribute("y", AC.y + AB);
            };
        var M = function (e, R) {
                var w = 0,
                    i = 0;
                this[0] = e;
                this.node = e;
                this.paper = R;
                this.attrs = this.attrs || {};
                this.transformations = [];
                this._ = {
                    tx: 0,
                    ty: 0,
                    rt: {
                        deg: 0,
                        x: 0,
                        y: 0
                    },
                    sx: 1,
                    sy: 1
                };
            };
        M.prototype.rotate = function (e, R, w) {
            if (e == null) {
                return this._.rt.deg;
            }
            var i = this.getBBox();
            e = e.toString().split(v);
            if (e.length - 1) {
                R = parseFloat(e[1]);
                w = parseFloat(e[2]);
            }
            e = parseFloat(e[0]);
            if (R != null) {
                this._.rt.deg = e;
            } else {
                this._.rt.deg += e;
            }
            if (w == null) {
                R = null;
            }
            R = R == null ? i.x + i.width / 2 : R;
            w = w == null ? i.y + i.height / 2 : w;
            if (this._.rt.deg) {
                this.transformations[0] = ("rotate(" + this._.rt.deg + " " + R + " " + w + ")");
            } else {
                this.transformations[0] = "";
            }
            this.node.setAttribute("transform", this.transformations.join(" "));
            return this;
        };
        M.prototype.hide = function () {
            this.node.style.display = "none";
            return this;
        };
        M.prototype.show = function () {
            this.node.style.display = "block";
            return this;
        };
        M.prototype.remove = function () {
            this.node.parentNode.removeChild(this.node);
        };
        M.prototype.getBBox = function () {
            if (this.node.style.display == "none") {
                this.show();
                var w = true;
            }
            var AA = {};
            try {
                AA = this.node.getBBox();
            } catch (y) {} finally {
                AA = AA || {};
            }
            if (this.type == "text") {
                AA = {
                    x: AA.x,
                    y: Infinity,
                    width: AA.width,
                    height: 0
                };
                for (var R = 0, x = this.node.getNumberOfChars(); R < x; R++) {
                    var z = this.node.getExtentOfChar(R);
                    (z.y < AA.y) && (AA.y = z.y);
                    (z.y + z.height - AA.y > AA.height) && (AA.height = z.y + z.height - AA.y);
                }
            }
            w && this.hide();
            return AA;
        };
        M.prototype.attr = function () {
            if (arguments.length == 1 && typeof arguments[0] == "string") {
                if (arguments[0] == "translation") {
                    return this.translate();
                }
                return this.attrs[arguments[0]];
            }
            if (arguments.length == 1 && E.isArray(arguments[0])) {
                var R = {};
                for (var e in arguments[0]) {
                    R[arguments[0][e]] = this.attrs[arguments[0][e]];
                }
                return R;
            }
            if (arguments.length == 2) {
                var i = {};
                i[arguments[0]] = arguments[1];
                f(this, i);
            } else {
                if (arguments.length == 1 && typeof arguments[0] == "object") {
                    f(this, arguments[0]);
                }
            }
            return this;
        };
        M.prototype.toFront = function () {
            this.node.parentNode.appendChild(this.node);
            return this;
        };
        M.prototype.toBack = function () {
            if (this.node.parentNode.firstChild != this.node) {
                this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild);
            }
            return this;
        };
        M.prototype.insertAfter = function (R) {
            if (R.node.nextSibling) {
                R.node.parentNode.insertBefore(this.node, R.node.nextSibling);
            } else {
                R.node.parentNode.appendChild(this.node);
            }
            return this;
        };
        M.prototype.insertBefore = function (R) {
            var e = R.node;
            e.parentNode.insertBefore(this.node, e);
            return this;
        };
        var b = function (e, R, AA, z) {
                var w = F.createElementNS(e.svgns, "circle");
                w.setAttribute("cx", R);
                w.setAttribute("cy", AA);
                w.setAttribute("r", z);
                w.setAttribute("fill", "none");
                w.setAttribute("stroke", "#000");
                if (e.canvas) {
                    e.canvas.appendChild(w);
                }
                var i = new M(w, e);
                i.attrs = i.attrs || {};
                i.attrs.cx = R;
                i.attrs.cy = AA;
                i.attrs.r = z;
                i.attrs.stroke = "#000";
                i.type = "circle";
                return i;
            };
        var j = function (i, R, AD, e, AB, AC) {
                var AA = F.createElementNS(i.svgns, "rect");
                AA.setAttribute("x", R);
                AA.setAttribute("y", AD);
                AA.setAttribute("width", e);
                AA.setAttribute("height", AB);
                if (AC) {
                    AA.setAttribute("rx", AC);
                    AA.setAttribute("ry", AC);
                }
                AA.setAttribute("fill", "none");
                AA.setAttribute("stroke", "#000");
                if (i.canvas) {
                    i.canvas.appendChild(AA);
                }
                var z = new M(AA, i);
                z.attrs = z.attrs || {};
                z.attrs.x = R;
                z.attrs.y = AD;
                z.attrs.width = e;
                z.attrs.height = AB;
                z.attrs.stroke = "#000";
                if (AC) {
                    z.attrs.rx = z.attrs.ry = AC;
                }
                z.type = "rect";
                return z;
            };
        var G = function (e, R, AB, AA, z) {
                var w = F.createElementNS(e.svgns, "ellipse");
                w.setAttribute("cx", R);
                w.setAttribute("cy", AB);
                w.setAttribute("rx", AA);
                w.setAttribute("ry", z);
                w.setAttribute("fill", "none");
                w.setAttribute("stroke", "#000");
                if (e.canvas) {
                    e.canvas.appendChild(w);
                }
                var i = new M(w, e);
                i.attrs = i.attrs || {};
                i.attrs.cx = R;
                i.attrs.cy = AB;
                i.attrs.rx = AA;
                i.attrs.ry = z;
                i.attrs.stroke = "#000";
                i.type = "ellipse";
                return i;
            };
        var Q = function (i, AC, R, AD, e, AB) {
                var AA = F.createElementNS(i.svgns, "image");
                AA.setAttribute("x", R);
                AA.setAttribute("y", AD);
                AA.setAttribute("width", e);
                AA.setAttribute("height", AB);
                AA.setAttribute("preserveAspectRatio", "none");
                AA.setAttributeNS(i.xlink, "href", AC);
                if (i.canvas) {
                    i.canvas.appendChild(AA);
                }
                var z = new M(AA, i);
                z.attrs = z.attrs || {};
                z.attrs.x = R;
                z.attrs.y = AD;
                z.attrs.width = e;
                z.attrs.height = AB;
                z.type = "image";
                return z;
            };
        var h = function (e, R, AA, z) {
                var w = F.createElementNS(e.svgns, "text");
                w.setAttribute("x", R);
                w.setAttribute("y", AA);
                w.setAttribute("text-anchor", "middle");
                if (e.canvas) {
                    e.canvas.appendChild(w);
                }
                var i = new M(w, e);
                i.attrs = i.attrs || {};
                i.attrs.x = R;
                i.attrs.y = AA;
                i.type = "text";
                f(i, {
                    font: T.font,
                    stroke: "none",
                    fill: "#000",
                    text: z
                });
                return i;
            };
        var c = function (e, R) {
                this.width = e || this.width;
                this.height = R || this.height;
                this.canvas.setAttribute("width", this.width);
                this.canvas.setAttribute("height", this.height);
                return this;
            };
        var K = function () {
                var w = g.apply(null, arguments),
                    i = w.container,
                    e = w.x,
                    AB = w.y,
                    z = w.width,
                    R = w.height;
                if (!i) {
                    throw new Error("SVG container not found.");
                }
                B.canvas = F.createElementNS(B.svgns, "svg");
                B.canvas.setAttribute("width", z || 512);
                B.width = z || 512;
                B.canvas.setAttribute("height", R || 342);
                B.height = R || 342;
                if (i == 1) {
                    F.body.appendChild(B.canvas);
                    B.canvas.style.position = "absolute";
                    B.canvas.style.left = e + "px";
                    B.canvas.style.top = AB + "px";
                } else {
                    if (i.firstChild) {
                        i.insertBefore(B.canvas, i.firstChild);
                    } else {
                        i.appendChild(B.canvas);
                    }
                }
                i = {
                    canvas: B.canvas,
                    clear: function () {
                        while (this.canvas.firstChild) {
                            this.canvas.removeChild(this.canvas.firstChild);
                        }
                        this.defs = F.createElementNS(B.svgns, "defs");
                        this.canvas.appendChild(this.defs);
                    }
                };
                for (var AA in B) {
                    if (AA != "create") {
                        i[AA] = B[AA];
                    }
                }
                A.call(i, i, E.fn);
                i.clear();
                i.raphael = E;
                return i;
            };
        B.remove = function () {
            this.canvas.parentNode.removeChild(this.canvas);
        };
        B.svgns = "http://www.w3.org/2000/svg";
        B.xlink = "http://www.w3.org/1999/xlink";
        B.safari = function () {
            if ({
                "Apple Computer, Inc.": 1,
                "Google Inc.": 1
            }[navigator.vendor]) {
                var R = this.rect(-this.width, -this.height, this.width * 3, this.height * 3).attr({
                    stroke: "none"
                });
                setTimeout(function () {
                    R.remove();
                });
            }
        };
    }
    if (E.vml) {
        E.toString = function () {
            return "Your browser doesn\u2019t support SVG. Assuming it is Internet Explorer and falling down to VML.\nYou are running Rapha\u00ebl " + this.version;
        };
        var H = {
            absolutely: function () {
                this.isAbsolute = true;
                return this;
            },
            relatively: function () {
                this.isAbsolute = false;
                return this;
            },
            moveTo: function (R, z) {
                var w = Math.round(parseFloat(R)) - 1,
                    i = Math.round(parseFloat(z)) - 1,
                    e = this.isAbsolute ? "m" : "t";
                e += w + " " + i;
                this.node.path = this.Path += e;
                this.last.x = (this.isAbsolute ? 0 : this.last.x) + parseFloat(R);
                this.last.y = (this.isAbsolute ? 0 : this.last.y) + parseFloat(z);
                this.last.isAbsolute = this.isAbsolute;
                this.attrs.path += (this.isAbsolute ? "M" : "m") + [R, z];
                return this;
            },
            lineTo: function (R, z) {
                var w = Math.round(parseFloat(R)) - 1,
                    i = Math.round(parseFloat(z)) - 1,
                    e = this.isAbsolute ? "l" : "r";
                e += w + " " + i;
                this.node.path = this.Path += e;
                this.last.x = (this.isAbsolute ? 0 : this.last.x) + parseFloat(R);
                this.last.y = (this.isAbsolute ? 0 : this.last.y) + parseFloat(z);
                this.last.isAbsolute = this.isAbsolute;
                this.attrs.path += (this.isAbsolute ? "L" : "l") + [R, z];
                return this;
            },
            arcTo: function (AB, AA, AD, AK, AI, R) {
                var AC = (this.isAbsolute ? 0 : this.last.x) + parseFloat(AI) - 1,
                    AM = (this.isAbsolute ? 0 : this.last.y) + parseFloat(R) - 1,
                    AJ = this.last.x - 1,
                    i = this.last.y - 1,
                    AF = (AJ - AC) / 2,
                    AE = (i - AM) / 2,
                    AH = (AD == AK ? -1 : 1) * Math.sqrt(Math.abs(AB * AB * AA * AA - AB * AB * AE * AE - AA * AA * AF * AF) / (AB * AB * AE * AE + AA * AA * AF * AF)),
                    w = AH * AB * AE / AA + (AJ + AC) / 2,
                    e = AH * -AA * AF / AB + (i + AM) / 2,
                    AL = AK ? (this.isAbsolute ? "wa" : "wr") : (this.isAbsolute ? "at" : "ar"),
                    z = Math.round(w - AB),
                    AG = Math.round(e - AA);
                AL += [z, AG, Math.round(z + AB * 2), Math.round(AG + AA * 2), Math.round(AJ), Math.round(i), Math.round(AC), Math.round(AM)].join(", ");
                this.node.path = this.Path += AL;
                this.last.x = (this.isAbsolute ? 0 : this.last.x) + AI;
                this.last.y = (this.isAbsolute ? 0 : this.last.y) + R;
                this.last.isAbsolute = this.isAbsolute;
                this.attrs.path += (this.isAbsolute ? "A" : "a") + [AB, AA, 0, AD, AK, AI, R];
                return this;
            },
            cplineTo: function (R, AC, i) {
                if (!i) {
                    return this.lineTo(R, AC);
                } else {
                    var AD = Math.round(parseFloat(R)) - 1,
                        AB = Math.round(parseFloat(AC)) - 1,
                        AE = Math.round(parseFloat(i)),
                        AA = this.isAbsolute ? "c" : "v",
                        z = [Math.round(this.last.x) - 1 + AE, Math.round(this.last.y) - 1, AD - AE, AB, AD, AB],
                        e = [this.last.x + i, this.last.y, R - i, AC, R, AC];
                    AA += z.join(" ") + " ";
                    this.last.x = (this.isAbsolute ? 0 : this.last.x) + z[4];
                    this.last.y = (this.isAbsolute ? 0 : this.last.y) + z[5];
                    this.last.bx = z[2];
                    this.last.by = z[3];
                    this.node.path = this.Path += AA;
                    this.attrs.path += (this.isAbsolute ? "C" : "c") + e;
                    return this;
                }
            },
            curveTo: function () {
                var i = this.isAbsolute ? "c" : "v";
                if (arguments.length == 6) {
                    this.last.bx = (this.isAbsolute ? 0 : this.last.x) + parseFloat(arguments[2]);
                    this.last.by = (this.isAbsolute ? 0 : this.last.y) + parseFloat(arguments[3]);
                    this.last.x = (this.isAbsolute ? 0 : this.last.x) + parseFloat(arguments[4]);
                    this.last.y = (this.isAbsolute ? 0 : this.last.y) + parseFloat(arguments[5]);
                    i += [Math.round(parseFloat(arguments[0])) - 1, Math.round(parseFloat(arguments[1])) - 1, Math.round(parseFloat(arguments[2])) - 1, Math.round(parseFloat(arguments[3])) - 1, Math.round(parseFloat(arguments[4])) - 1, Math.round(parseFloat(arguments[5])) - 1].join(" ") + " ";
                    this.last.isAbsolute = this.isAbsolute;
                    this.attrs.path += (this.isAbsolute ? "C" : "c") + Array.prototype.splice.call(arguments, 0, arguments.length);
                }
                if (arguments.length == 4) {
                    var e = this.last.x * 2 - this.last.bx,
                        R = this.last.y * 2 - this.last.by;
                    this.last.bx = (this.isAbsolute ? 0 : this.last.x) + parseFloat(arguments[0]);
                    this.last.by = (this.isAbsolute ? 0 : this.last.y) + parseFloat(arguments[1]);
                    this.last.x = (this.isAbsolute ? 0 : this.last.x) + parseFloat(arguments[2]);
                    this.last.y = (this.isAbsolute ? 0 : this.last.y) + parseFloat(arguments[3]);
                    i += [Math.round(e) - 1, Math.round(R) - 1, Math.round(parseFloat(arguments[0])) - 1, Math.round(parseFloat(arguments[1])) - 1, Math.round(parseFloat(arguments[2])) - 1, Math.round(parseFloat(arguments[3])) - 1].join(" ") + " ";
                    this.attrs.path += (this.isAbsolute ? "S" : "s") + Array.prototype.splice.call(arguments, 0, arguments.length);
                }
                this.node.path = this.Path += i;
                return this;
            },
            qcurveTo: function () {
                var i = Math.round(this.last.x) - 1,
                    e = Math.round(this.last.y) - 1,
                    R = [];
                if (arguments.length == 4) {
                    this.last.qx = (!this.isAbsolute * this.last.x) + parseFloat(arguments[0]);
                    this.last.qy = (!this.isAbsolute * this.last.y) + parseFloat(arguments[1]);
                    this.last.x = (!this.isAbsolute * this.last.x) + parseFloat(arguments[2]);
                    this.last.y = (!this.isAbsolute * this.last.y) + parseFloat(arguments[3]);
                    R = [this.last.qx, this.last.qy, this.last.x, this.last.y];
                    this.last.isAbsolute = this.isAbsolute;
                    this.attrs.path += (this.isAbsolute ? "Q" : "q") + Array.prototype.splice.call(arguments, 0, arguments.length);
                }
                if (arguments.length == 2) {
                    this.last.qx = this.last.x * 2 - this.last.qx;
                    this.last.qy = this.last.y * 2 - this.last.qy;
                    this.last.x = (!this.isAbsolute * this.last.x) + parseFloat(arguments[2]);
                    this.last.y = (!this.isAbsolute * this.last.y) + parseFloat(arguments[3]);
                    R = [this.last.qx, this.last.qy, this.last.x, this.last.y];
                    this.attrs.path += (this.isAbsolute ? "T" : "t") + Array.prototype.splice.call(arguments, 0, arguments.length);
                }
                var w = "c" + [Math.round(2 / 3 * R[0] + 1 / 3 * i) - 1, Math.round(2 / 3 * R[1] + 1 / 3 * e) - 1, Math.round(2 / 3 * R[0] + 1 / 3 * R[2]) - 1, Math.round(2 / 3 * R[1] + 1 / 3 * R[3]) - 1, Math.round(R[2]) - 1, Math.round(R[3]) - 1].join(" ") + " ";
                this.node.path = this.Path += w;
                return this;
            },
            addRoundedCorner: S,
            andClose: function () {
                this.node.path = (this.Path += "x");
                this.attrs.path += "z";
                return this;
            }
        };
        var u = function (x, w, AA) {
                x = x || {};
                var z = t("group"),
                    y = z.style;
                y.position = "absolute";
                y.left = 0;
                y.top = 0;
                y.width = AA.width + "px";
                y.height = AA.height + "px";
                z.coordsize = AA.coordsize;
                z.coordorigin = AA.coordorigin;
                var i = t("shape"),
                    AB = i.style;
                AB.width = AA.width + "px";
                AB.height = AA.height + "px";
                i.path = "";
                if (x["class"]) {
                    i.className = "rvml " + x["class"];
                }
                i.coordsize = this.coordsize;
                i.coordorigin = this.coordorigin;
                z.appendChild(i);
                var e = new M(i, z, AA);
                e.isAbsolute = true;
                e.type = "path";
                e.path = [];
                e.last = {
                    x: 0,
                    y: 0,
                    bx: 0,
                    by: 0,
                    isAbsolute: true
                };
                e.Path = "";
                for (var R in H) {
                    e[R] = H[R];
                }
                if (w) {
                    e.absolutely();
                    e.attrs.path = "";
                    B.pathfinder(e, "" + w);
                }
                if (x) {
                    x.fill = x.fill || "none";
                    x.stroke = x.stroke || "#000";
                } else {
                    x = {
                        fill: "none",
                        stroke: "#000"
                    };
                }
                f(e, x);
                if (x.gradient) {
                    n(e, x.gradient);
                }
                e.setBox();
                AA.canvas.appendChild(z);
                return e;
            };
        var f = function (R, i) {
                var e = R.node,
                    AF = e.style,
                    AE, z = R;
                R.attrs = R.attrs || {};
                for (var y in i) {
                    R.attrs[y] = i[y];
                }
                i.href && (e.href = i.href);
                i.title && (e.title = i.title);
                i.target && (e.target = i.target);
                if (i.path && R.type == "path") {
                    R.Path = "";
                    R.path = [];
                    R.attrs.path = "";
                    B.pathfinder(R, i.path);
                }
                if (i.rotation != null) {
                    R.rotate(i.rotation, true);
                }
                if (i.translation) {
                    AE = (i.translation + "").split(v);
                    R.translate(AE[0], AE[1]);
                }
                if (i.scale) {
                    AE = (i.scale + "").split(v);
                    R.scale(+AE[0] || 1, +AE[1] || +AE[0] || 1, +AE[2] || null, +AE[3] || null);
                }
                if (R.type == "image" && i.src) {
                    e.src = i.src;
                }
                if (R.type == "image" && i.opacity) {
                    e.filterOpacity = " progid:DXImageTransform.Microsoft.Alpha(opacity=" + (i.opacity * 100) + ")";
                    e.style.filter = (e.filterMatrix || "") + (e.filterOpacity || "");
                }
                i.font && (AF.font = i.font);
                i["font-family"] && (AF.fontFamily = '"' + i["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, "") + '"');
                i["font-size"] && (AF.fontSize = i["font-size"]);
                i["font-weight"] && (AF.fontWeight = i["font-weight"]);
                i["font-style"] && (AF.fontStyle = i["font-style"]);
                if (typeof i.opacity != "undefined" || typeof i["stroke-width"] != "undefined" || typeof i.fill != "undefined" || typeof i.stroke != "undefined" || i["stroke-width"] || i["stroke-opacity"] || i["fill-opacity"] || i["stroke-dasharray"] || i["stroke-miterlimit"] || i["stroke-linejoin"] || i["stroke-linecap"]) {
                    R = R.shape || e;
                    var AD = (R.getElementsByTagName("fill") && R.getElementsByTagName("fill")[0]) || t("fill");
                    if ("fill-opacity" in i || "opacity" in i) {
                        var x = ((+i["fill-opacity"] + 1 || 2) - 1) * ((+i.opacity + 1 || 2) - 1);
                        x < 0 && (x = 0);
                        x > 1 && (x = 1);
                        AD.opacity = x;
                    }
                    i.fill && (AD.on = true);
                    if (typeof AD.on == "undefined" || i.fill == "none") {
                        AD.on = false;
                    }
                    if (AD.on && i.fill) {
                        var w = i.fill.match(/^url\(([^\)]+)\)$/i);
                        if (w) {
                            AD.src = w[1];
                            AD.type = "tile";
                        } else {
                            AD.color = E.getRGB(i.fill).hex;
                            AD.src = "";
                            AD.type = "solid";
                        }
                    }
                    R.appendChild(AD);
                    var AC = (R.getElementsByTagName("stroke") && R.getElementsByTagName("stroke")[0]) || t("stroke");
                    if ((i.stroke && i.stroke != "none") || i["stroke-width"] || typeof i["stroke-opacity"] != "undefined" || i["stroke-dasharray"] || i["stroke-miterlimit"] || i["stroke-linejoin"] || i["stroke-linecap"]) {
                        AC.on = true;
                    }
                    if (i.stroke == "none" || typeof AC.on == "undefined" || i.stroke == 0) {
                        AC.on = false;
                    }
                    if (AC.on && i.stroke) {
                        AC.color = E.getRGB(i.stroke).hex;
                    }
                    var x = ((+i["stroke-opacity"] + 1 || 2) - 1) * ((+i.opacity + 1 || 2) - 1);
                    x < 0 && (x = 0);
                    x > 1 && (x = 1);
                    AC.opacity = x;
                    i["stroke-linejoin"] && (AC.joinstyle = i["stroke-linejoin"] || "miter");
                    AC.miterlimit = i["stroke-miterlimit"] || 8;
                    i["stroke-linecap"] && (AC.endcap = {
                        butt: "flat",
                        square: "square",
                        round: "round"
                    }[i["stroke-linecap"]] || "miter");
                    i["stroke-width"] && (AC.weight = (parseFloat(i["stroke-width"]) || 1) * 12 / 16);
                    if (i["stroke-dasharray"]) {
                        var AA = {
                            "-": "shortdash",
                            ".": "shortdot",
                            "-.": "shortdashdot",
                            "-..": "shortdashdotdot",
                            ". ": "dot",
                            "- ": "dash",
                            "--": "longdash",
                            "- .": "dashdot",
                            "--.": "longdashdot",
                            "--..": "longdashdotdot"
                        };
                        AC.dashstyle = AA[i["stroke-dasharray"]] || "";
                    }
                    R.appendChild(AC);
                }
                if (z.type == "text") {
                    var AF = B.span.style,
                        AB = z.attrs;
                    AB.font && (AF.font = AB.font);
                    AB["font-family"] && (AF.fontFamily = AB["font-family"]);
                    AB["font-size"] && (AF.fontSize = AB["font-size"]);
                    AB["font-weight"] && (AF.fontWeight = AB["font-weight"]);
                    AB["font-style"] && (AF.fontStyle = AB["font-style"]);
                    B.span.innerText = z.node.string;
                    z.W = AB.w = B.span.offsetWidth;
                    z.H = AB.h = B.span.offsetHeight;
                    z.X = AB.x;
                    z.Y = AB.y + Math.round(z.H / 2);
                    switch (AB["text-anchor"]) {
                    case "start":
                        z.node.style["v-text-align"] = "left";
                        z.bbx = Math.round(z.W / 2);
                        break;
                    case "end":
                        z.node.style["v-text-align"] = "right";
                        z.bbx = -Math.round(z.W / 2);
                        break;
                    default:
                        z.node.style["v-text-align"] = "center";
                        break;
                    }
                }
            };
        var P = function (e, R, x, w) {
                var i = Math.round(Math.atan((parseFloat(x) - parseFloat(e)) / (parseFloat(w) - parseFloat(R))) * 57.29) || 0;
                if (!i && parseFloat(e) < parseFloat(R)) {
                    i = 180;
                }
                i -= 180;
                if (i < 0) {
                    i += 360;
                }
                return i;
            };
        var n = function (AA, z) {
                z = N(z);
                AA.attrs = AA.attrs || {};
                var e = AA.attrs,
                    y = AA.node.getElementsByTagName("fill");
                AA.attrs.gradient = z;
                AA = AA.shape || AA.node;
                if (y.length) {
                    y = y[0];
                } else {
                    y = t("fill");
                }
                if (z.dots.length) {
                    y.on = true;
                    y.method = "none";
                    y.type = ((z.type + "").toLowerCase() == "radial") ? "gradientTitle" : "gradient";
                    if (typeof z.dots[0].color != "undefined") {
                        y.color = E.getRGB(z.dots[0].color).hex;
                    }
                    if (typeof z.dots[z.dots.length - 1].color != "undefined") {
                        y.color2 = E.getRGB(z.dots[z.dots.length - 1].color).hex;
                    }
                    var AB = [];
                    for (var w = 0, x = z.dots.length; w < x; w++) {
                        if (z.dots[w].offset) {
                            AB.push(z.dots[w].offset + " " + E.getRGB(z.dots[w].color).hex);
                        }
                    }
                    var R = typeof z.dots[z.dots.length - 1].opacity == "undefined" ? (typeof e.opacity == "undefined" ? 1 : e.opacity) : z.dots[z.dots.length - 1].opacity;
                    if (AB.length) {
                        y.colors.value = AB.join(",");
                        R = typeof e.opacity == "undefined" ? 1 : e.opacity;
                    } else {
                        y.colors && (y.colors.value = "0% " + y.color);
                    }
                    y.opacity = R;
                    if (typeof z.angle != "undefined") {
                        y.angle = (-z.angle + 270) % 360;
                    } else {
                        if (z.vector) {
                            y.angle = P.apply(null, z.vector);
                        }
                    }
                    if ((z.type + "").toLowerCase() == "radial") {
                        y.focus = "100%";
                        y.focusposition = "0.5 0.5";
                    }
                }
            };
        var M = function (x, z, R) {
                var y = 0,
                    i = 0,
                    e = 0,
                    w = 1;
                this[0] = x;
                this.node = x;
                this.X = 0;
                this.Y = 0;
                this.attrs = {};
                this.Group = z;
                this.paper = R;
                this._ = {
                    tx: 0,
                    ty: 0,
                    rt: {
                        deg: 0
                    },
                    sx: 1,
                    sy: 1
                };
            };
        M.prototype.rotate = function (e, R, i) {
            if (e == null) {
                return this._.rt.deg;
            }
            e = (e + "").split(v);
            if (e.length - 1) {
                R = parseFloat(e[1]);
                i = parseFloat(e[2]);
            }
            e = parseFloat(e[0]);
            if (R != null) {
                this._.rt.deg = e;
            } else {
                this._.rt.deg += e;
            }
            if (i == null) {
                R = null;
            }
            this._.rt.cx = R;
            this._.rt.cy = i;
            this.setBox(this.attrs, R, i);
            this.Group.style.rotation = this._.rt.deg;
            return this;
        };
        M.prototype.setBox = function (AB, AC, AA) {
            var e = this.Group.style,
                AD = (this.shape && this.shape.style) || this.node.style;
            AB = AB || {};
            for (var AE in AB) {
                this.attrs[AE] = AB[AE];
            }
            AC = AC || this._.rt.cx;
            AA = AA || this._.rt.cy;
            var AH = this.attrs,
                AK, AJ, AL, AG;
            switch (this.type) {
            case "circle":
                AK = AH.cx - AH.r;
                AJ = AH.cy - AH.r;
                AL = AG = AH.r * 2;
                break;
            case "ellipse":
                AK = AH.cx - AH.rx;
                AJ = AH.cy - AH.ry;
                AL = AH.rx * 2;
                AG = AH.ry * 2;
                break;
            case "rect":
            case "image":
                AK = AH.x;
                AJ = AH.y;
                AL = AH.width || 0;
                AG = AH.height || 0;
                break;
            case "text":
                this.textpath.v = ["m", Math.round(AH.x), ", ", Math.round(AH.y - 2), "l", Math.round(AH.x) + 1, ", ", Math.round(AH.y - 2)].join("");
                AK = AH.x - Math.round(this.W / 2);
                AJ = AH.y - this.H / 2;
                AL = this.W;
                AG = this.H;
                break;
            case "path":
                if (!this.attrs.path) {
                    AK = 0;
                    AJ = 0;
                    AL = this.paper.width;
                    AG = this.paper.height;
                } else {
                    var AF = a(this.attrs.path),
                        AK = AF.x;
                    AJ = AF.y;
                    AL = AF.width;
                    AG = AF.height;
                }
                break;
            default:
                AK = 0;
                AJ = 0;
                AL = this.paper.width;
                AG = this.paper.height;
                break;
            }
            AC = (AC == null) ? AK + AL / 2 : AC;
            AA = (AA == null) ? AJ + AG / 2 : AA;
            var z = AC - this.paper.width / 2,
                AI = AA - this.paper.height / 2;
            if (this.type == "path" || this.type == "text") {
                (e.left != z + "px") && (e.left = z + "px");
                (e.top != AI + "px") && (e.top = AI + "px");
                this.X = this.type == "text" ? AK : -z;
                this.Y = this.type == "text" ? AJ : -AI;
                this.W = AL;
                this.H = AG;
                (AD.left != -z + "px") && (AD.left = -z + "px");
                (AD.top != -AI + "px") && (AD.top = -AI + "px");
            } else {
                (e.left != z + "px") && (e.left = z + "px");
                (e.top != AI + "px") && (e.top = AI + "px");
                this.X = AK;
                this.Y = AJ;
                this.W = AL;
                this.H = AG;
                (e.width != this.paper.width + "px") && (e.width = this.paper.width + "px");
                (e.height != this.paper.height + "px") && (e.height = this.paper.height + "px");
                (AD.left != AK - z + "px") && (AD.left = AK - z + "px");
                (AD.top != AJ - AI + "px") && (AD.top = AJ - AI + "px");
                (AD.width != AL + "px") && (AD.width = AL + "px");
                (AD.height != AG + "px") && (AD.height = AG + "px");
                var AM = (+AB.r || 0) / (Math.min(AL, AG));
                if (this.type == "rect" && this.arcsize != AM && (AM || this.arcsize)) {
                    var R = t(AM ? "roundrect" : "rect");
                    R.arcsize = AM;
                    this.Group.appendChild(R);
                    this.node.parentNode.removeChild(this.node);
                    this.node = R;
                    this.arcsize = AM;
                    f(this, this.attrs);
                    this.setBox(this.attrs);
                }
            }
        };
        M.prototype.hide = function () {
            this.Group.style.display = "none";
            return this;
        };
        M.prototype.show = function () {
            this.Group.style.display = "block";
            return this;
        };
        M.prototype.getBBox = function () {
            if (this.type == "path") {
                return a(this.attr("path"));
            }
            return {
                x: this.X + (this.bbx || 0),
                y: this.Y,
                width: this.W,
                height: this.H
            };
        };
        M.prototype.remove = function () {
            this[0].parentNode.removeChild(this[0]);
            this.Group.parentNode.removeChild(this.Group);
            this.shape && this.shape.parentNode.removeChild(this.shape);
        };
        M.prototype.attr = function () {
            if (arguments.length == 1 && typeof arguments[0] == "string") {
                if (arguments[0] == "translation") {
                    return this.translate();
                }
                return this.attrs[arguments[0]];
            }
            if (this.attrs && arguments.length == 1 && E.isArray(arguments[0])) {
                var R = {};
                for (var e = 0, w = arguments[0].length; e < w; e++) {
                    R[arguments[0][e]] = this.attrs[arguments[0][e]];
                }
                return R;
            }
            var x;
            if (arguments.length == 2) {
                x = {};
                x[arguments[0]] = arguments[1];
            }
            if (arguments.length == 1 && typeof arguments[0] == "object") {
                x = arguments[0];
            }
            if (x) {
                if (x.gradient) {
                    n(this, x.gradient);
                }
                if (x.text && this.type == "text") {
                    this.node.string = x.text;
                }
                f(this, x);
                this.setBox(this.attrs);
            }
            return this;
        };
        M.prototype.toFront = function () {
            this.Group.parentNode.appendChild(this.Group);
            return this;
        };
        M.prototype.toBack = function () {
            if (this.Group.parentNode.firstChild != this.Group) {
                this.Group.parentNode.insertBefore(this.Group, this.Group.parentNode.firstChild);
            }
            return this;
        };
        M.prototype.insertAfter = function (R) {
            if (R.Group.nextSibling) {
                R.Group.parentNode.insertBefore(this.Group, R.Group.nextSibling);
            } else {
                R.Group.parentNode.appendChild(this.Group);
            }
            return this;
        };
        M.prototype.insertBefore = function (R) {
            R.Group.parentNode.insertBefore(this.Group, R.Group);
            return this;
        };
        var b = function (e, AD, AC, R) {
                var z = t("group"),
                    w = z.style,
                    i = t("oval"),
                    AB = i.style;
                w.position = "absolute";
                w.left = 0;
                w.top = 0;
                w.width = e.width + "px";
                w.height = e.height + "px";
                z.coordsize = e.coordsize;
                z.coordorigin = e.coordorigin;
                z.appendChild(i);
                var AA = new M(i, z, e);
                AA.type = "circle";
                f(AA, {
                    stroke: "#000",
                    fill: "none"
                });
                AA.attrs.cx = AD;
                AA.attrs.cy = AC;
                AA.attrs.r = R;
                AA.setBox({
                    x: AD - R,
                    y: AC - R,
                    width: R * 2,
                    height: R * 2
                });
                e.canvas.appendChild(z);
                return AA;
            };
        var j = function (e, AE, AD, AF, AA, R) {
                var AB = t("group"),
                    z = AB.style,
                    i = t(R ? "roundrect" : "rect"),
                    AG = (+R || 0) / (Math.min(AF, AA));
                i.arcsize = AG;
                z.position = "absolute";
                z.left = 0;
                z.top = 0;
                z.width = e.width + "px";
                z.height = e.height + "px";
                AB.coordsize = e.coordsize;
                AB.coordorigin = e.coordorigin;
                AB.appendChild(i);
                var AC = new M(i, AB, e);
                AC.type = "rect";
                f(AC, {
                    stroke: "#000"
                });
                AC.arcsize = AG;
                AC.setBox({
                    x: AE,
                    y: AD,
                    width: AF,
                    height: AA,
                    r: +R
                });
                e.canvas.appendChild(AB);
                return AC;
            };
        var G = function (R, AE, AD, i, e) {
                var AA = t("group"),
                    z = AA.style,
                    w = t("oval"),
                    AC = w.style;
                z.position = "absolute";
                z.left = 0;
                z.top = 0;
                z.width = R.width + "px";
                z.height = R.height + "px";
                AA.coordsize = R.coordsize;
                AA.coordorigin = R.coordorigin;
                AA.appendChild(w);
                var AB = new M(w, AA, R);
                AB.type = "ellipse";
                f(AB, {
                    stroke: "#000"
                });
                AB.attrs.cx = AE;
                AB.attrs.cy = AD;
                AB.attrs.rx = i;
                AB.attrs.ry = e;
                AB.setBox({
                    x: AE - i,
                    y: AD - e,
                    width: i * 2,
                    height: e * 2
                });
                R.canvas.appendChild(AA);
                return AB;
            };
        var Q = function (e, R, AF, AE, AG, AA) {
                var AB = t("group"),
                    z = AB.style,
                    i = t("image"),
                    AD = i.style;
                z.position = "absolute";
                z.left = 0;
                z.top = 0;
                z.width = e.width + "px";
                z.height = e.height + "px";
                AB.coordsize = e.coordsize;
                AB.coordorigin = e.coordorigin;
                i.src = R;
                AB.appendChild(i);
                var AC = new M(i, AB, e);
                AC.type = "image";
                AC.attrs.x = AF;
                AC.attrs.y = AE;
                AC.attrs.w = AG;
                AC.attrs.h = AA;
                AC.setBox({
                    x: AF,
                    y: AE,
                    width: AG,
                    height: AA
                });
                e.canvas.appendChild(AB);
                return AC;
            };
        var h = function (e, AE, AD, AF) {
                var AA = t("group"),
                    z = AA.style,
                    w = t("shape"),
                    AC = w.style,
                    AG = t("path"),
                    R = AG.style,
                    i = t("textpath");
                z.position = "absolute";
                z.left = 0;
                z.top = 0;
                z.width = e.width + "px";
                z.height = e.height + "px";
                AA.coordsize = e.coordsize;
                AA.coordorigin = e.coordorigin;
                AG.v = ["m", Math.round(AE), ", ", Math.round(AD), "l", Math.round(AE) + 1, ", ", Math.round(AD)].join("");
                AG.textpathok = true;
                AC.width = e.width;
                AC.height = e.height;
                z.position = "absolute";
                z.left = 0;
                z.top = 0;
                z.width = e.width;
                z.height = e.height;
                i.string = AF;
                i.on = true;
                w.appendChild(i);
                w.appendChild(AG);
                AA.appendChild(w);
                var AB = new M(i, AA, e);
                AB.shape = w;
                AB.textpath = AG;
                AB.type = "text";
                AB.attrs.x = AE;
                AB.attrs.y = AD;
                AB.attrs.w = 1;
                AB.attrs.h = 1;
                f(AB, {
                    font: T.font,
                    stroke: "none",
                    fill: "#000"
                });
                AB.setBox();
                e.canvas.appendChild(AA);
                return AB;
            };
        var c = function (i, R) {
                var e = this.canvas.style;
                this.width = i || this.width;
                this.height = R || this.height;
                e.width = this.width + "px";
                e.height = this.height + "px";
                e.clip = "rect(0 " + this.width + "px " + this.height + "px 0)";
                this.canvas.coordsize = this.width + " " + this.height;
                return this;
            };
        F.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
        try {
            if (!F.namespaces.rvml) {
                F.namespaces.add("rvml", "urn:schemas-microsoft-com:vml");
            }
            var t = function (R) {
                    return F.createElement("<rvml:" + R + ' class="rvml">');
                };
        } catch (s) {
            var t = function (R) {
                    return F.createElement("<" + R + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
                };
        }
        var K = function () {
                var w = g.apply(null, arguments),
                    e = w.container,
                    AC = w.x,
                    AB = w.y,
                    i = w.width,
                    AE, AD = w.height;
                if (!e) {
                    throw new Error("VML container not found.");
                }
                var AA = B.canvas = F.createElement("div"),
                    z = AA.style;
                i = parseFloat(i) || "512px";
                AD = parseFloat(AD) || "342px";
                B.width = i;
                B.height = AD;
                B.coordsize = i + " " + AD;
                B.coordorigin = "0 0";
                B.span = F.createElement("span");
                AE = B.span.style;
                AA.appendChild(B.span);
                AE.position = "absolute";
                AE.left = "-99999px";
                AE.top = "-99999px";
                AE.padding = 0;
                AE.margin = 0;
                AE.lineHeight = 1;
                AE.display = "inline";
                z.width = i + "px";
                z.height = AD + "px";
                z.position = "absolute";
                z.clip = "rect(0 " + i + "px " + AD + "px 0)";
                if (e == 1) {
                    F.body.appendChild(AA);
                    z.left = AC + "px";
                    z.top = AB + "px";
                    e = {
                        style: {
                            width: i,
                            height: AD
                        }
                    };
                } else {
                    e.style.width = i;
                    e.style.height = AD;
                    if (e.firstChild) {
                        e.insertBefore(AA, e.firstChild);
                    } else {
                        e.appendChild(AA);
                    }
                }
                for (var R in B) {
                    e[R] = B[R];
                }
                A.call(e, e, E.fn);
                e.clear = function () {
                    while (AA.firstChild) {
                        AA.removeChild(AA.firstChild);
                    }
                };
                e.raphael = E;
                return e;
            };
        B.remove = function () {
            this.canvas.parentNode.removeChild(this.canvas);
        };
        B.safari = function () {};
    }
    var I = (function () {
        if (F.addEventListener) {
            return function (x, i, e, R) {
                var w = function (y) {
                        return e.call(R, y);
                    };
                x.addEventListener(i, w, false);
                return function () {
                    x.removeEventListener(i, w, false);
                    return true;
                };
            };
        } else {
            if (F.attachEvent) {
                return function (y, w, i, e) {
                    var x = function (z) {
                            return i.call(e, z || l.event);
                        };
                    y.attachEvent("on" + w, x);
                    var R = function () {
                            y.detachEvent("on" + w, x);
                            return true;
                        };
                    if (w == "mouseover") {
                        y.attachEvent("onmouseenter", x);
                        return function () {
                            y.detachEvent("onmouseenter", x);
                            return R();
                        };
                    } else {
                        if (w == "mouseout") {
                            y.attachEvent("onmouseleave", x);
                            return function () {
                                y.detachEvent("onmouseleave", x);
                                return R();
                            };
                        }
                    }
                    return R;
                };
            }
        }
    })();
    for (var p = W.length; p--;) {
        (function (R) {
            M.prototype[R] = function (e) {
                if (typeof e == "function") {
                    this.events = this.events || {};
                    this.events[R] = this.events[R] || {};
                    this.events[R][e] = this.events[R][e] || [];
                    this.events[R][e].push(I(this.shape || this.node, R, e, this));
                }
                return this;
            };
            M.prototype["un" + R] = function (e) {
                this.events && this.events[R] && this.events[R][e] && this.events[R][e].length && this.events[R][e].shift()() && !this.events[R][e].length && delete this.events[R][e];
            };
        })(W[p]);
    }
    B.circle = function (R, i, e) {
        return b(this, R, i, e);
    };
    B.rect = function (R, AA, e, i, z) {
        return j(this, R, AA, e, i, z);
    };
    B.ellipse = function (R, w, i, e) {
        return G(this, R, w, i, e);
    };
    B.path = function (e, R) {
        return u(e, R, this);
    };
    B.image = function (z, R, AA, e, i) {
        return Q(this, z, R, AA, e, i);
    };
    B.text = function (R, i, e) {
        return h(this, R, i, e);
    };
    B.drawGrid = function (AF, AE, AG, AC, AB, AD, z) {
        z = z || "#000";
        var AH = ["M", AF, AE, "L", AF + AG, AE, AF + AG, AE + AC, AF, AE + AC, AF, AE],
            R = AC / AD,
            e = AG / AB;
        for (var AA = 1; AA < AD; AA++) {
            AH = AH.concat(["M", AF, AE + AA * R, "L", AF + AG, AE + AA * R]);
        }
        for (var AA = 1; AA < AB; AA++) {
            AH = AH.concat(["M", AF + AA * e, AE, "L", AF + AA * e, AE + AC]);
        }
        return this.path({
            stroke: z,
            "stroke-width": 1
        }, AH.join(","));
    };
    B.pathfinder = function (z, y) {
        var e = {
            M: function (i, AA) {
                this.moveTo(i, AA);
            },
            C: function (AC, AE, AA, AD, i, AB) {
                this.curveTo(AC, AE, AA, AD, i, AB);
            },
            Q: function (AA, AC, i, AB) {
                this.qcurveTo(AA, AC, i, AB);
            },
            T: function (i, AA) {
                this.qcurveTo(i, AA);
            },
            S: function (AA, AC, i, AB) {
                z.curveTo(AA, AC, i, AB);
            },
            L: function (i, AA) {
                z.lineTo(i, AA);
            },
            H: function (i) {
                this.lineTo(i, this.last.y);
            },
            V: function (i) {
                this.lineTo(this.last.x, i);
            },
            A: function (AD, AC, AA, AB, AE, i, AF) {
                this.arcTo(AD, AC, AB, AE, i, AF);
            },
            Z: function () {
                this.andClose();
            }
        };
        y = X(y);
        for (var w = 0, x = y.length; w < x; w++) {
            var R = y[w].shift();
            e[R].apply(z, y[w]);
            y[w].unshift(R);
        }
    };
    B.set = function (R) {
        return new J(R);
    };
    B.setSize = c;
    M.prototype.stop = function () {
        clearTimeout(this.animation_in_progress);
    };
    M.prototype.scale = function (AI, AH, w, e) {
        if (AI == null && AH == null) {
            return {
                x: this._.sx,
                y: this._.sy,
                toString: function () {
                    return this.x.toFixed(3) + " " + this.y.toFixed(3);
                }
            };
        }
        AH = AH || AI;
        !+AH && (AH = AI);
        var AM, AK, AL, AJ, AY = this.attrs;
        if (AI != 0) {
            var AG = this.type == "path" ? a(AY.path) : this.getBBox(),
                AD = AG.x + AG.width / 2,
                AA = AG.y + AG.height / 2,
                AX = AI / this._.sx,
                AW = AH / this._.sy;
            w = (+w || w == 0) ? w : AD;
            e = (+e || e == 0) ? e : AA;
            var AF = Math.round(AI / Math.abs(AI)),
                AC = Math.round(AH / Math.abs(AH)),
                AP = this.node.style,
                Aa = w + (AD - w) * AF * AX,
                AZ = e + (AA - e) * AC * AW;
            switch (this.type) {
            case "rect":
            case "image":
                var AE = AY.width * AF * AX,
                    AO = AY.height * AC * AW,
                    AB = Aa - AE / 2,
                    z = AZ - AO / 2;
                this.attr({
                    width: AE,
                    height: AO,
                    x: AB,
                    y: z
                });
                break;
            case "circle":
            case "ellipse":
                this.attr({
                    rx: AY.rx * AX,
                    ry: AY.ry * AW,
                    r: AY.r * AX,
                    cx: Aa,
                    cy: AZ
                });
                break;
            case "path":
                var AR = C(AY.path),
                    AS = true;
                for (var AU = 0, AN = AR.length; AU < AN; AU++) {
                    var AQ = AR[AU];
                    if (AQ[0].toUpperCase() == "M" && AS) {
                        continue;
                    } else {
                        AS = false;
                    }
                    if (E.svg && AQ[0].toUpperCase() == "A") {
                        AQ[AR[AU].length - 2] *= AX;
                        AQ[AR[AU].length - 1] *= AW;
                        AQ[1] *= AX;
                        AQ[2] *= AW;
                        AQ[5] = +(AF + AC ? !! +AQ[5] : !+AQ[5]);
                    } else {
                        for (var AT = 1, AV = AQ.length; AT < AV; AT++) {
                            AQ[AT] *= (AT % 2) ? AX : AW;
                        }
                    }
                }
                var R = a(AR),
                    AM = Aa - R.x - R.width / 2,
                    AK = AZ - R.y - R.height / 2;
                AR = C(AR);
                AR[0][1] += AM;
                AR[0][2] += AK;
                this.attr({
                    path: AR.join(" ")
                });
                break;
            }
            if (this.type in {
                text: 1,
                image: 1
            } && (AF != 1 || AC != 1)) {
                if (this.transformations) {
                    this.transformations[2] = "scale(".concat(AF, ",", AC, ")");
                    this.node.setAttribute("transform", this.transformations.join(" "));
                    AM = (AF == -1) ? -AY.x - (AE || 0) : AY.x;
                    AK = (AC == -1) ? -AY.y - (AO || 0) : AY.y;
                    this.attr({
                        x: AM,
                        y: AK
                    });
                    AY.fx = AF - 1;
                    AY.fy = AC - 1;
                } else {
                    this.node.filterMatrix = " progid:DXImageTransform.Microsoft.Matrix(M11=".concat(AF, ", M12=0, M21=0, M22=", AC, ", Dx=0, Dy=0, sizingmethod='auto expand', filtertype='bilinear')");
                    AP.filter = (this.node.filterMatrix || "") + (this.node.filterOpacity || "");
                }
            } else {
                if (this.transformations) {
                    this.transformations[2] = "";
                    this.node.setAttribute("transform", this.transformations.join(" "));
                    AY.fx = 0;
                    AY.fy = 0;
                } else {
                    this.node.filterMatrix = "";
                    AP.filter = (this.node.filterMatrix || "") + (this.node.filterOpacity || "");
                }
            }
            AY.scale = [AI, AH, w, e].join(" ");
            this._.sx = AI;
            this._.sy = AH;
        }
        return this;
    };
    E.easing_formulas = {
        linear: function (R) {
            return R;
        },
        "<": function (R) {
            return Math.pow(R, 3);
        },
        ">": function (R) {
            return Math.pow(R - 1, 3) + 1;
        },
        "<>": function (R) {
            R = R * 2;
            if (R < 1) {
                return Math.pow(R, 3) / 2;
            }
            R -= 2;
            return (Math.pow(R, 3) + 2) / 2;
        },
        backIn: function (e) {
            var R = 1.70158;
            return Math.pow(e, 2) * ((R + 1) * e - R);
        },
        backOut: function (e) {
            e = e - 1;
            var R = 1.70158;
            return Math.pow(e, 2) * ((R + 1) * e + R) + 1;
        },
        elastic: function (i) {
            if (i == 0 || i == 1) {
                return i;
            }
            var e = 0.3,
                R = e / 4;
            return Math.pow(2, -10 * i) * Math.sin((i - R) * (2 * Math.PI) / e) + 1;
        },
        bounce: function (w) {
            var e = 7.5625,
                i = 2.75,
                R;
            if (w < (1 / i)) {
                R = e * Math.pow(w, 2);
            } else {
                if (w < (2 / i)) {
                    w -= (1.5 / i);
                    R = e * Math.pow(w, 2) + 0.75;
                } else {
                    if (w < (2.5 / i)) {
                        w -= (2.25 / i);
                        R = e * Math.pow(w, 2) + 0.9375;
                    } else {
                        w -= (2.625 / i);
                        R = e * Math.pow(w, 2) + 0.984375;
                    }
                }
            }
            return R;
        }
    };
    E.easing = function (e, R) {
        return E.easing_formulas[e] ? E.easing_formulas[e](R) : R;
    };
    M.prototype.animate = function (AO, AG, AF, x) {
        clearTimeout(this.animation_in_progress);
        if (typeof AF == "function" || !AF) {
            x = AF || null;
            AF = "linear";
        }
        var AJ = {},
            e = {},
            AD = {},
            AC = {
                x: 0,
                y: 0
            };
        for (var AH in AO) {
            if (AH in V) {
                AJ[AH] = this.attr(AH);
                (typeof AJ[AH] == "undefined") && (AJ[AH] = T[AH]);
                e[AH] = AO[AH];
                switch (V[AH]) {
                case "number":
                    AD[AH] = (e[AH] - AJ[AH]) / AG;
                    break;
                case "colour":
                    AJ[AH] = E.getRGB(AJ[AH]);
                    var AI = E.getRGB(e[AH]);
                    AD[AH] = {
                        r: (AI.r - AJ[AH].r) / AG,
                        g: (AI.g - AJ[AH].g) / AG,
                        b: (AI.b - AJ[AH].b) / AG
                    };
                    break;
                case "path":
                    var y = d(AJ[AH], e[AH]);
                    AJ[AH] = y[0];
                    e[AH] = y[1];
                    AD[AH] = [];
                    for (var AL = 0, AB = AJ[AH].length; AL < AB; AL++) {
                        AD[AH][AL] = [0];
                        for (var AK = 1, AN = AJ[AH][AL].length; AK < AN; AK++) {
                            AD[AH][AL][AK] = (e[AH][AL][AK] - AJ[AH][AL][AK]) / AG;
                        }
                    }
                    break;
                case "csv":
                    var R = (AO[AH] + "").split(v),
                        AA = (AJ[AH] + "").split(v);
                    switch (AH) {
                    case "translation":
                        AJ[AH] = [0, 0];
                        AD[AH] = [R[0] / AG, R[1] / AG];
                        break;
                    case "rotation":
                        AJ[AH] = (AA[1] == R[1] && AA[2] == R[2]) ? AA : [0, R[1], R[2]];
                        AD[AH] = [(R[0] - AJ[AH][0]) / AG, 0, 0];
                        break;
                    case "scale":
                        AO[AH] = R;
                        AJ[AH] = (AJ[AH] + "").split(v);
                        AD[AH] = [(R[0] - AJ[AH][0]) / AG, (R[1] - AJ[AH][1]) / AG, 0, 0];
                    }
                    e[AH] = R;
                }
            }
        }
        var w = +new Date,
            AE = 0,
            z = this;
        (function AM() {
            var AQ = new Date - w,
                AX = {},
                AP;
            if (AQ < AG) {
                pos = E.easing(AF, AQ / AG);
                for (var AU in AJ) {
                    switch (V[AU]) {
                    case "number":
                        AP = +AJ[AU] + pos * AG * AD[AU];
                        break;
                    case "colour":
                        AP = "rgb(" + [Math.round(AJ[AU].r + pos * AG * AD[AU].r), Math.round(AJ[AU].g + pos * AG * AD[AU].g), Math.round(AJ[AU].b + pos * AG * AD[AU].b)].join(",") + ")";
                        break;
                    case "path":
                        AP = [];
                        for (var AS = 0, AY = AJ[AU].length; AS < AY; AS++) {
                            AP[AS] = [AJ[AU][AS][0]];
                            for (var AR = 1, AT = AJ[AU][AS].length; AR < AT; AR++) {
                                AP[AS][AR] = AJ[AU][AS][AR] + pos * AG * AD[AU][AS][AR];
                            }
                            AP[AS] = AP[AS].join(" ");
                        }
                        AP = AP.join(" ");
                        break;
                    case "csv":
                        switch (AU) {
                        case "translation":
                            var AW = AD[AU][0] * (AQ - AE),
                                AV = AD[AU][1] * (AQ - AE);
                            AC.x += AW;
                            AC.y += AV;
                            AP = [AW, AV].join(" ");
                            break;
                        case "rotation":
                            AP = +AJ[AU][0] + pos * AG * AD[AU][0];
                            AJ[AU][1] && (AP += "," + AJ[AU][1] + "," + AJ[AU][2]);
                            break;
                        case "scale":
                            AP = [+AJ[AU][0] + pos * AG * AD[AU][0], +AJ[AU][1] + pos * AG * AD[AU][1], (2 in AO[AU] ? AO[AU][2] : ""), (3 in AO[AU] ? AO[AU][3] : "")].join(" ");
                        }
                        break;
                    }
                    if (AU == "font-size") {
                        AX[AU] = AP + "px";
                    } else {
                        AX[AU] = AP;
                    }
                }
                z.attr(AX);
                z.animation_in_progress = setTimeout(AM);
                E.svg && B.safari();
            } else {
                (AC.x || AC.y) && z.translate(-AC.x, -AC.y);
                z.attr(AO);
                clearTimeout(z.animation_in_progress);
                B.safari();
                (typeof x == "function") && x.call(z);
            }
            AE = AQ;
        })();
        return this;
    };
    M.prototype.translate = function (R, i) {
        if (R == null) {
            return {
                x: this._.tx,
                y: this._.ty
            };
        }
        this._.tx += +R;
        this._.ty += +i;
        switch (this.type) {
        case "circle":
        case "ellipse":
            this.attr({
                cx: +R + this.attrs.cx,
                cy: +i + this.attrs.cy
            });
            break;
        case "rect":
        case "image":
        case "text":
            this.attr({
                x: +R + this.attrs.x,
                y: +i + this.attrs.y
            });
            break;
        case "path":
            var e = C(this.attrs.path);
            e[0][1] += +R;
            e[0][2] += +i;
            this.attr({
                path: e.join(" ")
            });
            break;
        }
        return this;
    };
    var J = function (R) {
            this.items = [];
            this.length = 0;
            if (R) {
                for (var e = 0, w = R.length; e < w; e++) {
                    if (R[e] && (R[e].constructor == M || R[e].constructor == J)) {
                        this[this.items.length] = this.items[this.items.length] = R[e];
                        this.length++;
                    }
                }
            }
        };
    J.prototype.push = function () {
        var x, R;
        for (var e = 0, w = arguments.length; e < w; e++) {
            x = arguments[e];
            if (x && (x.constructor == M || x.constructor == J)) {
                R = this.items.length;
                this[R] = this.items[R] = x;
                this.length++;
            }
        }
        return this;
    };
    J.prototype.pop = function (w) {
        var e = this.items.splice(w, 1)[0];
        for (var R = w, i = this.items.length; R < i; R++) {
            this[R] = this[R + 1];
        }
        delete this[i + 1];
        this.length--;
        return e;
    };
    for (var q in M.prototype) {
        J.prototype[q] = (function (R) {
            return function () {
                for (var e = 0, w = this.items.length; e < w; e++) {
                    this.items[e][R].apply(this.items[e], arguments);
                }
                return this;
            };
        })(q);
    }
    J.prototype.attr = function (e, z) {
        if (e && E.isArray(e) && typeof e[0] == "object") {
            for (var R = 0, y = e.length; R < y; R++) {
                this.items[R].attr(e[R]);
            }
        } else {
            for (var w = 0, x = this.items.length; w < x; w++) {
                this.items[w].attr.apply(this.items[w], arguments);
            }
        }
        return this;
    };
    J.prototype.getBBox = function () {
        var R = [],
            AC = [],
            e = [],
            AA = [];
        for (var z = this.items.length; z--;) {
            var AB = this.items[z].getBBox();
            R.push(AB.x);
            AC.push(AB.y);
            e.push(AB.x + AB.width);
            AA.push(AB.y + AB.height);
        }
        R = Math.min.apply(Math, R);
        AC = Math.min.apply(Math, AC);
        return {
            x: R,
            y: AC,
            width: Math.max.apply(Math, e) - R,
            height: Math.max.apply(Math, AA) - AC
        };
    };
    E.registerFont = function (e) {
        if (!e.face) {
            return e;
        }
        this.fonts = this.fonts || {};
        var w = {
            w: e.w,
            face: {},
            glyphs: {}
        },
            i = e.face["font-family"];
        for (var z in e.face) {
            w.face[z] = e.face[z];
        }
        if (this.fonts[i]) {
            this.fonts[i].push(w);
        } else {
            this.fonts[i] = [w];
        }
        if (!e.svg) {
            w.face["units-per-em"] = parseInt(e.face["units-per-em"], 10);
            for (var x in e.glyphs) {
                var y = e.glyphs[x];
                w.glyphs[x] = {
                    w: y.w,
                    k: {},
                    d: y.d && "M" + y.d.replace(/[mlcxtrv]/g, function (AA) {
                        return {
                            l: "L",
                            c: "C",
                            x: "z",
                            t: "m",
                            r: "l",
                            v: "c"
                        }[AA] || "M";
                    }) + "z"
                };
                if (y.k) {
                    for (var R in y.k) {
                        w.glyphs[x].k[R] = y.k[R];
                    }
                }
            }
        }
        return e;
    };
    B.getFont = function (AB, AC, e, x) {
        x = x || "normal";
        e = e || "normal";
        AC = +AC || {
            normal: 400,
            bold: 700,
            lighter: 300,
            bolder: 800
        }[AC] || 400;
        var y = E.fonts[AB];
        if (!y) {
            var w = new RegExp("(^|\\s)" + AB.replace(/[^\w\d\s+!~.:_-]/g, "") + "(\\s|$)", "i");
            for (var R in E.fonts) {
                if (w.test(R)) {
                    y = E.fonts[R];
                    break;
                }
            }
        }
        var z;
        if (y) {
            for (var AA = 0, AD = y.length; AA < AD; AA++) {
                z = y[AA];
                if (z.face["font-weight"] == AC && (z.face["font-style"] == e || !z.face["font-style"]) && z.face["font-stretch"] == x) {
                    break;
                }
            }
        }
        return z;
    };
    B.print = function (AF, AE, AC, e, AJ) {
        var AA = this.set(),
            AD = (AC + "").split(""),
            R = 0,
            AI = "",
            z;
        if (e) {
            z = (AJ || 16) / e.face["units-per-em"];
            for (var AB = 0, AG = AD.length; AB < AG; AB++) {
                var w = AB && e.glyphs[AD[AB - 1]] || {},
                    AH = e.glyphs[AD[AB]];
                R += AB ? (w.w || e.w) + (w.k && w.k[AD[AB]] || 0) : 0;
                AH && AH.d && AA.push(this.path({
                    fill: "#000",
                    stroke: "none"
                }, AH.d).translate(R, 0));
            }
            AA.scale(z, z, 0, AE).translate(AF, (AJ || 16) / 2);
        }
        return AA;
    };
    E.ninja = function () {
        var R = window.Raphael;
        if (o.was) {
            window.Raphael = o.is;
        } else {
            try {
                delete window.Raphael;
            } catch (i) {
                window.Raphael = void(0);
            }
        }
        return R;
    };
    E.el = M.prototype;
    return E;
})();
OpenLayers.Util = {};
OpenLayers.Util.getElement = function () {
    var elements = [];
    for (var i = 0, len = arguments.length; i < len; i++) {
        var element = arguments[i];
        if (typeof element == 'string') {
            element = document.getElementById(element);
        }
        if (arguments.length == 1) {
            return element;
        }
        elements.push(element);
    }
    return elements;
};
OpenLayers.Util.extend = function (destination, source) {
    destination = destination || {};
    if (source) {
        for (var property in source) {
            var value = source[property];
            if (value !== undefined) {
                destination[property] = value;
            }
        }
        var sourceIsEvt = typeof window.Event == "function" && source instanceof window.Event;
        if (!sourceIsEvt && source.hasOwnProperty && source.hasOwnProperty('toString')) {
            destination.toString = source.toString;
        }
    }
    return destination;
};
OpenLayers.Util.removeItem = function (array, item) {
    for (var i = array.length - 1; i >= 0; i--) {
        if (array[i] == item) {
            array.splice(i, 1);
        }
    }
    return array;
};
OpenLayers.Util.clearArray = function (array) {
    OpenLayers.Console.warn(OpenLayers.i18n("methodDeprecated", {
        'newMethod': 'array = []'
    }));
    array.length = 0;
};
OpenLayers.Util.indexOf = function (array, obj) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (array[i] == obj) {
            return i;
        }
    }
    return -1;
};
OpenLayers.Util.modifyDOMElement = function (element, id, px, sz, position, border, overflow, opacity) {
    if (id) {
        element.id = id;
    }
    if (px) {
        element.style.left = px.x + "px";
        element.style.top = px.y + "px";
    }
    if (sz) {
        element.style.width = sz.w + "px";
        element.style.height = sz.h + "px";
    }
    if (position) {
        element.style.position = position;
    }
    if (border) {
        element.style.border = border;
    }
    if (overflow) {
        element.style.overflow = overflow;
    }
    if (parseFloat(opacity) >= 0.0 && parseFloat(opacity) < 1.0) {
        element.style.filter = 'alpha(opacity=' + (opacity * 100) + ')';
        element.style.opacity = opacity;
    } else if (parseFloat(opacity) == 1.0) {
        element.style.filter = '';
        element.style.opacity = '';
    }
};
OpenLayers.Util.createDiv = function (id, px, sz, imgURL, position, border, overflow, opacity) {
    var dom = document.createElement('div');
    if (imgURL) {
        dom.style.backgroundImage = 'url(' + imgURL + ')';
    }
    if (!id) {
        id = OpenLayers.Util.createUniqueID("OpenLayersDiv");
    }
    if (!position) {
        position = "absolute";
    }
    OpenLayers.Util.modifyDOMElement(dom, id, px, sz, position, border, overflow, opacity);
    return dom;
};
OpenLayers.Util.createImage = function (id, px, sz, imgURL, position, border, opacity, delayDisplay) {
    var image = document.createElement("img");
    if (!id) {
        id = OpenLayers.Util.createUniqueID("OpenLayersDiv");
    }
    if (!position) {
        position = "relative";
    }
    OpenLayers.Util.modifyDOMElement(image, id, px, sz, position, border, null, opacity);
    if (delayDisplay) {
        image.style.display = "none";
        OpenLayers.Event.observe(image, "load", OpenLayers.Function.bind(OpenLayers.Util.onImageLoad, image));
        OpenLayers.Event.observe(image, "error", OpenLayers.Function.bind(OpenLayers.Util.onImageLoadError, image));
    }
    image.style.alt = id;
    image.galleryImg = "no";
    if (imgURL) {
        image.src = imgURL;
    }
    return image;
};
OpenLayers.Util.setOpacity = function (element, opacity) {
    OpenLayers.Util.modifyDOMElement(element, null, null, null, null, null, null, opacity);
};
OpenLayers.Util.onImageLoad = function () {
    if (!this.viewRequestID || (this.map && this.viewRequestID == this.map.viewRequestID)) {
        this.style.backgroundColor = null;
        this.style.display = "";
    }
};
OpenLayers.Util.onImageLoadErrorColor = "#C3C3C3";
OpenLayers.IMAGE_RELOAD_ATTEMPTS = 0;
OpenLayers.Util.onImageLoadError = function () {
    this._attempts = (this._attempts) ? (this._attempts + 1) : 1;
    if (this._attempts <= OpenLayers.IMAGE_RELOAD_ATTEMPTS) {
        var urls = this.urls;
        if (urls && urls instanceof Array && urls.length > 1) {
            var src = this.src.toString();
            var current_url, k;
            for (k = 0; current_url = urls[k]; k++) {
                if (src.indexOf(current_url) != -1) {
                    break;
                }
            }
            var guess = Math.floor(urls.length * Math.random());
            var new_url = urls[guess];
            k = 0;
            while (new_url == current_url && k++ < 4) {
                guess = Math.floor(urls.length * Math.random());
                new_url = urls[guess];
            }
            this.src = src.replace(current_url, new_url);
        } else {
            this.src = this.src;
        }
    } else {
        this.style.backgroundColor = OpenLayers.Util.onImageLoadErrorColor;
    }
    this.style.display = "";
};
OpenLayers.Util.alphaHack = function () {
    var arVersion = navigator.appVersion.split("MSIE");
    var version = parseFloat(arVersion[1]);
    var filter = false;
    try {
        filter = !! (document.body.filters);
    } catch (e) {}
    return (filter && (version >= 5.5) && (version < 7));
};
OpenLayers.Util.modifyAlphaImageDiv = function (div, id, px, sz, imgURL, position, border, sizing, opacity) {
    OpenLayers.Util.modifyDOMElement(div, id, px, sz, position, null, null, opacity);
    var img = div.childNodes[0];
    if (imgURL) {
        img.src = imgURL;
    }
    OpenLayers.Util.modifyDOMElement(img, div.id + "_innerImage", null, sz, "relative", border);
    if (OpenLayers.Util.alphaHack()) {
        if (div.style.display != "none") {
            div.style.display = "inline-block";
        }
        if (sizing == null) {
            sizing = "scale";
        }
        div.style.filter = "progid:DXImageTransform.Microsoft" + ".AlphaImageLoader(src='" + img.src + "', " + "sizingMethod='" + sizing + "')";
        if (parseFloat(div.style.opacity) >= 0.0 && parseFloat(div.style.opacity) < 1.0) {
            div.style.filter += " alpha(opacity=" + div.style.opacity * 100 + ")";
        }
        img.style.filter = "alpha(opacity=0)";
    }
};
OpenLayers.Util.createAlphaImageDiv = function (id, px, sz, imgURL, position, border, sizing, opacity, delayDisplay) {
    var div = OpenLayers.Util.createDiv();
    var img = OpenLayers.Util.createImage(null, null, null, null, null, null, null, false);
    div.appendChild(img);
    if (delayDisplay) {
        img.style.display = "none";
        OpenLayers.Event.observe(img, "load", OpenLayers.Function.bind(OpenLayers.Util.onImageLoad, div));
        OpenLayers.Event.observe(img, "error", OpenLayers.Function.bind(OpenLayers.Util.onImageLoadError, div));
    }
    OpenLayers.Util.modifyAlphaImageDiv(div, id, px, sz, imgURL, position, border, sizing, opacity);
    return div;
};
OpenLayers.Util.upperCaseObject = function (object) {
    var uObject = {};
    for (var key in object) {
        uObject[key.toUpperCase()] = object[key];
    }
    return uObject;
};
OpenLayers.Util.applyDefaults = function (to, from) {
    to = to || {};
    var fromIsEvt = typeof window.Event == "function" && from instanceof window.Event;
    for (var key in from) {
        if (to[key] === undefined || (!fromIsEvt && from.hasOwnProperty && from.hasOwnProperty(key) && !to.hasOwnProperty(key))) {
            to[key] = from[key];
        }
    }
    if (!fromIsEvt && from && from.hasOwnProperty && from.hasOwnProperty('toString') && !to.hasOwnProperty('toString')) {
        to.toString = from.toString;
    }
    return to;
};
OpenLayers.Util.getParameterString = function (params) {
    var paramsArray = [];
    for (var key in params) {
        var value = params[key];
        if ((value != null) && (typeof value != 'function')) {
            var encodedValue;
            if (typeof value == 'object' && value.constructor == Array) {
                var encodedItemArray = [];
                for (var itemIndex = 0, len = value.length; itemIndex < len; itemIndex++) {
                    encodedItemArray.push(encodeURIComponent(value[itemIndex]));
                }
                encodedValue = encodedItemArray.join(",");
            } else {
                encodedValue = encodeURIComponent(value);
            }
            paramsArray.push(encodeURIComponent(key) + "=" + encodedValue);
        }
    }
    return paramsArray.join("&");
};
OpenLayers.ImgPath = '';
OpenLayers.Util.getImagesLocation = function () {
    return OpenLayers.ImgPath || (OpenLayers._getScriptLocation() + "img/");
};
OpenLayers.Util.Try = function () {
    var returnValue = null;
    for (var i = 0, len = arguments.length; i < len; i++) {
        var lambda = arguments[i];
        try {
            returnValue = lambda();
            break;
        } catch (e) {}
    }
    return returnValue;
};
OpenLayers.Util.getNodes = function (p, tagName) {
    var nodes = OpenLayers.Util.Try(function () {
        return OpenLayers.Util._getNodes(p.documentElement.childNodes, tagName);
    }, function () {
        return OpenLayers.Util._getNodes(p.childNodes, tagName);
    });
    return nodes;
};
OpenLayers.Util._getNodes = function (nodes, tagName) {
    var retArray = [];
    for (var i = 0, len = nodes.length; i < len; i++) {
        if (nodes[i].nodeName == tagName) {
            retArray.push(nodes[i]);
        }
    }
    return retArray;
};
OpenLayers.Util.getTagText = function (parent, item, index) {
    var result = OpenLayers.Util.getNodes(parent, item);
    if (result && (result.length > 0)) {
        if (!index) {
            index = 0;
        }
        if (result[index].childNodes.length > 1) {
            return result.childNodes[1].nodeValue;
        } else if (result[index].childNodes.length == 1) {
            return result[index].firstChild.nodeValue;
        }
    } else {
        return "";
    }
};
OpenLayers.Util.getXmlNodeValue = function (node) {
    var val = null;
    OpenLayers.Util.Try(function () {
        val = node.text;
        if (!val) {
            val = node.textContent;
        }
        if (!val) {
            val = node.firstChild.nodeValue;
        }
    }, function () {
        val = node.textContent;
    });
    return val;
};
OpenLayers.Util.mouseLeft = function (evt, div) {
    var target = (evt.relatedTarget) ? evt.relatedTarget : evt.toElement;
    while (target != div && target != null) {
        target = target.parentNode;
    }
    return (target != div);
};
OpenLayers.Util.rad = function (x) {
    return x * Math.PI / 180;
};
OpenLayers.Util.distVincenty = function (p1, p2) {
    var a = 6378137,
        b = 6356752.3142,
        f = 1 / 298.257223563;
    var L = OpenLayers.Util.rad(p2.lon - p1.lon);
    var U1 = Math.atan((1 - f) * Math.tan(OpenLayers.Util.rad(p1.lat)));
    var U2 = Math.atan((1 - f) * Math.tan(OpenLayers.Util.rad(p2.lat)));
    var sinU1 = Math.sin(U1),
        cosU1 = Math.cos(U1);
    var sinU2 = Math.sin(U2),
        cosU2 = Math.cos(U2);
    var lambda = L,
        lambdaP = 2 * Math.PI;
    var iterLimit = 20;
    while (Math.abs(lambda - lambdaP) > 1e-12 && --iterLimit > 0) {
        var sinLambda = Math.sin(lambda),
            cosLambda = Math.cos(lambda);
        var sinSigma = Math.sqrt((cosU2 * sinLambda) * (cosU2 * sinLambda) + (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) * (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda));
        if (sinSigma == 0) {
            return 0;
        }
        var cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;
        var sigma = Math.atan2(sinSigma, cosSigma);
        var alpha = Math.asin(cosU1 * cosU2 * sinLambda / sinSigma);
        var cosSqAlpha = Math.cos(alpha) * Math.cos(alpha);
        var cos2SigmaM = cosSigma - 2 * sinU1 * sinU2 / cosSqAlpha;
        var C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
        lambdaP = lambda;
        lambda = L + (1 - C) * f * Math.sin(alpha) * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
    }
    if (iterLimit == 0) {
        return NaN;
    }
    var uSq = cosSqAlpha * (a * a - b * b) / (b * b);
    var A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
    var B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
    var deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) - B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));
    var s = b * A * (sigma - deltaSigma);
    var d = s.toFixed(3) / 1000;
    return d;
};
OpenLayers.Util.getParameters = function (url) {
    url = url || window.location.href;
    var paramsString = "";
    if (OpenLayers.String.contains(url, '?')) {
        var start = url.indexOf('?') + 1;
        var end = OpenLayers.String.contains(url, "#") ? url.indexOf('#') : url.length;
        paramsString = url.substring(start, end);
    }
    var parameters = {};
    var pairs = paramsString.split(/[&;]/);
    for (var i = 0, len = pairs.length; i < len; ++i) {
        var keyValue = pairs[i].split('=');
        if (keyValue[0]) {
            var key = decodeURIComponent(keyValue[0]);
            var value = keyValue[1] || '';
            value = value.split(",");
            for (var j = 0, jlen = value.length; j < jlen; j++) {
                value[j] = decodeURIComponent(value[j]);
            }
            if (value.length == 1) {
                value = value[0];
            }
            parameters[key] = value;
        }
    }
    return parameters;
};
OpenLayers.Util.getArgs = function (url) {
    OpenLayers.Console.warn(OpenLayers.i18n("methodDeprecated", {
        'newMethod': 'OpenLayers.Util.getParameters'
    }));
    return OpenLayers.Util.getParameters(url);
};
OpenLayers.Util.lastSeqID = 0;
OpenLayers.Util.createUniqueID = function (prefix) {
    if (prefix == null) {
        prefix = "id_";
    }
    OpenLayers.Util.lastSeqID += 1;
    return prefix + OpenLayers.Util.lastSeqID;
};
OpenLayers.INCHES_PER_UNIT = {
    'inches': 1.0,
    'ft': 12.0,
    'mi': 63360.0,
    'm': 39.3701,
    'km': 39370.1,
    'dd': 4374754,
    'yd': 36
};
OpenLayers.INCHES_PER_UNIT["in"] = OpenLayers.INCHES_PER_UNIT.inches;
OpenLayers.INCHES_PER_UNIT["degrees"] = OpenLayers.INCHES_PER_UNIT.dd;
OpenLayers.INCHES_PER_UNIT["nmi"] = 1852 * OpenLayers.INCHES_PER_UNIT.m;
OpenLayers.DOTS_PER_INCH = 72;
OpenLayers.Util.normalizeScale = function (scale) {
    var normScale = (scale > 1.0) ? (1.0 / scale) : scale;
    return normScale;
};
OpenLayers.Util.getResolutionFromScale = function (scale, units) {
    if (units == null) {
        units = "degrees";
    }
    var normScale = OpenLayers.Util.normalizeScale(scale);
    var resolution = 1 / (normScale * OpenLayers.INCHES_PER_UNIT[units] * OpenLayers.DOTS_PER_INCH);
    return resolution;
};
OpenLayers.Util.getScaleFromResolution = function (resolution, units) {
    if (units == null) {
        units = "degrees";
    }
    var scale = resolution * OpenLayers.INCHES_PER_UNIT[units] * OpenLayers.DOTS_PER_INCH;
    return scale;
};
OpenLayers.Util.safeStopPropagation = function (evt) {
    OpenLayers.Event.stop(evt, true);
};
OpenLayers.Util.pagePosition = function (forElement) {
    var valueT = 0,
        valueL = 0;
    var element = forElement;
    var child = forElement;
    while (element) {
        if (element == document.body) {
            if (OpenLayers.Element.getStyle(child, 'position') == 'absolute') {
                break;
            }
        }
        valueT += element.offsetTop || 0;
        valueL += element.offsetLeft || 0;
        child = element;
        try {
            element = element.offsetParent;
        } catch (e) {
            OpenLayers.Console.error(OpenLayers.i18n("pagePositionFailed", {
                'elemId': element.id
            }));
            break;
        }
    }
    element = forElement;
    while (element) {
        valueT -= element.scrollTop || 0;
        valueL -= element.scrollLeft || 0;
        element = element.parentNode;
    }
    return [valueL, valueT];
};
OpenLayers.Util.isEquivalentUrl = function (url1, url2, options) {
    options = options || {};
    OpenLayers.Util.applyDefaults(options, {
        ignoreCase: true,
        ignorePort80: true,
        ignoreHash: true
    });
    var urlObj1 = OpenLayers.Util.createUrlObject(url1, options);
    var urlObj2 = OpenLayers.Util.createUrlObject(url2, options);
    for (var key in urlObj1) {
        if (options.test) {
            OpenLayers.Console.userError(key + "\n1:" + urlObj1[key] + "\n2:" + urlObj2[key]);
        }
        var val1 = urlObj1[key];
        var val2 = urlObj2[key];
        switch (key) {
        case "args":
            break;
        case "host":
        case "port":
        case "protocol":
            if ((val1 == "") || (val2 == "")) {
                break;
            }
        default:
            if ((key != "args") && (urlObj1[key] != urlObj2[key])) {
                return false;
            }
            break;
        }
    }
    for (var key in urlObj1.args) {
        if (urlObj1.args[key] != urlObj2.args[key]) {
            return false;
        }
        delete urlObj2.args[key];
    }
    for (var key in urlObj2.args) {
        return false;
    }
    return true;
};
OpenLayers.Util.createUrlObject = function (url, options) {
    options = options || {};
    var urlObject = {};
    if (options.ignoreCase) {
        url = url.toLowerCase();
    }
    var a = document.createElement('a');
    a.href = url;
    urlObject.host = a.host;
    var port = a.port;
    if (port.length <= 0) {
        var newHostLength = urlObject.host.length - (port.length);
        urlObject.host = urlObject.host.substring(0, newHostLength);
    }
    urlObject.protocol = a.protocol;
    urlObject.port = ((port == "80") && (options.ignorePort80)) ? "" : port;
    urlObject.hash = (options.ignoreHash) ? "" : a.hash;
    var queryString = a.search;
    if (!queryString) {
        var qMark = url.indexOf("?");
        queryString = (qMark != -1) ? url.substr(qMark) : "";
    }
    urlObject.args = OpenLayers.Util.getParameters(queryString);
    if (((urlObject.protocol == "file:") && (url.indexOf("file:") != -1)) || ((urlObject.protocol != "file:") && (urlObject.host != ""))) {
        urlObject.pathname = a.pathname;
        var qIndex = urlObject.pathname.indexOf("?");
        if (qIndex != -1) {
            urlObject.pathname = urlObject.pathname.substring(0, qIndex);
        }
    } else {
        var relStr = OpenLayers.Util.removeTail(url);
        var backs = 0;
        do {
            var index = relStr.indexOf("../");
            if (index == 0) {
                backs++;
                relStr = relStr.substr(3);
            } else if (index >= 0) {
                var prevChunk = relStr.substr(0, index - 1);
                var slash = prevChunk.indexOf("/");
                prevChunk = (slash != -1) ? prevChunk.substr(0, slash + 1) : "";
                var postChunk = relStr.substr(index + 3);
                relStr = prevChunk + postChunk;
            }
        } while (index != -1)
        var windowAnchor = document.createElement("a");
        var windowUrl = window.location.href;
        if (options.ignoreCase) {
            windowUrl = windowUrl.toLowerCase();
        }
        windowAnchor.href = windowUrl;
        urlObject.protocol = windowAnchor.protocol;
        var splitter = (windowAnchor.pathname.indexOf("/") != -1) ? "/" : "\\";
        var dirs = windowAnchor.pathname.split(splitter);
        dirs.pop();
        while ((backs > 0) && (dirs.length > 0)) {
            dirs.pop();
            backs--;
        }
        relStr = dirs.join("/") + "/" + relStr;
        urlObject.pathname = relStr;
    }
    if ((urlObject.protocol == "file:") || (urlObject.protocol == "")) {
        urlObject.host = "localhost";
    }
    return urlObject;
};
OpenLayers.Util.removeTail = function (url) {
    var head = null;
    var qMark = url.indexOf("?");
    var hashMark = url.indexOf("#");
    if (qMark == -1) {
        head = (hashMark != -1) ? url.substr(0, hashMark) : url;
    } else {
        head = (hashMark != -1) ? url.substr(0, Math.min(qMark, hashMark)) : url.substr(0, qMark);
    }
    return head;
};
OpenLayers.Util.getBrowserName = function () {
    var browserName = "";
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("opera") != -1) {
        browserName = "opera";
    } else if (ua.indexOf("msie") != -1) {
        browserName = "msie";
    } else if (ua.indexOf("safari") != -1) {
        browserName = "safari";
    } else if (ua.indexOf("mozilla") != -1) {
        if (ua.indexOf("firefox") != -1) {
            browserName = "firefox";
        } else {
            browserName = "mozilla";
        }
    }
    return browserName;
};
OpenLayers.Util.getRenderedDimensions = function (contentHTML, size, options) {
    var w, h;
    var container = document.createElement("div");
    container.style.overflow = "";
    container.style.position = "absolute";
    container.style.left = "-9999px";
    if (size) {
        if (size.w) {
            w = size.w;
            container.style.width = w + "px";
        } else if (size.h) {
            h = size.h;
            container.style.height = h + "px";
        }
    }
    if (options && options.displayClass) {
        container.className = options.displayClass;
    }
    var content = document.createElement("div");
    content.innerHTML = contentHTML;
    container.appendChild(content);
    document.body.appendChild(container);
    if (!w) {
        w = parseInt(content.scrollWidth);
        container.style.width = w + "px";
    }
    if (!h) {
        h = parseInt(content.scrollHeight);
    }
    container.removeChild(content);
    document.body.removeChild(container);
    return new OpenLayers.Size(w, h);
};
OpenLayers.Util.getScrollbarWidth = function () {
    var scrollbarWidth = OpenLayers.Util._scrollbarWidth;
    if (scrollbarWidth == null) {
        var scr = null;
        var inn = null;
        var wNoScroll = 0;
        var wScroll = 0;
        scr = document.createElement('div');
        scr.style.position = 'absolute';
        scr.style.top = '-1000px';
        scr.style.left = '-1000px';
        scr.style.width = '100px';
        scr.style.height = '50px';
        scr.style.overflow = 'hidden';
        inn = document.createElement('div');
        inn.style.width = '100%';
        inn.style.height = '200px';
        scr.appendChild(inn);
        document.body.appendChild(scr);
        wNoScroll = inn.offsetWidth;
        scr.style.overflow = 'scroll';
        wScroll = inn.offsetWidth;
        document.body.removeChild(document.body.lastChild);
        OpenLayers.Util._scrollbarWidth = (wNoScroll - wScroll);
        scrollbarWidth = OpenLayers.Util._scrollbarWidth;
    }
    return scrollbarWidth;
};
OpenLayers.String = {
    startsWith: function (str, sub) {
        return (str.indexOf(sub) == 0);
    },
    contains: function (str, sub) {
        return (str.indexOf(sub) != -1);
    },
    trim: function (str) {
        return str.replace(/^\s*(.*?)\s*$/, "$1");
    },
    camelize: function (str) {
        var oStringList = str.split('-');
        var camelizedString = oStringList[0];
        for (var i = 1, len = oStringList.length; i < len; i++) {
            var s = oStringList[i];
            camelizedString += s.charAt(0).toUpperCase() + s.substring(1);
        }
        return camelizedString;
    },
    format: function (template, context, args) {
        if (!context) {
            context = window;
        }
        var tokens = template.split("${");
        var item, last, replacement;
        for (var i = 1, len = tokens.length; i < len; i++) {
            item = tokens[i];
            last = item.indexOf("}");
            if (last > 0) {
                replacement = context[item.substring(0, last)];
                if (typeof replacement == "function") {
                    replacement = args ? replacement.apply(null, args) : replacement();
                }
                tokens[i] = replacement + item.substring(++last);
            } else {
                tokens[i] = "${" + item;
            }
        }
        return tokens.join("");
    },
    numberRegEx: /^([+-]?)(?=\d|\.\d)\d*(\.\d*)?([Ee]([+-]?\d+))?$/,
    isNumeric: function (value) {
        return OpenLayers.String.numberRegEx.test(value);
    }
};
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (sStart) {
        OpenLayers.Console.warn(OpenLayers.i18n("methodDeprecated", {
            'newMethod': 'OpenLayers.String.startsWith'
        }));
        return OpenLayers.String.startsWith(this, sStart);
    };
}
if (!String.prototype.contains) {
    String.prototype.contains = function (str) {
        OpenLayers.Console.warn(OpenLayers.i18n("methodDeprecated", {
            'newMethod': 'OpenLayers.String.contains'
        }));
        return OpenLayers.String.contains(this, str);
    };
}
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        OpenLayers.Console.warn(OpenLayers.i18n("methodDeprecated", {
            'newMethod': 'OpenLayers.String.trim'
        }));
        return OpenLayers.String.trim(this);
    };
}
if (!String.prototype.camelize) {
    String.prototype.camelize = function () {
        OpenLayers.Console.warn(OpenLayers.i18n("methodDeprecated", {
            'newMethod': 'OpenLayers.String.camelize'
        }));
        return OpenLayers.String.camelize(this);
    };
}
OpenLayers.Number = {
    decimalSeparator: ".",
    thousandsSeparator: ",",
    limitSigDigs: function (num, sig) {
        var fig = 0;
        if (sig > 0) {
            fig = parseFloat(num.toPrecision(sig));
        }
        return fig;
    },
    format: function (num, dec, tsep, dsep) {
        dec = (typeof dec != "undefined") ? dec : 0;
        tsep = (typeof tsep != "undefined") ? tsep : OpenLayers.Number.thousandsSeparator;
        dsep = (typeof dsep != "undefined") ? dsep : OpenLayers.Number.decimalSeparator;
        if (dec != null) {
            num = parseFloat(num.toFixed(dec));
        }
        var parts = num.toString().split(".");
        if (parts.length == 1 && dec == null) {
            dec = 0;
        }
        var integer = parts[0];
        if (tsep) {
            var thousands = /(-?[0-9]+)([0-9]{3})/;
            while (thousands.test(integer)) {
                integer = integer.replace(thousands, "$1" + tsep + "$2");
            }
        }
        var str;
        if (dec == 0) {
            str = integer;
        } else {
            var rem = parts.length > 1 ? parts[1] : "0";
            if (dec != null) {
                rem = rem + new Array(dec - rem.length + 1).join("0");
            }
            str = integer + dsep + rem;
        }
        return str;
    }
};
if (!Number.prototype.limitSigDigs) {
    Number.prototype.limitSigDigs = function (sig) {
        OpenLayers.Console.warn(OpenLayers.i18n("methodDeprecated", {
            'newMethod': 'OpenLayers.Number.limitSigDigs'
        }));
        return OpenLayers.Number.limitSigDigs(this, sig);
    };
}
OpenLayers.Function = {
    bind: function (func, object) {
        var args = Array.prototype.slice.apply(arguments, [2]);
        return function () {
            var newArgs = args.concat(Array.prototype.slice.apply(arguments, [0]));
            return func.apply(object, newArgs);
        };
    },
    bindAsEventListener: function (func, object) {
        return function (event) {
            return func.call(object, event || window.event);
        };
    }
};
if (!Function.prototype.bind) {
    Function.prototype.bind = function () {
        OpenLayers.Console.warn(OpenLayers.i18n("methodDeprecated", {
            'newMethod': 'OpenLayers.Function.bind'
        }));
        Array.prototype.unshift.apply(arguments, [this]);
        return OpenLayers.Function.bind.apply(null, arguments);
    };
}
if (!Function.prototype.bindAsEventListener) {
    Function.prototype.bindAsEventListener = function (object) {
        OpenLayers.Console.warn(OpenLayers.i18n("methodDeprecated", {
            'newMethod': 'OpenLayers.Function.bindAsEventListener'
        }));
        return OpenLayers.Function.bindAsEventListener(this, object);
    };
}
OpenLayers.Array = {
    filter: function (array, callback, caller) {
        var selected = [];
        if (Array.prototype.filter) {
            selected = array.filter(callback, caller);
        } else {
            var len = array.length;
            if (typeof callback != "function") {
                throw new TypeError();
            }
            for (var i = 0; i < len; i++) {
                if (i in array) {
                    var val = array[i];
                    if (callback.call(caller, val, i, array)) {
                        selected.push(val);
                    }
                }
            }
        }
        return selected;
    }
};
OpenLayers.Class = function () {
    var Class = function () {
            if (arguments && arguments[0] != OpenLayers.Class.isPrototype) {
                this.initialize.apply(this, arguments);
            }
        };
    var extended = {};
    var parent;
    for (var i = 0, len = arguments.length; i < len; ++i) {
        if (typeof arguments[i] == "function") {
            parent = arguments[i].prototype;
        } else {
            parent = arguments[i];
        }
        OpenLayers.Util.extend(extended, parent);
    }
    Class.prototype = extended;
    return Class;
};
OpenLayers.Class.isPrototype = function () {};
OpenLayers.Class.create = function () {
    return function () {
        if (arguments && arguments[0] != OpenLayers.Class.isPrototype) {
            this.initialize.apply(this, arguments);
        }
    };
};
OpenLayers.Class.inherit = function () {
    var superClass = arguments[0];
    var proto = new superClass(OpenLayers.Class.isPrototype);
    for (var i = 1, len = arguments.length; i < len; i++) {
        if (typeof arguments[i] == "function") {
            var mixin = arguments[i];
            arguments[i] = new mixin(OpenLayers.Class.isPrototype);
        }
        OpenLayers.Util.extend(proto, arguments[i]);
    }
    return proto;
};
OpenLayers.Bounds = OpenLayers.Class({
    left: null,
    bottom: null,
    right: null,
    top: null,
    initialize: function (left, bottom, right, top) {
        if (left != null) {
            this.left = parseFloat(left);
        }
        if (bottom != null) {
            this.bottom = parseFloat(bottom);
        }
        if (right != null) {
            this.right = parseFloat(right);
        }
        if (top != null) {
            this.top = parseFloat(top);
        }
    },
    clone: function () {
        return new OpenLayers.Bounds(this.left, this.bottom, this.right, this.top);
    },
    equals: function (bounds) {
        var equals = false;
        if (bounds != null) {
            equals = ((this.left == bounds.left) && (this.right == bounds.right) && (this.top == bounds.top) && (this.bottom == bounds.bottom));
        }
        return equals;
    },
    toString: function () {
        return ("left-bottom=(" + this.left + "," + this.bottom + ")" + " right-top=(" + this.right + "," + this.top + ")");
    },
    toArray: function () {
        return [this.left, this.bottom, this.right, this.top];
    },
    toBBOX: function (decimal) {
        if (decimal == null) {
            decimal = 6;
        }
        var mult = Math.pow(10, decimal);
        var bbox = Math.round(this.left * mult) / mult + "," + Math.round(this.bottom * mult) / mult + "," + Math.round(this.right * mult) / mult + "," + Math.round(this.top * mult) / mult;
        return bbox;
    },
    toGeometry: function () {
        return new OpenLayers.Geometry.Polygon([new OpenLayers.Geometry.LinearRing([new OpenLayers.Geometry.Point(this.left, this.bottom), new OpenLayers.Geometry.Point(this.right, this.bottom), new OpenLayers.Geometry.Point(this.right, this.top), new OpenLayers.Geometry.Point(this.left, this.top)])]);
    },
    getWidth: function () {
        return (this.right - this.left);
    },
    getHeight: function () {
        return (this.top - this.bottom);
    },
    getSize: function () {
        return new OpenLayers.Size(this.getWidth(), this.getHeight());
    },
    getCenterPixel: function () {
        return new OpenLayers.Pixel((this.left + this.right) / 2, (this.bottom + this.top) / 2);
    },
    getCenterLonLat: function () {
        return new OpenLayers.LonLat((this.left + this.right) / 2, (this.bottom + this.top) / 2);
    },
    scale: function (ratio, origin) {
        if (origin == null) {
            origin = this.getCenterLonLat();
        }
        var bounds = [];
        var origx, origy;
        if (origin.CLASS_NAME == "OpenLayers.LonLat") {
            origx = origin.lon;
            origy = origin.lat;
        } else {
            origx = origin.x;
            origy = origin.y;
        }
        var left = (this.left - origx) * ratio + origx;
        var bottom = (this.bottom - origy) * ratio + origy;
        var right = (this.right - origx) * ratio + origx;
        var top = (this.top - origy) * ratio + origy;
        return new OpenLayers.Bounds(left, bottom, right, top);
    },
    add: function (x, y) {
        if ((x == null) || (y == null)) {
            var msg = OpenLayers.i18n("boundsAddError");
            OpenLayers.Console.error(msg);
            return null;
        }
        return new OpenLayers.Bounds(this.left + x, this.bottom + y, this.right + x, this.top + y);
    },
    extend: function (object) {
        var bounds = null;
        if (object) {
            switch (object.CLASS_NAME) {
            case "OpenLayers.LonLat":
                bounds = new OpenLayers.Bounds(object.lon, object.lat, object.lon, object.lat);
                break;
            case "OpenLayers.Geometry.Point":
                bounds = new OpenLayers.Bounds(object.x, object.y, object.x, object.y);
                break;
            case "OpenLayers.Bounds":
                bounds = object;
                break;
            }
            if (bounds) {
                if ((this.left == null) || (bounds.left < this.left)) {
                    this.left = bounds.left;
                }
                if ((this.bottom == null) || (bounds.bottom < this.bottom)) {
                    this.bottom = bounds.bottom;
                }
                if ((this.right == null) || (bounds.right > this.right)) {
                    this.right = bounds.right;
                }
                if ((this.top == null) || (bounds.top > this.top)) {
                    this.top = bounds.top;
                }
            }
        }
    },
    containsLonLat: function (ll, inclusive) {
        return this.contains(ll.lon, ll.lat, inclusive);
    },
    containsPixel: function (px, inclusive) {
        return this.contains(px.x, px.y, inclusive);
    },
    contains: function (x, y, inclusive) {
        if (inclusive == null) {
            inclusive = true;
        }
        var contains = false;
        if (inclusive) {
            contains = ((x >= this.left) && (x <= this.right) && (y >= this.bottom) && (y <= this.top));
        } else {
            contains = ((x > this.left) && (x < this.right) && (y > this.bottom) && (y < this.top));
        }
        return contains;
    },
    intersectsBounds: function (bounds, inclusive) {
        if (inclusive == null) {
            inclusive = true;
        }
        var inBottom = (bounds.bottom == this.bottom && bounds.top == this.top) ? true : (((bounds.bottom > this.bottom) && (bounds.bottom < this.top)) || ((this.bottom > bounds.bottom) && (this.bottom < bounds.top)));
        var inTop = (bounds.bottom == this.bottom && bounds.top == this.top) ? true : (((bounds.top > this.bottom) && (bounds.top < this.top)) || ((this.top > bounds.bottom) && (this.top < bounds.top)));
        var inRight = (bounds.right == this.right && bounds.left == this.left) ? true : (((bounds.right > this.left) && (bounds.right < this.right)) || ((this.right > bounds.left) && (this.right < bounds.right)));
        var inLeft = (bounds.right == this.right && bounds.left == this.left) ? true : (((bounds.left > this.left) && (bounds.left < this.right)) || ((this.left > bounds.left) && (this.left < bounds.right)));
        return (this.containsBounds(bounds, true, inclusive) || bounds.containsBounds(this, true, inclusive) || ((inTop || inBottom) && (inLeft || inRight)));
    },
    containsBounds: function (bounds, partial, inclusive) {
        if (partial == null) {
            partial = false;
        }
        if (inclusive == null) {
            inclusive = true;
        }
        var inLeft;
        var inTop;
        var inRight;
        var inBottom;
        if (inclusive) {
            inLeft = (bounds.left >= this.left) && (bounds.left <= this.right);
            inTop = (bounds.top >= this.bottom) && (bounds.top <= this.top);
            inRight = (bounds.right >= this.left) && (bounds.right <= this.right);
            inBottom = (bounds.bottom >= this.bottom) && (bounds.bottom <= this.top);
        } else {
            inLeft = (bounds.left > this.left) && (bounds.left < this.right);
            inTop = (bounds.top > this.bottom) && (bounds.top < this.top);
            inRight = (bounds.right > this.left) && (bounds.right < this.right);
            inBottom = (bounds.bottom > this.bottom) && (bounds.bottom < this.top);
        }
        return (partial) ? (inTop || inBottom) && (inLeft || inRight) : (inTop && inLeft && inBottom && inRight);
    },
    determineQuadrant: function (lonlat) {
        var quadrant = "";
        var center = this.getCenterLonLat();
        quadrant += (lonlat.lat < center.lat) ? "b" : "t";
        quadrant += (lonlat.lon < center.lon) ? "l" : "r";
        return quadrant;
    },
    transform: function (source, dest) {
        var ll = OpenLayers.Projection.transform({
            'x': this.left,
            'y': this.bottom
        }, source, dest);
        var lr = OpenLayers.Projection.transform({
            'x': this.right,
            'y': this.bottom
        }, source, dest);
        var ul = OpenLayers.Projection.transform({
            'x': this.left,
            'y': this.top
        }, source, dest);
        var ur = OpenLayers.Projection.transform({
            'x': this.right,
            'y': this.top
        }, source, dest);
        this.left = Math.min(ll.x, ul.x);
        this.bottom = Math.min(ll.y, lr.y);
        this.right = Math.max(lr.x, ur.x);
        this.top = Math.max(ul.y, ur.y);
        return this;
    },
    wrapDateLine: function (maxExtent, options) {
        options = options || {};
        var leftTolerance = options.leftTolerance || 0;
        var rightTolerance = options.rightTolerance || 0;
        var newBounds = this.clone();
        if (maxExtent) {
            while (newBounds.left < maxExtent.left && (newBounds.right - rightTolerance) <= maxExtent.left) {
                newBounds = newBounds.add(maxExtent.getWidth(), 0);
            }
            while ((newBounds.left + leftTolerance) >= maxExtent.right && newBounds.right > maxExtent.right) {
                newBounds = newBounds.add(-maxExtent.getWidth(), 0);
            }
        }
        return newBounds;
    },
    CLASS_NAME: "OpenLayers.Bounds"
});
OpenLayers.Bounds.fromString = function (str) {
    var bounds = str.split(",");
    return OpenLayers.Bounds.fromArray(bounds);
};
OpenLayers.Bounds.fromArray = function (bbox) {
    return new OpenLayers.Bounds(parseFloat(bbox[0]), parseFloat(bbox[1]), parseFloat(bbox[2]), parseFloat(bbox[3]));
};
OpenLayers.Bounds.fromSize = function (size) {
    return new OpenLayers.Bounds(0, size.h, size.w, 0);
};
OpenLayers.Bounds.oppositeQuadrant = function (quadrant) {
    var opp = "";
    opp += (quadrant.charAt(0) == 't') ? 'b' : 't';
    opp += (quadrant.charAt(1) == 'l') ? 'r' : 'l';
    return opp;
};
OpenLayers.Element = {
    visible: function (element) {
        return OpenLayers.Util.getElement(element).style.display != 'none';
    },
    toggle: function () {
        for (var i = 0, len = arguments.length; i < len; i++) {
            var element = OpenLayers.Util.getElement(arguments[i]);
            var display = OpenLayers.Element.visible(element) ? 'hide' : 'show';
            OpenLayers.Element[display](element);
        }
    },
    hide: function () {
        for (var i = 0, len = arguments.length; i < len; i++) {
            var element = OpenLayers.Util.getElement(arguments[i]);
            element.style.display = 'none';
        }
    },
    show: function () {
        for (var i = 0, len = arguments.length; i < len; i++) {
            var element = OpenLayers.Util.getElement(arguments[i]);
            element.style.display = '';
        }
    },
    remove: function (element) {
        element = OpenLayers.Util.getElement(element);
        element.parentNode.removeChild(element);
    },
    getHeight: function (element) {
        element = OpenLayers.Util.getElement(element);
        return element.offsetHeight;
    },
    getDimensions: function (element) {
        element = OpenLayers.Util.getElement(element);
        if (OpenLayers.Element.getStyle(element, 'display') != 'none') {
            return {
                width: element.offsetWidth,
                height: element.offsetHeight
            };
        }
        var els = element.style;
        var originalVisibility = els.visibility;
        var originalPosition = els.position;
        els.visibility = 'hidden';
        els.position = 'absolute';
        els.display = '';
        var originalWidth = element.clientWidth;
        var originalHeight = element.clientHeight;
        els.display = 'none';
        els.position = originalPosition;
        els.visibility = originalVisibility;
        return {
            width: originalWidth,
            height: originalHeight
        };
    },
    hasClass: function (element, name) {
        var names = element.className;
        return ( !! names && new RegExp("(^|\\s)" + name + "(\\s|$)").test(names));
    },
    addClass: function (element, name) {
        if (!OpenLayers.Element.hasClass(element, name)) {
            element.className += (element.className ? " " : "") + name;
        }
        return element;
    },
    removeClass: function (element, name) {
        var names = element.className;
        if (names) {
            element.className = OpenLayers.String.trim(names.replace(new RegExp("(^|\\s+)" + name + "(\\s+|$)"), " "));
        }
        return element;
    },
    toggleClass: function (element, name) {
        if (OpenLayers.Element.hasClass(element, name)) {
            OpenLayers.Element.removeClass(element, name);
        } else {
            OpenLayers.Element.addClass(element, name);
        }
        return element;
    },
    getStyle: function (element, style) {
        element = OpenLayers.Util.getElement(element);
        var value = null;
        if (element && element.style) {
            value = element.style[OpenLayers.String.camelize(style)];
            if (!value) {
                if (document.defaultView && document.defaultView.getComputedStyle) {
                    var css = document.defaultView.getComputedStyle(element, null);
                    value = css ? css.getPropertyValue(style) : null;
                } else if (element.currentStyle) {
                    value = element.currentStyle[OpenLayers.String.camelize(style)];
                }
            }
            var positions = ['left', 'top', 'right', 'bottom'];
            if (window.opera && (OpenLayers.Util.indexOf(positions, style) != -1) && (OpenLayers.Element.getStyle(element, 'position') == 'static')) {
                value = 'auto';
            }
        }
        return value == 'auto' ? null : value;
    }
};
OpenLayers.LonLat = OpenLayers.Class({
    lon: 0.0,
    lat: 0.0,
    initialize: function (lon, lat) {
        this.lon = parseFloat(lon);
        this.lat = parseFloat(lat);
    },
    toString: function () {
        return ("lon=" + this.lon + ",lat=" + this.lat);
    },
    toShortString: function () {
        return (this.lon + ", " + this.lat);
    },
    clone: function () {
        return new OpenLayers.LonLat(this.lon, this.lat);
    },
    add: function (lon, lat) {
        if ((lon == null) || (lat == null)) {
            var msg = OpenLayers.i18n("lonlatAddError");
            OpenLayers.Console.error(msg);
            return null;
        }
        return new OpenLayers.LonLat(this.lon + lon, this.lat + lat);
    },
    equals: function (ll) {
        var equals = false;
        if (ll != null) {
            equals = ((this.lon == ll.lon && this.lat == ll.lat) || (isNaN(this.lon) && isNaN(this.lat) && isNaN(ll.lon) && isNaN(ll.lat)));
        }
        return equals;
    },
    transform: function (source, dest) {
        var point = OpenLayers.Projection.transform({
            'x': this.lon,
            'y': this.lat
        }, source, dest);
        this.lon = point.x;
        this.lat = point.y;
        return this;
    },
    wrapDateLine: function (maxExtent) {
        var newLonLat = this.clone();
        if (maxExtent) {
            while (newLonLat.lon < maxExtent.left) {
                newLonLat.lon += maxExtent.getWidth();
            }
            while (newLonLat.lon > maxExtent.right) {
                newLonLat.lon -= maxExtent.getWidth();
            }
        }
        return newLonLat;
    },
    CLASS_NAME: "OpenLayers.LonLat"
});
OpenLayers.LonLat.fromString = function (str) {
    var pair = str.split(",");
    return new OpenLayers.LonLat(parseFloat(pair[0]), parseFloat(pair[1]));
};
OpenLayers.Pixel = OpenLayers.Class({
    x: 0.0,
    y: 0.0,
    initialize: function (x, y) {
        this.x = parseFloat(x);
        this.y = parseFloat(y);
    },
    toString: function () {
        return ("x=" + this.x + ",y=" + this.y);
    },
    clone: function () {
        return new OpenLayers.Pixel(this.x, this.y);
    },
    equals: function (px) {
        var equals = false;
        if (px != null) {
            equals = ((this.x == px.x && this.y == px.y) || (isNaN(this.x) && isNaN(this.y) && isNaN(px.x) && isNaN(px.y)));
        }
        return equals;
    },
    add: function (x, y) {
        if ((x == null) || (y == null)) {
            var msg = OpenLayers.i18n("pixelAddError");
            OpenLayers.Console.error(msg);
            return null;
        }
        return new OpenLayers.Pixel(this.x + x, this.y + y);
    },
    offset: function (px) {
        var newPx = this.clone();
        if (px) {
            newPx = this.add(px.x, px.y);
        }
        return newPx;
    },
    CLASS_NAME: "OpenLayers.Pixel"
});
OpenLayers.Size = OpenLayers.Class({
    w: 0.0,
    h: 0.0,
    initialize: function (w, h) {
        this.w = parseFloat(w);
        this.h = parseFloat(h);
    },
    toString: function () {
        return ("w=" + this.w + ",h=" + this.h);
    },
    clone: function () {
        return new OpenLayers.Size(this.w, this.h);
    },
    equals: function (sz) {
        var equals = false;
        if (sz != null) {
            equals = ((this.w == sz.w && this.h == sz.h) || (isNaN(this.w) && isNaN(this.h) && isNaN(sz.w) && isNaN(sz.h)));
        }
        return equals;
    },
    CLASS_NAME: "OpenLayers.Size"
});
OpenLayers.Console = {
    log: function () {},
    debug: function () {},
    info: function () {},
    warn: function () {},
    error: function () {},
    userError: function (error) {
        alert(error);
    },
    assert: function () {},
    dir: function () {},
    dirxml: function () {},
    trace: function () {},
    group: function () {},
    groupEnd: function () {},
    time: function () {},
    timeEnd: function () {},
    profile: function () {},
    profileEnd: function () {},
    count: function () {},
    CLASS_NAME: "OpenLayers.Console"
};
(function () {
    var scripts = document.getElementsByTagName("script");
    for (var i = 0, len = scripts.length; i < len; ++i) {
        if (scripts[i].src.indexOf("firebug.js") != -1) {
            if (console) {
                OpenLayers.Util.extend(OpenLayers.Console, console);
                break;
            }
        }
    }
})();
OpenLayers.Tween = OpenLayers.Class({
    INTERVAL: 10,
    easing: null,
    begin: null,
    finish: null,
    duration: null,
    callbacks: null,
    time: null,
    interval: null,
    playing: false,
    initialize: function (easing) {
        this.easing = (easing) ? easing : OpenLayers.Easing.Expo.easeOut;
    },
    start: function (begin, finish, duration, options) {
        this.playing = true;
        this.begin = begin;
        this.finish = finish;
        this.duration = duration;
        this.callbacks = options.callbacks;
        this.time = 0;
        if (this.interval) {
            window.clearInterval(this.interval);
            this.interval = null;
        }
        if (this.callbacks && this.callbacks.start) {
            this.callbacks.start.call(this, this.begin);
        }
        this.interval = window.setInterval(OpenLayers.Function.bind(this.play, this), this.INTERVAL);
    },
    stop: function () {
        if (!this.playing) {
            return;
        }
        if (this.callbacks && this.callbacks.done) {
            this.callbacks.done.call(this, this.finish);
        }
        window.clearInterval(this.interval);
        this.interval = null;
        this.playing = false;
    },
    play: function () {
        var value = {};
        for (var i in this.begin) {
            var b = this.begin[i];
            var f = this.finish[i];
            if (b == null || f == null || isNaN(b) || isNaN(f)) {
                OpenLayers.Console.error('invalid value for Tween');
            }
            var c = f - b;
            value[i] = this.easing.apply(this, [this.time, b, c, this.duration]);
        }
        this.time++;
        if (this.callbacks && this.callbacks.eachStep) {
            this.callbacks.eachStep.call(this, value);
        }
        if (this.time > this.duration) {
            if (this.callbacks && this.callbacks.done) {
                this.callbacks.done.call(this, this.finish);
                this.playing = false;
            }
            window.clearInterval(this.interval);
            this.interval = null;
        }
    },
    CLASS_NAME: "OpenLayers.Tween"
});
OpenLayers.Easing = {
    CLASS_NAME: "OpenLayers.Easing"
};
OpenLayers.Easing.Linear = {
    easeIn: function (t, b, c, d) {
        return c * t / d + b;
    },
    easeOut: function (t, b, c, d) {
        return c * t / d + b;
    },
    easeInOut: function (t, b, c, d) {
        return c * t / d + b;
    },
    CLASS_NAME: "OpenLayers.Easing.Linear"
};
OpenLayers.Easing.Expo = {
    easeIn: function (t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOut: function (t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOut: function (t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    CLASS_NAME: "OpenLayers.Easing.Expo"
};
OpenLayers.Easing.Quad = {
    easeIn: function (t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    easeOut: function (t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeInOut: function (t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    CLASS_NAME: "OpenLayers.Easing.Quad"
};
OpenLayers.Event = {
    observers: false,
    KEY_BACKSPACE: 8,
    KEY_TAB: 9,
    KEY_RETURN: 13,
    KEY_ESC: 27,
    KEY_LEFT: 37,
    KEY_UP: 38,
    KEY_RIGHT: 39,
    KEY_DOWN: 40,
    KEY_DELETE: 46,
    element: function (event) {
        return event.target || event.srcElement;
    },
    isLeftClick: function (event) {
        return (((event.which) && (event.which == 1)) || ((event.button) && (event.button == 1)));
    },
    isRightClick: function (event) {
        return (((event.which) && (event.which == 3)) || ((event.button) && (event.button == 2)));
    },
    stop: function (event, allowDefault) {
        if (!allowDefault) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        }
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },
    findElement: function (event, tagName) {
        var element = OpenLayers.Event.element(event);
        while (element.parentNode && (!element.tagName || (element.tagName.toUpperCase() != tagName.toUpperCase()))) {
            element = element.parentNode;
        }
        return element;
    },
    observe: function (elementParam, name, observer, useCapture) {
        var element = OpenLayers.Util.getElement(elementParam);
        useCapture = useCapture || false;
        if (name == 'keypress' && (navigator.appVersion.match(/Konqueror|Safari|KHTML/) || element.attachEvent)) {
            name = 'keydown';
        }
        if (!this.observers) {
            this.observers = {};
        }
        if (!element._eventCacheID) {
            var idPrefix = "eventCacheID_";
            if (element.id) {
                idPrefix = element.id + "_" + idPrefix;
            }
            element._eventCacheID = OpenLayers.Util.createUniqueID(idPrefix);
        }
        var cacheID = element._eventCacheID;
        if (!this.observers[cacheID]) {
            this.observers[cacheID] = [];
        }
        this.observers[cacheID].push({
            'element': element,
            'name': name,
            'observer': observer,
            'useCapture': useCapture
        });
        if (element.addEventListener) {
            element.addEventListener(name, observer, useCapture);
        } else if (element.attachEvent) {
            element.attachEvent('on' + name, observer);
        }
    },
    stopObservingElement: function (elementParam) {
        var element = OpenLayers.Util.getElement(elementParam);
        var cacheID = element._eventCacheID;
        this._removeElementObservers(OpenLayers.Event.observers[cacheID]);
    },
    _removeElementObservers: function (elementObservers) {
        if (elementObservers) {
            for (var i = elementObservers.length - 1; i >= 0; i--) {
                var entry = elementObservers[i];
                var args = new Array(entry.element, entry.name, entry.observer, entry.useCapture);
                var removed = OpenLayers.Event.stopObserving.apply(this, args);
            }
        }
    },
    stopObserving: function (elementParam, name, observer, useCapture) {
        useCapture = useCapture || false;
        var element = OpenLayers.Util.getElement(elementParam);
        var cacheID = element._eventCacheID;
        if (name == 'keypress') {
            if (navigator.appVersion.match(/Konqueror|Safari|KHTML/) || element.detachEvent) {
                name = 'keydown';
            }
        }
        var foundEntry = false;
        var elementObservers = OpenLayers.Event.observers[cacheID];
        if (elementObservers) {
            var i = 0;
            while (!foundEntry && i < elementObservers.length) {
                var cacheEntry = elementObservers[i];
                if ((cacheEntry.name == name) && (cacheEntry.observer == observer) && (cacheEntry.useCapture == useCapture)) {
                    elementObservers.splice(i, 1);
                    if (elementObservers.length == 0) {
                        delete OpenLayers.Event.observers[cacheID];
                    }
                    foundEntry = true;
                    break;
                }
                i++;
            }
        }
        if (foundEntry) {
            if (element.removeEventListener) {
                element.removeEventListener(name, observer, useCapture);
            } else if (element && element.detachEvent) {
                element.detachEvent('on' + name, observer);
            }
        }
        return foundEntry;
    },
    unloadCache: function () {
        if (OpenLayers.Event && OpenLayers.Event.observers) {
            for (var cacheID in OpenLayers.Event.observers) {
                var elementObservers = OpenLayers.Event.observers[cacheID];
                OpenLayers.Event._removeElementObservers.apply(this, [elementObservers]);
            }
            OpenLayers.Event.observers = false;
        }
    },
    CLASS_NAME: "OpenLayers.Event"
};
OpenLayers.Event.observe(window, 'unload', OpenLayers.Event.unloadCache, false);
if (window.Event) {
    OpenLayers.Util.applyDefaults(window.Event, OpenLayers.Event);
} else {
    var Event = OpenLayers.Event;
}
OpenLayers.Events = OpenLayers.Class({
    BROWSER_EVENTS: ["mouseover", "mouseout", "mousedown", "mouseup", "mousemove", "click", "dblclick", "rightclick", "dblrightclick", "resize", "focus", "blur"],
    listeners: null,
    object: null,
    element: null,
    eventTypes: null,
    eventHandler: null,
    fallThrough: null,
    includeXY: false,
    initialize: function (object, element, eventTypes, fallThrough, options) {
        OpenLayers.Util.extend(this, options);
        this.object = object;
        this.element = element;
        this.fallThrough = fallThrough;
        this.listeners = {};
        this.eventHandler = OpenLayers.Function.bindAsEventListener(this.handleBrowserEvent, this);
        this.eventTypes = [];
        if (eventTypes != null) {
            for (var i = 0, len = eventTypes.length; i < len; i++) {
                this.addEventType(eventTypes[i]);
            }
        }
        if (this.element != null) {
            this.attachToElement(element);
        }
    },
    destroy: function () {
        if (this.element) {
            OpenLayers.Event.stopObservingElement(this.element);
        }
        this.element = null;
        this.listeners = null;
        this.object = null;
        this.eventTypes = null;
        this.fallThrough = null;
        this.eventHandler = null;
    },
    addEventType: function (eventName) {
        if (!this.listeners[eventName]) {
            this.eventTypes.push(eventName);
            this.listeners[eventName] = [];
        }
    },
    attachToElement: function (element) {
        for (var i = 0, len = this.BROWSER_EVENTS.length; i < len; i++) {
            var eventType = this.BROWSER_EVENTS[i];
            this.addEventType(eventType);
            OpenLayers.Event.observe(element, eventType, this.eventHandler);
        }
        OpenLayers.Event.observe(element, "dragstart", OpenLayers.Event.stop);
    },
    on: function (object) {
        for (var type in object) {
            if (type != "scope") {
                this.register(type, object.scope, object[type]);
            }
        }
    },
    register: function (type, obj, func) {
        if ((func != null) && (OpenLayers.Util.indexOf(this.eventTypes, type) != -1)) {
            if (obj == null) {
                obj = this.object;
            }
            var listeners = this.listeners[type];
            listeners.push({
                obj: obj,
                func: func
            });
        }
    },
    registerPriority: function (type, obj, func) {
        if (func != null) {
            if (obj == null) {
                obj = this.object;
            }
            var listeners = this.listeners[type];
            if (listeners != null) {
                listeners.unshift({
                    obj: obj,
                    func: func
                });
            }
        }
    },
    un: function (object) {
        for (var type in object) {
            if (type != "scope") {
                this.unregister(type, object.scope, object[type]);
            }
        }
    },
    unregister: function (type, obj, func) {
        if (obj == null) {
            obj = this.object;
        }
        var listeners = this.listeners[type];
        if (listeners != null) {
            for (var i = 0, len = listeners.length; i < len; i++) {
                if (listeners[i].obj == obj && listeners[i].func == func) {
                    listeners.splice(i, 1);
                    break;
                }
            }
        }
    },
    remove: function (type) {
        if (this.listeners[type] != null) {
            this.listeners[type] = [];
        }
    },
    triggerEvent: function (type, evt) {
        if (evt == null) {
            evt = {};
        }
        evt.object = this.object;
        evt.element = this.element;
        if (!evt.type) {
            evt.type = type;
        }
        var listeners = (this.listeners[type]) ? this.listeners[type].slice() : null;
        if ((listeners != null) && (listeners.length > 0)) {
            var continueChain;
            for (var i = 0, len = listeners.length; i < len; i++) {
                var callback = listeners[i];
                continueChain = callback.func.apply(callback.obj, [evt]);
                if ((continueChain != undefined) && (continueChain == false)) {
                    break;
                }
            }
            if (!this.fallThrough) {
                OpenLayers.Event.stop(evt, true);
            }
        }
        return continueChain;
    },
    handleBrowserEvent: function (evt) {
        if (this.includeXY) {
            evt.xy = this.getMousePosition(evt);
        }
        this.triggerEvent(evt.type, evt);
    },
    clearMouseCache: function () {
        this.element.scrolls = null;
        this.element.lefttop = null;
        this.element.offsets = null;
    },
    getMousePosition: function (evt) {
        if (!this.includeXY) {
            this.clearMouseCache();
        } else if (!this.element.hasScrollEvent) {
            OpenLayers.Event.observe(window, 'scroll', OpenLayers.Function.bind(this.clearMouseCache, this));
            this.element.hasScrollEvent = true;
        }
        if (!this.element.scrolls) {
            var a = [];
            a[0] = (document.documentElement.scrollLeft || document.body.scrollLeft);
            a[1] = (document.documentElement.scrollTop || document.body.scrollTop);
            this.element.scrolls = a;
        }
        if (!this.element.lefttop) {
            this.element.lefttop = [];
            this.element.lefttop[0] = (document.documentElement.clientLeft || 0);
            this.element.lefttop[1] = (document.documentElement.clientTop || 0);
        }
        if (!this.element.offsets) {
            this.element.offsets = OpenLayers.Util.pagePosition(this.element);
            this.element.offsets[0] += this.element.scrolls[0];
            this.element.offsets[1] += this.element.scrolls[1];
        }
        return new OpenLayers.Pixel((evt.clientX + this.element.scrolls[0]) - this.element.offsets[0] - this.element.lefttop[0], (evt.clientY + this.element.scrolls[1]) - this.element.offsets[1] - this.element.lefttop[1]);
    },
    CLASS_NAME: "OpenLayers.Events"
});
OpenLayers.Projection = OpenLayers.Class({
    proj: null,
    projCode: null,
    initialize: function (projCode, options) {
        OpenLayers.Util.extend(this, options);
        this.projCode = projCode;
        if (window.Proj4js) {
            this.proj = new Proj4js.Proj(projCode);
        }
    },
    getCode: function () {
        return this.proj ? this.proj.srsCode : this.projCode;
    },
    getUnits: function () {
        return this.proj ? this.proj.units : null;
    },
    toString: function () {
        return this.getCode();
    },
    equals: function (projection) {
        if (projection && projection.getCode) {
            return this.getCode() == projection.getCode();
        } else {
            return false;
        }
    },
    destroy: function () {
        delete this.proj;
        delete this.projCode;
    },
    CLASS_NAME: "OpenLayers.Projection"
});
OpenLayers.Projection.transforms = {};
OpenLayers.Projection.addTransform = function (from, to, method) {
    if (!OpenLayers.Projection.transforms[from]) {
        OpenLayers.Projection.transforms[from] = {};
    }
    OpenLayers.Projection.transforms[from][to] = method;
};
OpenLayers.Projection.transform = function (point, source, dest) {
    if (source.proj && dest.proj) {
        point = Proj4js.transform(source.proj, dest.proj, point);
    } else if (source && dest && OpenLayers.Projection.transforms[source.getCode()] && OpenLayers.Projection.transforms[source.getCode()][dest.getCode()]) {
        OpenLayers.Projection.transforms[source.getCode()][dest.getCode()](point);
    }
    return point;
};
OpenLayers.Map = OpenLayers.Class({
    Z_INDEX_BASE: {
        BaseLayer: 100,
        Overlay: 325,
        Feature: 725,
        Popup: 750,
        Control: 1000
    },
    EVENT_TYPES: ["preaddlayer", "addlayer", "removelayer", "changelayer", "movestart", "move", "moveend", "zoomend", "popupopen", "popupclose", "addmarker", "removemarker", "clearmarkers", "mouseover", "mouseout", "mousemove", "dragstart", "drag", "dragend", "changebaselayer", "mousedown", "mouseup"],
    id: null,
    fractionalZoom: false,
    events: null,
    div: null,
    dragging: false,
    size: null,
    viewPortDiv: null,
    layerContainerOrigin: null,
    layerContainerDiv: null,
    layers: null,
    controls: null,
    popups: null,
    baseLayer: null,
    center: null,
    resolution: null,
    zoom: 0,
    panRatio: 1.5,
    viewRequestID: 0,
    tileSize: null,
    projection: "EPSG:4326",
    units: 'degrees',
    resolutions: null,
    maxResolution: 1.40625,
    minResolution: null,
    maxScale: null,
    minScale: null,
    maxExtent: null,
    minExtent: null,
    restrictedExtent: null,
    numZoomLevels: 16,
    theme: null,
    displayProjection: null,
    fallThrough: true,
    panTween: null,
    eventListeners: null,
    panMethod: OpenLayers.Easing.Expo.easeOut,
    paddingForPopups: null,
    initialize: function (div, options) {
        this.tileSize = new OpenLayers.Size(OpenLayers.Map.TILE_WIDTH, OpenLayers.Map.TILE_HEIGHT);
        this.maxExtent = new OpenLayers.Bounds(-180, -90, 180, 90);
        this.paddingForPopups = new OpenLayers.Bounds(15, 15, 15, 15);
        this.theme = OpenLayers._getScriptLocation() + 'theme/default/style.css';
        OpenLayers.Util.extend(this, options);
        this.id = OpenLayers.Util.createUniqueID("OpenLayers.Map_");
        this.div = OpenLayers.Util.getElement(div);
        OpenLayers.Element.addClass(this.div, 'olMap');
        var id = this.div.id + "_OpenLayers_ViewPort";
        this.viewPortDiv = OpenLayers.Util.createDiv(id, null, null, null, "relative", null, "hidden");
        this.viewPortDiv.style.width = "100%";
        this.viewPortDiv.style.height = "100%";
        this.viewPortDiv.className = "olMapViewport";
        this.div.appendChild(this.viewPortDiv);
        id = this.div.id + "_OpenLayers_Container";
        this.layerContainerDiv = OpenLayers.Util.createDiv(id);
        this.layerContainerDiv.style.zIndex = this.Z_INDEX_BASE['Popup'] - 1;
        this.viewPortDiv.appendChild(this.layerContainerDiv);
        this.events = new OpenLayers.Events(this, this.div, this.EVENT_TYPES, this.fallThrough, {
            includeXY: true
        });
        this.updateSize();
        if (this.eventListeners instanceof Object) {
            this.events.on(this.eventListeners);
        }
        this.events.register("movestart", this, this.updateSize);
        if (OpenLayers.String.contains(navigator.appName, "Microsoft")) {
            this.events.register("resize", this, this.updateSize);
        } else {
            this.updateSizeDestroy = OpenLayers.Function.bind(this.updateSize, this);
            OpenLayers.Event.observe(window, 'resize', this.updateSizeDestroy);
        }
        if (this.theme) {
            var addNode = true;
            var nodes = document.getElementsByTagName('link');
            for (var i = 0, len = nodes.length; i < len; ++i) {
                if (OpenLayers.Util.isEquivalentUrl(nodes.item(i).href, this.theme)) {
                    addNode = false;
                    break;
                }
            }
            if (addNode) {
                var cssNode = document.createElement('link');
                cssNode.setAttribute('rel', 'stylesheet');
                cssNode.setAttribute('type', 'text/css');
                cssNode.setAttribute('href', this.theme);
                document.getElementsByTagName('head')[0].appendChild(cssNode);
            }
        }
        this.layers = [];
        if (this.controls == null) {
            if (OpenLayers.Control != null) {
                this.controls = [new OpenLayers.Control.Navigation(), new OpenLayers.Control.PanZoom(), new OpenLayers.Control.ArgParser(), new OpenLayers.Control.Attribution()];
            } else {
                this.controls = [];
            }
        }
        for (var i = 0, len = this.controls.length; i < len; i++) {
            this.addControlToMap(this.controls[i]);
        }
        this.popups = [];
        this.unloadDestroy = OpenLayers.Function.bind(this.destroy, this);
        OpenLayers.Event.observe(window, 'unload', this.unloadDestroy);
    },
    unloadDestroy: null,
    updateSizeDestroy: null,
    destroy: function () {
        if (!this.unloadDestroy) {
            return false;
        }
        OpenLayers.Event.stopObserving(window, 'unload', this.unloadDestroy);
        this.unloadDestroy = null;
        if (this.updateSizeDestroy) {
            OpenLayers.Event.stopObserving(window, 'resize', this.updateSizeDestroy);
        } else {
            this.events.unregister("resize", this, this.updateSize);
        }
        this.paddingForPopups = null;
        if (this.controls != null) {
            for (var i = this.controls.length - 1; i >= 0; --i) {
                this.controls[i].destroy();
            }
            this.controls = null;
        }
        if (this.layers != null) {
            for (var i = this.layers.length - 1; i >= 0; --i) {
                this.layers[i].destroy(false);
            }
            this.layers = null;
        }
        if (this.viewPortDiv) {
            this.div.removeChild(this.viewPortDiv);
        }
        this.viewPortDiv = null;
        if (this.eventListeners) {
            this.events.un(this.eventListeners);
            this.eventListeners = null;
        }
        this.events.destroy();
        this.events = null;
    },
    setOptions: function (options) {
        OpenLayers.Util.extend(this, options);
    },
    getTileSize: function () {
        return this.tileSize;
    },
    getBy: function (array, property, match) {
        var test = (typeof match.test == "function");
        var found = OpenLayers.Array.filter(this[array], function (item) {
            return item[property] == match || (test && match.test(item[property]));
        });
        return found;
    },
    getLayersBy: function (property, match) {
        return this.getBy("layers", property, match);
    },
    getLayersByName: function (match) {
        return this.getLayersBy("name", match);
    },
    getLayersByClass: function (match) {
        return this.getLayersBy("CLASS_NAME", match);
    },
    getControlsBy: function (property, match) {
        return this.getBy("controls", property, match);
    },
    getControlsByClass: function (match) {
        return this.getControlsBy("CLASS_NAME", match);
    },
    getLayer: function (id) {
        var foundLayer = null;
        for (var i = 0, len = this.layers.length; i < len; i++) {
            var layer = this.layers[i];
            if (layer.id == id) {
                foundLayer = layer;
                break;
            }
        }
        return foundLayer;
    },
    setLayerZIndex: function (layer, zIdx) {
        layer.setZIndex(this.Z_INDEX_BASE[layer.isBaseLayer ? 'BaseLayer' : 'Overlay'] + zIdx * 5);
    },
    resetLayersZIndex: function () {
        for (var i = 0, len = this.layers.length; i < len; i++) {
            var layer = this.layers[i];
            this.setLayerZIndex(layer, i);
        }
    },
    addLayer: function (layer) {
        for (var i = 0, len = this.layers.length; i < len; i++) {
            if (this.layers[i] == layer) {
                var msg = OpenLayers.i18n('layerAlreadyAdded', {
                    'layerName': layer.name
                });
                OpenLayers.Console.warn(msg);
                return false;
            }
        }
        this.events.triggerEvent("preaddlayer", {
            layer: layer
        });
        layer.div.className = "olLayerDiv";
        layer.div.style.overflow = "";
        this.setLayerZIndex(layer, this.layers.length);
        if (layer.isFixed) {
            this.viewPortDiv.appendChild(layer.div);
        } else {
            this.layerContainerDiv.appendChild(layer.div);
        }
        this.layers.push(layer);
        layer.setMap(this);
        if (layer.isBaseLayer) {
            if (this.baseLayer == null) {
                this.setBaseLayer(layer);
            } else {
                layer.setVisibility(false);
            }
        } else {
            layer.redraw();
        }
        this.events.triggerEvent("addlayer", {
            layer: layer
        });
    },
    addLayers: function (layers) {
        for (var i = 0, len = layers.length; i < len; i++) {
            this.addLayer(layers[i]);
        }
    },
    removeLayer: function (layer, setNewBaseLayer) {
        if (setNewBaseLayer == null) {
            setNewBaseLayer = true;
        }
        if (layer.isFixed) {
            this.viewPortDiv.removeChild(layer.div);
        } else {
            this.layerContainerDiv.removeChild(layer.div);
        }
        OpenLayers.Util.removeItem(this.layers, layer);
        layer.removeMap(this);
        layer.map = null;
        if (this.baseLayer == layer) {
            this.baseLayer = null;
            if (setNewBaseLayer) {
                for (var i = 0, len = this.layers.length; i < len; i++) {
                    var iLayer = this.layers[i];
                    if (iLayer.isBaseLayer) {
                        this.setBaseLayer(iLayer);
                        break;
                    }
                }
            }
        }
        this.resetLayersZIndex();
        this.events.triggerEvent("removelayer", {
            layer: layer
        });
    },
    getNumLayers: function () {
        return this.layers.length;
    },
    getLayerIndex: function (layer) {
        return OpenLayers.Util.indexOf(this.layers, layer);
    },
    setLayerIndex: function (layer, idx) {
        var base = this.getLayerIndex(layer);
        if (idx < 0) {
            idx = 0;
        } else if (idx > this.layers.length) {
            idx = this.layers.length;
        }
        if (base != idx) {
            this.layers.splice(base, 1);
            this.layers.splice(idx, 0, layer);
            for (var i = 0, len = this.layers.length; i < len; i++) {
                this.setLayerZIndex(this.layers[i], i);
            }
            this.events.triggerEvent("changelayer", {
                layer: layer,
                property: "order"
            });
        }
    },
    raiseLayer: function (layer, delta) {
        var idx = this.getLayerIndex(layer) + delta;
        this.setLayerIndex(layer, idx);
    },
    setBaseLayer: function (newBaseLayer) {
        var oldExtent = null;
        if (this.baseLayer) {
            oldExtent = this.baseLayer.getExtent();
        }
        if (newBaseLayer != this.baseLayer) {
            if (OpenLayers.Util.indexOf(this.layers, newBaseLayer) != -1) {
                if (this.baseLayer != null) {
                    this.baseLayer.setVisibility(false);
                }
                this.baseLayer = newBaseLayer;
                this.viewRequestID++;
                this.baseLayer.visibility = true;
                var center = this.getCenter();
                if (center != null) {
                    var newCenter = (oldExtent) ? oldExtent.getCenterLonLat() : center;
                    var newZoom = (oldExtent) ? this.getZoomForExtent(oldExtent, true) : this.getZoomForResolution(this.resolution, true);
                    this.setCenter(newCenter, newZoom, false, true);
                }
                this.events.triggerEvent("changebaselayer", {
                    layer: this.baseLayer
                });
            }
        }
    },
    addControl: function (control, px) {
        this.controls.push(control);
        this.addControlToMap(control, px);
    },
    addControlToMap: function (control, px) {
        control.outsideViewport = (control.div != null);
        if (this.displayProjection && !control.displayProjection) {
            control.displayProjection = this.displayProjection;
        }
        control.setMap(this);
        var div = control.draw(px);
        if (div) {
            if (!control.outsideViewport) {
                div.style.zIndex = this.Z_INDEX_BASE['Control'] + this.controls.length;
                this.viewPortDiv.appendChild(div);
            }
        }
    },
    getControl: function (id) {
        var returnControl = null;
        for (var i = 0, len = this.controls.length; i < len; i++) {
            var control = this.controls[i];
            if (control.id == id) {
                returnControl = control;
                break;
            }
        }
        return returnControl;
    },
    removeControl: function (control) {
        if ((control) && (control == this.getControl(control.id))) {
            if (control.div && (control.div.parentNode == this.viewPortDiv)) {
                this.viewPortDiv.removeChild(control.div);
            }
            OpenLayers.Util.removeItem(this.controls, control);
        }
    },
    addPopup: function (popup, exclusive) {
        if (exclusive) {
            for (var i = this.popups.length - 1; i >= 0; --i) {
                this.removePopup(this.popups[i]);
            }
        }
        popup.map = this;
        this.popups.push(popup);
        var popupDiv = popup.draw();
        if (popupDiv) {
            popupDiv.style.zIndex = this.Z_INDEX_BASE['Popup'] + this.popups.length;
            this.layerContainerDiv.appendChild(popupDiv);
        }
    },
    removePopup: function (popup) {
        OpenLayers.Util.removeItem(this.popups, popup);
        if (popup.div) {
            try {
                this.layerContainerDiv.removeChild(popup.div);
            } catch (e) {}
        }
        popup.map = null;
    },
    getSize: function () {
        var size = null;
        if (this.size != null) {
            size = this.size.clone();
        }
        return size;
    },
    updateSize: function () {
        this.events.clearMouseCache();
        var newSize = this.getCurrentSize();
        var oldSize = this.getSize();
        if (oldSize == null) {
            this.size = oldSize = newSize;
        }
        if (!newSize.equals(oldSize)) {
            this.size = newSize;
            for (var i = 0, len = this.layers.length; i < len; i++) {
                this.layers[i].onMapResize();
            }
            if (this.baseLayer != null) {
                var center = new OpenLayers.Pixel(newSize.w / 2, newSize.h / 2);
                var centerLL = this.getLonLatFromViewPortPx(center);
                var zoom = this.getZoom();
                this.zoom = null;
                this.setCenter(this.getCenter(), zoom);
            }
        }
    },
    getCurrentSize: function () {
        var size = new OpenLayers.Size(this.div.clientWidth, this.div.clientHeight);
        if (size.w == 0 && size.h == 0 || isNaN(size.w) && isNaN(size.h)) {
            var dim = OpenLayers.Element.getDimensions(this.div);
            size.w = dim.width;
            size.h = dim.height;
        }
        if (size.w == 0 && size.h == 0 || isNaN(size.w) && isNaN(size.h)) {
            size.w = parseInt(this.div.style.width);
            size.h = parseInt(this.div.style.height);
        }
        return size;
    },
    calculateBounds: function (center, resolution) {
        var extent = null;
        if (center == null) {
            center = this.getCenter();
        }
        if (resolution == null) {
            resolution = this.getResolution();
        }
        if ((center != null) && (resolution != null)) {
            var size = this.getSize();
            var w_deg = size.w * resolution;
            var h_deg = size.h * resolution;
            extent = new OpenLayers.Bounds(center.lon - w_deg / 2, center.lat - h_deg / 2, center.lon + w_deg / 2, center.lat + h_deg / 2);
        }
        return extent;
    },
    getCenter: function () {
        return this.center;
    },
    getZoom: function () {
        return this.zoom;
    },
    pan: function (dx, dy, options) {
        options = OpenLayers.Util.applyDefaults(options, {
            animate: true,
            dragging: false
        });
        var centerPx = this.getViewPortPxFromLonLat(this.getCenter());
        var newCenterPx = centerPx.add(dx, dy);
        if (!options.dragging || !newCenterPx.equals(centerPx)) {
            var newCenterLonLat = this.getLonLatFromViewPortPx(newCenterPx);
            if (options.animate) {
                this.panTo(newCenterLonLat);
            } else {
                this.setCenter(newCenterLonLat, null, options.dragging);
            }
        }
    },
    panTo: function (lonlat) {
        if (this.panMethod && this.getExtent().scale(this.panRatio).containsLonLat(lonlat)) {
            if (!this.panTween) {
                this.panTween = new OpenLayers.Tween(this.panMethod);
            }
            var center = this.getCenter();
            if (lonlat.lon == center.lon && lonlat.lat == center.lat) {
                return;
            }
            var from = {
                lon: center.lon,
                lat: center.lat
            };
            var to = {
                lon: lonlat.lon,
                lat: lonlat.lat
            };
            this.panTween.start(from, to, 50, {
                callbacks: {
                    start: OpenLayers.Function.bind(function (lonlat) {
                        this.events.triggerEvent("movestart");
                    }, this),
                    eachStep: OpenLayers.Function.bind(function (lonlat) {
                        lonlat = new OpenLayers.LonLat(lonlat.lon, lonlat.lat);
                        this.moveTo(lonlat, this.zoom, {
                            'dragging': true,
                            'noEvent': true
                        });
                    }, this),
                    done: OpenLayers.Function.bind(function (lonlat) {
                        lonlat = new OpenLayers.LonLat(lonlat.lon, lonlat.lat);
                        this.moveTo(lonlat, this.zoom, {
                            'noEvent': true
                        });
                        this.events.triggerEvent("moveend");
                    }, this)
                }
            });
        } else {
            this.setCenter(lonlat);
        }
    },
    setCenter: function (lonlat, zoom, dragging, forceZoomChange) {
        this.moveTo(lonlat, zoom, {
            'dragging': dragging,
            'forceZoomChange': forceZoomChange,
            'caller': 'setCenter'
        });
    },
    moveTo: function (lonlat, zoom, options) {
        if (!options) {
            options = {};
        }
        var dragging = options.dragging;
        var forceZoomChange = options.forceZoomChange;
        var noEvent = options.noEvent;
        if (this.panTween && options.caller == "setCenter") {
            this.panTween.stop();
        }
        if (!this.center && !this.isValidLonLat(lonlat)) {
            lonlat = this.maxExtent.getCenterLonLat();
        }
        if (this.restrictedExtent != null) {
            if (lonlat == null) {
                lonlat = this.getCenter();
            }
            if (zoom == null) {
                zoom = this.getZoom();
            }
            var resolution = this.getResolutionForZoom(zoom);
            var extent = this.calculateBounds(lonlat, resolution);
            if (!this.restrictedExtent.containsBounds(extent)) {
                var maxCenter = this.restrictedExtent.getCenterLonLat();
                if (extent.getWidth() > this.restrictedExtent.getWidth()) {
                    lonlat = new OpenLayers.LonLat(maxCenter.lon, lonlat.lat);
                } else if (extent.left < this.restrictedExtent.left) {
                    lonlat = lonlat.add(this.restrictedExtent.left - extent.left, 0);
                } else if (extent.right > this.restrictedExtent.right) {
                    lonlat = lonlat.add(this.restrictedExtent.right - extent.right, 0);
                }
                if (extent.getHeight() > this.restrictedExtent.getHeight()) {
                    lonlat = new OpenLayers.LonLat(lonlat.lon, maxCenter.lat);
                } else if (extent.bottom < this.restrictedExtent.bottom) {
                    lonlat = lonlat.add(0, this.restrictedExtent.bottom - extent.bottom);
                } else if (extent.top > this.restrictedExtent.top) {
                    lonlat = lonlat.add(0, this.restrictedExtent.top - extent.top);
                }
            }
        }
        var zoomChanged = forceZoomChange || ((this.isValidZoomLevel(zoom)) && (zoom != this.getZoom()));
        var centerChanged = (this.isValidLonLat(lonlat)) && (!lonlat.equals(this.center));
        if (zoomChanged || centerChanged || !dragging) {
            if (!this.dragging && !noEvent) {
                this.events.triggerEvent("movestart");
            }
            if (centerChanged) {
                if ((!zoomChanged) && (this.center)) {
                    this.centerLayerContainer(lonlat);
                }
                this.center = lonlat.clone();
            }
            if ((zoomChanged) || (this.layerContainerOrigin == null)) {
                this.layerContainerOrigin = this.center.clone();
                this.layerContainerDiv.style.left = "0px";
                this.layerContainerDiv.style.top = "0px";
            }
            if (zoomChanged) {
                this.zoom = zoom;
                this.resolution = this.getResolutionForZoom(zoom);
                this.viewRequestID++;
            }
            var bounds = this.getExtent();
            this.baseLayer.moveTo(bounds, zoomChanged, dragging);
            bounds = this.baseLayer.getExtent();
            for (var i = 0, len = this.layers.length; i < len; i++) {
                var layer = this.layers[i];
                if (!layer.isBaseLayer) {
                    var inRange = layer.calculateInRange();
                    if (layer.inRange != inRange) {
                        layer.inRange = inRange;
                        if (!inRange) {
                            layer.display(false);
                        }
                        this.events.triggerEvent("changelayer", {
                            layer: layer,
                            property: "visibility"
                        });
                    }
                    if (inRange && layer.visibility) {
                        layer.moveTo(bounds, zoomChanged, dragging);
                        layer.events.triggerEvent("moveend", {
                            "zoomChanged": zoomChanged
                        });
                    }
                }
            }
            if (zoomChanged) {
                for (var i = 0, len = this.popups.length; i < len; i++) {
                    this.popups[i].updatePosition();
                }
            }
            this.events.triggerEvent("move");
            if (zoomChanged) {
                this.events.triggerEvent("zoomend");
            }
        }
        if (!dragging && !noEvent) {
            this.events.triggerEvent("moveend");
        }
        this.dragging = !! dragging;
    },
    centerLayerContainer: function (lonlat) {
        var originPx = this.getViewPortPxFromLonLat(this.layerContainerOrigin);
        var newPx = this.getViewPortPxFromLonLat(lonlat);
        if ((originPx != null) && (newPx != null)) {
            this.layerContainerDiv.style.left = Math.round(originPx.x - newPx.x) + "px";
            this.layerContainerDiv.style.top = Math.round(originPx.y - newPx.y) + "px";
        }
    },
    isValidZoomLevel: function (zoomLevel) {
        return ((zoomLevel != null) && (zoomLevel >= 0) && (zoomLevel < this.getNumZoomLevels()));
    },
    isValidLonLat: function (lonlat) {
        var valid = false;
        if (lonlat != null) {
            var maxExtent = this.getMaxExtent();
            valid = maxExtent.containsLonLat(lonlat);
        }
        return valid;
    },
    getProjection: function () {
        var projection = this.getProjectionObject();
        return projection ? projection.getCode() : null;
    },
    getProjectionObject: function () {
        var projection = null;
        if (this.baseLayer != null) {
            projection = this.baseLayer.projection;
        }
        return projection;
    },
    getMaxResolution: function () {
        var maxResolution = null;
        if (this.baseLayer != null) {
            maxResolution = this.baseLayer.maxResolution;
        }
        return maxResolution;
    },
    getMaxExtent: function (options) {
        var maxExtent = null;
        if (options && options.restricted && this.restrictedExtent) {
            maxExtent = this.restrictedExtent;
        } else if (this.baseLayer != null) {
            maxExtent = this.baseLayer.maxExtent;
        }
        return maxExtent;
    },
    getNumZoomLevels: function () {
        var numZoomLevels = null;
        if (this.baseLayer != null) {
            numZoomLevels = this.baseLayer.numZoomLevels;
        }
        return numZoomLevels;
    },
    getExtent: function () {
        var extent = null;
        if (this.baseLayer != null) {
            extent = this.baseLayer.getExtent();
        }
        return extent;
    },
    getResolution: function () {
        var resolution = null;
        if (this.baseLayer != null) {
            resolution = this.baseLayer.getResolution();
        }
        return resolution;
    },
    getUnits: function () {
        var units = null;
        if (this.baseLayer != null) {
            units = this.baseLayer.units;
        }
        return units;
    },
    getScale: function () {
        var scale = null;
        if (this.baseLayer != null) {
            var res = this.getResolution();
            var units = this.baseLayer.units;
            scale = OpenLayers.Util.getScaleFromResolution(res, units);
        }
        return scale;
    },
    getZoomForExtent: function (bounds, closest) {
        var zoom = null;
        if (this.baseLayer != null) {
            zoom = this.baseLayer.getZoomForExtent(bounds, closest);
        }
        return zoom;
    },
    getResolutionForZoom: function (zoom) {
        var resolution = null;
        if (this.baseLayer) {
            resolution = this.baseLayer.getResolutionForZoom(zoom);
        }
        return resolution;
    },
    getZoomForResolution: function (resolution, closest) {
        var zoom = null;
        if (this.baseLayer != null) {
            zoom = this.baseLayer.getZoomForResolution(resolution, closest);
        }
        return zoom;
    },
    zoomTo: function (zoom) {
        if (this.isValidZoomLevel(zoom)) {
            this.setCenter(null, zoom);
        }
    },
    zoomIn: function () {
        this.zoomTo(this.getZoom() + 1);
    },
    zoomOut: function () {
        this.zoomTo(this.getZoom() - 1);
    },
    zoomToExtent: function (bounds, closest) {
        var center = bounds.getCenterLonLat();
        if (this.baseLayer.wrapDateLine) {
            var maxExtent = this.getMaxExtent();
            bounds = bounds.clone();
            while (bounds.right < bounds.left) {
                bounds.right += maxExtent.getWidth();
            }
            center = bounds.getCenterLonLat().wrapDateLine(maxExtent);
        }
        this.setCenter(center, this.getZoomForExtent(bounds, closest));
    },
    zoomToMaxExtent: function (options) {
        var restricted = (options) ? options.restricted : true;
        var maxExtent = this.getMaxExtent({
            'restricted': restricted
        });
        this.zoomToExtent(maxExtent);
    },
    zoomToScale: function (scale, closest) {
        var res = OpenLayers.Util.getResolutionFromScale(scale, this.baseLayer.units);
        var size = this.getSize();
        var w_deg = size.w * res;
        var h_deg = size.h * res;
        var center = this.getCenter();
        var extent = new OpenLayers.Bounds(center.lon - w_deg / 2, center.lat - h_deg / 2, center.lon + w_deg / 2, center.lat + h_deg / 2);
        this.zoomToExtent(extent, closest);
    },
    getLonLatFromViewPortPx: function (viewPortPx) {
        var lonlat = null;
        if (this.baseLayer != null) {
            lonlat = this.baseLayer.getLonLatFromViewPortPx(viewPortPx);
        }
        return lonlat;
    },
    getViewPortPxFromLonLat: function (lonlat) {
        var px = null;
        if (this.baseLayer != null) {
            px = this.baseLayer.getViewPortPxFromLonLat(lonlat);
        }
        return px;
    },
    getLonLatFromPixel: function (px) {
        return this.getLonLatFromViewPortPx(px);
    },
    getPixelFromLonLat: function (lonlat) {
        var px = this.getViewPortPxFromLonLat(lonlat);
        px.x = Math.round(px.x);
        px.y = Math.round(px.y);
        return px;
    },
    getViewPortPxFromLayerPx: function (layerPx) {
        var viewPortPx = null;
        if (layerPx != null) {
            var dX = parseInt(this.layerContainerDiv.style.left);
            var dY = parseInt(this.layerContainerDiv.style.top);
            viewPortPx = layerPx.add(dX, dY);
        }
        return viewPortPx;
    },
    getLayerPxFromViewPortPx: function (viewPortPx) {
        var layerPx = null;
        if (viewPortPx != null) {
            var dX = -parseInt(this.layerContainerDiv.style.left);
            var dY = -parseInt(this.layerContainerDiv.style.top);
            layerPx = viewPortPx.add(dX, dY);
            if (isNaN(layerPx.x) || isNaN(layerPx.y)) {
                layerPx = null;
            }
        }
        return layerPx;
    },
    getLonLatFromLayerPx: function (px) {
        px = this.getViewPortPxFromLayerPx(px);
        return this.getLonLatFromViewPortPx(px);
    },
    getLayerPxFromLonLat: function (lonlat) {
        var px = this.getPixelFromLonLat(lonlat);
        return this.getLayerPxFromViewPortPx(px);
    },
    CLASS_NAME: "OpenLayers.Map"
});
OpenLayers.Map.TILE_WIDTH = 256;
OpenLayers.Map.TILE_HEIGHT = 256;
OpenLayers.Layer = OpenLayers.Class({
    id: null,
    name: null,
    div: null,
    opacity: null,
    alwaysInRange: null,
    EVENT_TYPES: ["loadstart", "loadend", "loadcancel", "visibilitychanged", "moveend"],
    events: null,
    map: null,
    isBaseLayer: false,
    alpha: false,
    displayInLayerSwitcher: true,
    visibility: true,
    attribution: null,
    inRange: false,
    imageSize: null,
    imageOffset: null,
    options: null,
    eventListeners: null,
    gutter: 0,
    projection: null,
    units: null,
    scales: null,
    resolutions: null,
    maxExtent: null,
    minExtent: null,
    maxResolution: null,
    minResolution: null,
    numZoomLevels: null,
    minScale: null,
    maxScale: null,
    displayOutsideMaxExtent: false,
    wrapDateLine: false,
    transitionEffect: null,
    SUPPORTED_TRANSITIONS: ['resize'],
    initialize: function (name, options) {
        this.addOptions(options);
        this.name = name;
        if (this.id == null) {
            this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_");
            this.div = OpenLayers.Util.createDiv(this.id);
            this.div.style.width = "100%";
            this.div.style.height = "100%";
            this.events = new OpenLayers.Events(this, this.div, this.EVENT_TYPES);
            if (this.eventListeners instanceof Object) {
                this.events.on(this.eventListeners);
            }
        }
        if (this.wrapDateLine) {
            this.displayOutsideMaxExtent = true;
        }
    },
    destroy: function (setNewBaseLayer) {
        if (setNewBaseLayer == null) {
            setNewBaseLayer = true;
        }
        if (this.map != null) {
            this.map.removeLayer(this, setNewBaseLayer);
        }
        this.projection = null;
        this.map = null;
        this.name = null;
        this.div = null;
        this.options = null;
        if (this.events) {
            if (this.eventListeners) {
                this.events.un(this.eventListeners);
            }
            this.events.destroy();
        }
        this.eventListeners = null;
        this.events = null;
    },
    clone: function (obj) {
        if (obj == null) {
            obj = new OpenLayers.Layer(this.name, this.options);
        }
        OpenLayers.Util.applyDefaults(obj, this);
        obj.map = null;
        return obj;
    },
    setName: function (newName) {
        if (newName != this.name) {
            this.name = newName;
            if (this.map != null) {
                this.map.events.triggerEvent("changelayer", {
                    layer: this,
                    property: "name"
                });
            }
        }
    },
    addOptions: function (newOptions) {
        if (this.options == null) {
            this.options = {};
        }
        OpenLayers.Util.extend(this.options, newOptions);
        OpenLayers.Util.extend(this, newOptions);
    },
    onMapResize: function () {},
    redraw: function () {
        var redrawn = false;
        if (this.map) {
            this.inRange = this.calculateInRange();
            var extent = this.getExtent();
            if (extent && this.inRange && this.visibility) {
                this.moveTo(extent, true, false);
                redrawn = true;
            }
        }
        return redrawn;
    },
    moveTo: function (bounds, zoomChanged, dragging) {
        var display = this.visibility;
        if (!this.isBaseLayer) {
            display = display && this.inRange;
        }
        this.display(display);
    },
    setMap: function (map) {
        if (this.map == null) {
            this.map = map;
            this.maxExtent = this.maxExtent || this.map.maxExtent;
            this.projection = this.projection || this.map.projection;
            if (this.projection && typeof this.projection == "string") {
                this.projection = new OpenLayers.Projection(this.projection);
            }
            this.units = this.projection.getUnits() || this.units || this.map.units;
            this.initResolutions();
            if (!this.isBaseLayer) {
                this.inRange = this.calculateInRange();
                var show = ((this.visibility) && (this.inRange));
                this.div.style.display = show ? "" : "none";
            }
            this.setTileSize();
        }
    },
    removeMap: function (map) {},
    getImageSize: function () {
        return (this.imageSize || this.tileSize);
    },
    setTileSize: function (size) {
        var tileSize = (size) ? size : ((this.tileSize) ? this.tileSize : this.map.getTileSize());
        this.tileSize = tileSize;
        if (this.gutter) {
            this.imageOffset = new OpenLayers.Pixel(-this.gutter, -this.gutter);
            this.imageSize = new OpenLayers.Size(tileSize.w + (2 * this.gutter), tileSize.h + (2 * this.gutter));
        }
    },
    getVisibility: function () {
        return this.visibility;
    },
    setVisibility: function (visibility) {
        if (visibility != this.visibility) {
            this.visibility = visibility;
            this.display(visibility);
            this.redraw();
            if (this.map != null) {
                this.map.events.triggerEvent("changelayer", {
                    layer: this,
                    property: "visibility"
                });
            }
            this.events.triggerEvent("visibilitychanged");
        }
    },
    display: function (display) {
        var inRange = this.calculateInRange();
        if (display != (this.div.style.display != "none")) {
            this.div.style.display = (display && inRange) ? "block" : "none";
        }
    },
    calculateInRange: function () {
        var inRange = false;
        if (this.alwaysInRange) {
            inRange = true;
        } else {
            if (this.map) {
                var resolution = this.map.getResolution();
                inRange = ((resolution >= this.minResolution) && (resolution <= this.maxResolution));
            }
        }
        return inRange;
    },
    setIsBaseLayer: function (isBaseLayer) {
        if (isBaseLayer != this.isBaseLayer) {
            this.isBaseLayer = isBaseLayer;
            if (this.map != null) {
                this.map.events.triggerEvent("changebaselayer", {
                    layer: this
                });
            }
        }
    },
    initResolutions: function () {
        var props = new Array('projection', 'units', 'scales', 'resolutions', 'maxScale', 'minScale', 'maxResolution', 'minResolution', 'minExtent', 'maxExtent', 'numZoomLevels', 'maxZoomLevel');
        var notScaleProps = ['projection', 'units'];
        var useInRange = false;
        var confProps = {};
        for (var i = 0, len = props.length; i < len; i++) {
            var property = props[i];
            if (this.options[property] && OpenLayers.Util.indexOf(notScaleProps, property) == -1) {
                useInRange = true;
            }
            confProps[property] = this.options[property] || this.map[property];
        }
        if (this.alwaysInRange == null) {
            this.alwaysInRange = !useInRange;
        }
        if ((this.options.minScale != null || this.options.maxScale != null) && this.options.scales == null) {
            confProps.scales = null;
        }
        if ((this.options.minResolution != null || this.options.maxResolution != null) && this.options.resolutions == null) {
            confProps.resolutions = null;
        }
        if ((!confProps.numZoomLevels) && (confProps.maxZoomLevel)) {
            confProps.numZoomLevels = confProps.maxZoomLevel + 1;
        }
        if ((confProps.scales != null) || (confProps.resolutions != null)) {
            if (confProps.scales != null) {
                confProps.resolutions = [];
                for (var i = 0, len = confProps.scales.length; i < len; i++) {
                    var scale = confProps.scales[i];
                    confProps.resolutions[i] = OpenLayers.Util.getResolutionFromScale(scale, confProps.units);
                }
            }
            confProps.numZoomLevels = confProps.resolutions.length;
        } else {
            if (confProps.minScale) {
                confProps.maxResolution = OpenLayers.Util.getResolutionFromScale(confProps.minScale, confProps.units);
            } else if (confProps.maxResolution == "auto") {
                var viewSize = this.map.getSize();
                var wRes = confProps.maxExtent.getWidth() / viewSize.w;
                var hRes = confProps.maxExtent.getHeight() / viewSize.h;
                confProps.maxResolution = Math.max(wRes, hRes);
            }
            if (confProps.maxScale != null) {
                confProps.minResolution = OpenLayers.Util.getResolutionFromScale(confProps.maxScale, confProps.units);
            } else if ((confProps.minResolution == "auto") && (confProps.minExtent != null)) {
                var viewSize = this.map.getSize();
                var wRes = confProps.minExtent.getWidth() / viewSize.w;
                var hRes = confProps.minExtent.getHeight() / viewSize.h;
                confProps.minResolution = Math.max(wRes, hRes);
            }
            if (confProps.minResolution != null && this.options.numZoomLevels == undefined) {
                var ratio = confProps.maxResolution / confProps.minResolution;
                confProps.numZoomLevels = Math.floor(Math.log(ratio) / Math.log(2)) + 1;
            }
            confProps.resolutions = new Array(confProps.numZoomLevels);
            var base = 2;
            if (typeof confProps.minResolution == "number" && confProps.numZoomLevels > 1) {
                base = Math.pow((confProps.maxResolution / confProps.minResolution), (1 / (confProps.numZoomLevels - 1)));
            }
            for (var i = 0; i < confProps.numZoomLevels; i++) {
                var res = confProps.maxResolution / Math.pow(base, i);
                confProps.resolutions[i] = res;
            }
        }
        confProps.resolutions.sort(function (a, b) {
            return (b - a);
        });
        this.resolutions = confProps.resolutions;
        this.maxResolution = confProps.resolutions[0];
        var lastIndex = confProps.resolutions.length - 1;
        this.minResolution = confProps.resolutions[lastIndex];
        this.scales = [];
        for (var i = 0, len = confProps.resolutions.length; i < len; i++) {
            this.scales[i] = OpenLayers.Util.getScaleFromResolution(confProps.resolutions[i], confProps.units);
        }
        this.minScale = this.scales[0];
        this.maxScale = this.scales[this.scales.length - 1];
        this.numZoomLevels = confProps.numZoomLevels;
    },
    getResolution: function () {
        var zoom = this.map.getZoom();
        return this.getResolutionForZoom(zoom);
    },
    getExtent: function () {
        return this.map.calculateBounds();
    },
    getZoomForExtent: function (extent, closest) {
        var viewSize = this.map.getSize();
        var idealResolution = Math.max(extent.getWidth() / viewSize.w, extent.getHeight() / viewSize.h);
        return this.getZoomForResolution(idealResolution, closest);
    },
    getDataExtent: function () {},
    getResolutionForZoom: function (zoom) {
        zoom = Math.max(0, Math.min(zoom, this.resolutions.length - 1));
        var resolution;
        if (this.map.fractionalZoom) {
            var low = Math.floor(zoom);
            var high = Math.ceil(zoom);
            resolution = this.resolutions[high] + ((zoom - low) * (this.resolutions[low] - this.resolutions[high]));
        } else {
            resolution = this.resolutions[Math.round(zoom)];
        }
        return resolution;
    },
    getZoomForResolution: function (resolution, closest) {
        var zoom;
        if (this.map.fractionalZoom) {
            var lowZoom = 0;
            var highZoom = this.resolutions.length - 1;
            var highRes = this.resolutions[lowZoom];
            var lowRes = this.resolutions[highZoom];
            var res;
            for (var i = 0, len = this.resolutions.length; i < len; ++i) {
                res = this.resolutions[i];
                if (res >= resolution) {
                    highRes = res;
                    lowZoom = i;
                }
                if (res <= resolution) {
                    lowRes = res;
                    highZoom = i;
                    break;
                }
            }
            var dRes = highRes - lowRes;
            if (dRes > 0) {
                zoom = lowZoom + ((resolution - lowRes) / dRes);
            } else {
                zoom = lowZoom;
            }
        } else {
            var diff;
            var minDiff = Number.POSITIVE_INFINITY;
            for (var i = 0, len = this.resolutions.length; i < len; i++) {
                if (closest) {
                    diff = Math.abs(this.resolutions[i] - resolution);
                    if (diff > minDiff) {
                        break;
                    }
                    minDiff = diff;
                } else {
                    if (this.resolutions[i] < resolution) {
                        break;
                    }
                }
            }
            zoom = Math.max(0, i - 1);
        }
        return zoom;
    },
    getLonLatFromViewPortPx: function (viewPortPx) {
        var lonlat = null;
        if (viewPortPx != null) {
            var size = this.map.getSize();
            var center = this.map.getCenter();
            if (center) {
                var res = this.map.getResolution();
                var delta_x = viewPortPx.x - (size.w / 2);
                var delta_y = viewPortPx.y - (size.h / 2);
                lonlat = new OpenLayers.LonLat(center.lon + delta_x * res, center.lat - delta_y * res);
                if (this.wrapDateLine) {
                    lonlat = lonlat.wrapDateLine(this.maxExtent);
                }
            }
        }
        return lonlat;
    },
    getViewPortPxFromLonLat: function (lonlat) {
        var px = null;
        if (lonlat != null) {
            var resolution = this.map.getResolution();
            var extent = this.map.getExtent();
            px = new OpenLayers.Pixel((1 / resolution * (lonlat.lon - extent.left)), (1 / resolution * (extent.top - lonlat.lat)));
        }
        return px;
    },
    setOpacity: function (opacity) {
        if (opacity != this.opacity) {
            this.opacity = opacity;
            for (var i = 0, len = this.div.childNodes.length; i < len; ++i) {
                var element = this.div.childNodes[i].firstChild;
                OpenLayers.Util.modifyDOMElement(element, null, null, null, null, null, null, opacity);
            }
        }
    },
    getZIndex: function () {
        return this.div.style.zIndex;
    },
    setZIndex: function (zIndex) {
        this.div.style.zIndex = zIndex;
    },
    adjustBounds: function (bounds) {
        if (this.gutter) {
            var mapGutter = this.gutter * this.map.getResolution();
            bounds = new OpenLayers.Bounds(bounds.left - mapGutter, bounds.bottom - mapGutter, bounds.right + mapGutter, bounds.top + mapGutter);
        }
        if (this.wrapDateLine) {
            var wrappingOptions = {
                'rightTolerance': this.getResolution()
            };
            bounds = bounds.wrapDateLine(this.maxExtent, wrappingOptions);
        }
        return bounds;
    },
    CLASS_NAME: "OpenLayers.Layer"
});
OpenLayers.Popup = OpenLayers.Class({
    events: null,
    id: "",
    lonlat: null,
    div: null,
    contentSize: null,
    size: null,
    contentHTML: null,
    backgroundColor: "",
    opacity: "",
    border: "",
    contentDiv: null,
    groupDiv: null,
    closeDiv: null,
    autoSize: false,
    minSize: null,
    maxSize: null,
    displayClass: "olPopup",
    contentDisplayClass: "olPopupContent",
    padding: 0,
    fixPadding: function () {
        if (typeof this.padding == "number") {
            this.padding = new OpenLayers.Bounds(this.padding, this.padding, this.padding, this.padding);
        }
    },
    panMapIfOutOfView: false,
    map: null,
    initialize: function (id, lonlat, contentSize, contentHTML, closeBox, closeBoxCallback) {
        if (id == null) {
            id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_");
        }
        this.id = id;
        this.lonlat = lonlat;
        this.contentSize = (contentSize != null) ? contentSize : new OpenLayers.Size(OpenLayers.Popup.WIDTH, OpenLayers.Popup.HEIGHT);
        if (contentHTML != null) {
            this.contentHTML = contentHTML;
        }
        this.backgroundColor = OpenLayers.Popup.COLOR;
        this.opacity = OpenLayers.Popup.OPACITY;
        this.border = OpenLayers.Popup.BORDER;
        this.div = OpenLayers.Util.createDiv(this.id, null, null, null, null, null, "hidden");
        this.div.className = this.displayClass;
        var groupDivId = this.id + "_GroupDiv";
        this.groupDiv = OpenLayers.Util.createDiv(groupDivId, null, null, null, "relative", null, "hidden");
        var id = this.div.id + "_contentDiv";
        this.contentDiv = OpenLayers.Util.createDiv(id, null, this.contentSize.clone(), null, "relative");
        this.contentDiv.className = this.contentDisplayClass;
        this.groupDiv.appendChild(this.contentDiv);
        this.div.appendChild(this.groupDiv);
        if (closeBox) {
            this.addCloseBox(closeBoxCallback);
        }
        this.registerEvents();
    },
    destroy: function () {
        this.id = null;
        this.lonlat = null;
        this.size = null;
        this.contentHTML = null;
        this.backgroundColor = null;
        this.opacity = null;
        this.border = null;
        this.events.destroy();
        this.events = null;
        if (this.closeDiv) {
            OpenLayers.Event.stopObservingElement(this.closeDiv);
            this.groupDiv.removeChild(this.closeDiv);
        }
        this.closeDiv = null;
        this.div.removeChild(this.groupDiv);
        this.groupDiv = null;
        if (this.map != null) {
            this.map.removePopup(this);
        }
        this.map = null;
        this.div = null;
        this.autoSize = null;
        this.minSize = null;
        this.maxSize = null;
        this.padding = null;
        this.panMapIfOutOfView = null;
    },
    draw: function (px) {
        if (px == null) {
            if ((this.lonlat != null) && (this.map != null)) {
                px = this.map.getLayerPxFromLonLat(this.lonlat);
            }
        }
        if (OpenLayers.Util.getBrowserName() == 'firefox') {
            this.map.events.register("movestart", this, function () {
                var style = document.defaultView.getComputedStyle(this.contentDiv, null);
                var currentOverflow = style.getPropertyValue("overflow");
                if (currentOverflow != "hidden") {
                    this.contentDiv._oldOverflow = currentOverflow;
                    this.contentDiv.style.overflow = "hidden";
                }
            });
            this.map.events.register("moveend", this, function () {
                var oldOverflow = this.contentDiv._oldOverflow;
                if (oldOverflow) {
                    this.contentDiv.style.overflow = oldOverflow;
                    this.contentDiv._oldOverflow = null;
                }
            });
        }
        this.moveTo(px);
        if (!this.autoSize && !this.size) {
            this.setSize(this.contentSize);
        }
        this.setBackgroundColor();
        this.setOpacity();
        this.setBorder();
        this.setContentHTML();
        if (this.panMapIfOutOfView) {
            this.panIntoView();
        }
        return this.div;
    },
    updatePosition: function () {
        if ((this.lonlat) && (this.map)) {
            var px = this.map.getLayerPxFromLonLat(this.lonlat);
            if (px) {
                this.moveTo(px);
            }
        }
    },
    moveTo: function (px) {
        if ((px != null) && (this.div != null)) {
            this.div.style.left = px.x + "px";
            this.div.style.top = px.y + "px";
        }
    },
    visible: function () {
        return OpenLayers.Element.visible(this.div);
    },
    toggle: function () {
        if (this.visible()) {
            this.hide();
        } else {
            this.show();
        }
    },
    show: function () {
        OpenLayers.Element.show(this.div);
        if (this.panMapIfOutOfView) {
            this.panIntoView();
        }
    },
    hide: function () {
        OpenLayers.Element.hide(this.div);
    },
    setSize: function (contentSize) {
        this.size = contentSize.clone();
        var contentDivPadding = this.getContentDivPadding();
        var wPadding = contentDivPadding.left + contentDivPadding.right;
        var hPadding = contentDivPadding.top + contentDivPadding.bottom;
        this.fixPadding();
        wPadding += this.padding.left + this.padding.right;
        hPadding += this.padding.top + this.padding.bottom;
        if (this.closeDiv) {
            var closeDivWidth = parseInt(this.closeDiv.style.width);
            wPadding += closeDivWidth + contentDivPadding.right;
        }
        this.size.w += wPadding;
        this.size.h += hPadding;
        if (OpenLayers.Util.getBrowserName() == "msie") {
            this.contentSize.w += contentDivPadding.left + contentDivPadding.right;
            this.contentSize.h += contentDivPadding.bottom + contentDivPadding.top;
        }
        if (this.div != null) {
            this.div.style.width = this.size.w + "px";
            this.div.style.height = this.size.h + "px";
        }
        if (this.contentDiv != null) {
            this.contentDiv.style.width = contentSize.w + "px";
            this.contentDiv.style.height = contentSize.h + "px";
        }
    },
    updateSize: function () {
        var preparedHTML = "<div class='" + this.contentDisplayClass + "'>" + this.contentDiv.innerHTML + "<div>";
        var realSize = OpenLayers.Util.getRenderedDimensions(preparedHTML, null, {
            displayClass: this.displayClass
        });
        var safeSize = this.getSafeContentSize(realSize);
        var newSize = null;
        if (safeSize.equals(realSize)) {
            newSize = realSize;
        } else {
            var fixedSize = new OpenLayers.Size();
            fixedSize.w = (safeSize.w < realSize.w) ? safeSize.w : null;
            fixedSize.h = (safeSize.h < realSize.h) ? safeSize.h : null;
            if (fixedSize.w && fixedSize.h) {
                newSize = safeSize;
            } else {
                var clippedSize = OpenLayers.Util.getRenderedDimensions(preparedHTML, fixedSize, {
                    displayClass: this.contentDisplayClass
                });
                var currentOverflow = OpenLayers.Element.getStyle(this.contentDiv, "overflow");
                if ((currentOverflow != "hidden") && (clippedSize.equals(safeSize))) {
                    var scrollBar = OpenLayers.Util.getScrollbarWidth();
                    if (fixedSize.w) {
                        clippedSize.h += scrollBar;
                    } else {
                        clippedSize.w += scrollBar;
                    }
                }
                newSize = this.getSafeContentSize(clippedSize);
            }
        }
        this.setSize(newSize);
    },
    setBackgroundColor: function (color) {
        if (color != undefined) {
            this.backgroundColor = color;
        }
        if (this.div != null) {
            this.div.style.backgroundColor = this.backgroundColor;
        }
    },
    setOpacity: function (opacity) {
        if (opacity != undefined) {
            this.opacity = opacity;
        }
        if (this.div != null) {
            this.div.style.opacity = this.opacity;
            this.div.style.filter = 'alpha(opacity=' + this.opacity * 100 + ')';
        }
    },
    setBorder: function (border) {
        if (border != undefined) {
            this.border = border;
        }
        if (this.div != null) {
            this.div.style.border = this.border;
        }
    },
    setContentHTML: function (contentHTML) {
        if (contentHTML != null) {
            this.contentHTML = contentHTML;
        }
        if ((this.contentDiv != null) && (this.contentHTML != null) && (this.contentHTML != this.contentDiv.innerHTML)) {
            this.contentDiv.innerHTML = this.contentHTML;
            if (this.autoSize) {
                this.registerImageListeners();
                this.updateSize();
            }
        }
    },
    registerImageListeners: function () {
        var onImgLoad = function () {
                this.popup.updateSize();
                if (this.popup.visible() && this.popup.panMapIfOutOfView) {
                    this.popup.panIntoView();
                }
                OpenLayers.Event.stopObserving(this.img, "load", this.img._onImageLoad);
            };
        var images = this.contentDiv.getElementsByTagName("img");
        for (var i = 0, len = images.length; i < len; i++) {
            var img = images[i];
            if (img.width == 0 || img.height == 0) {
                var context = {
                    'popup': this,
                    'img': img
                };
                img._onImgLoad = OpenLayers.Function.bind(onImgLoad, context);
                OpenLayers.Event.observe(img, 'load', img._onImgLoad);
            }
        }
    },
    getSafeContentSize: function (size) {
        var safeContentSize = size.clone();
        var contentDivPadding = this.getContentDivPadding();
        var wPadding = contentDivPadding.left + contentDivPadding.right;
        var hPadding = contentDivPadding.top + contentDivPadding.bottom;
        this.fixPadding();
        wPadding += this.padding.left + this.padding.right;
        hPadding += this.padding.top + this.padding.bottom;
        if (this.closeDiv) {
            var closeDivWidth = parseInt(this.closeDiv.style.width);
            wPadding += closeDivWidth + contentDivPadding.right;
        }
        if (this.minSize) {
            safeContentSize.w = Math.max(safeContentSize.w, (this.minSize.w - wPadding));
            safeContentSize.h = Math.max(safeContentSize.h, (this.minSize.h - hPadding));
        }
        if (this.maxSize) {
            safeContentSize.w = Math.min(safeContentSize.w, (this.maxSize.w - wPadding));
            safeContentSize.h = Math.min(safeContentSize.h, (this.maxSize.h - hPadding));
        }
        if (this.map && this.map.size) {
            var maxY = this.map.size.h - this.map.paddingForPopups.top - this.map.paddingForPopups.bottom - hPadding;
            var maxX = this.map.size.w - this.map.paddingForPopups.left - this.map.paddingForPopups.right - wPadding;
            safeContentSize.w = Math.min(safeContentSize.w, maxX);
            safeContentSize.h = Math.min(safeContentSize.h, maxY);
        }
        return safeContentSize;
    },
    getContentDivPadding: function () {
        var contentDivPadding = this._contentDivPadding;
        if (!contentDivPadding) {
            this.div.style.display = "none";
            document.body.appendChild(this.div);
            contentDivPadding = new OpenLayers.Bounds(OpenLayers.Element.getStyle(this.contentDiv, "padding-left"), OpenLayers.Element.getStyle(this.contentDiv, "padding-bottom"), OpenLayers.Element.getStyle(this.contentDiv, "padding-right"), OpenLayers.Element.getStyle(this.contentDiv, "padding-top"));
            this._contentDivPadding = contentDivPadding;
            document.body.removeChild(this.div);
            this.div.style.display = "";
        }
        return contentDivPadding;
    },
    addCloseBox: function (callback) {
        this.closeDiv = OpenLayers.Util.createDiv(this.id + "_close", null, new OpenLayers.Size(17, 17));
        this.closeDiv.className = "olPopupCloseBox";
        var contentDivPadding = this.getContentDivPadding();
        this.closeDiv.style.right = contentDivPadding.right + "px";
        this.closeDiv.style.top = contentDivPadding.top + "px";
        this.groupDiv.appendChild(this.closeDiv);
        var closePopup = callback ||
        function (e) {
            this.hide();
            OpenLayers.Event.stop(e);
        };
        OpenLayers.Event.observe(this.closeDiv, "click", OpenLayers.Function.bindAsEventListener(closePopup, this));
    },
    panIntoView: function () {
        var mapSize = this.map.getSize();
        var origTL = this.map.getViewPortPxFromLayerPx(new OpenLayers.Pixel(parseInt(this.div.style.left), parseInt(this.div.style.top)));
        var newTL = origTL.clone();
        if (origTL.x < this.map.paddingForPopups.left) {
            newTL.x = this.map.paddingForPopups.left;
        } else if ((origTL.x + this.size.w) > (mapSize.w - this.map.paddingForPopups.right)) {
            newTL.x = mapSize.w - this.map.paddingForPopups.right - this.size.w;
        }
        if (origTL.y < this.map.paddingForPopups.top) {
            newTL.y = this.map.paddingForPopups.top;
        } else if ((origTL.y + this.size.h) > (mapSize.h - this.map.paddingForPopups.bottom)) {
            newTL.y = mapSize.h - this.map.paddingForPopups.bottom - this.size.h;
        }
        var dx = origTL.x - newTL.x;
        var dy = origTL.y - newTL.y;
        this.map.pan(dx, dy);
    },
    registerEvents: function () {
        this.events = new OpenLayers.Events(this, this.div, null, true);
        this.events.on({
            "mousedown": this.onmousedown,
            "mousemove": this.onmousemove,
            "mouseup": this.onmouseup,
            "click": this.onclick,
            "mouseout": this.onmouseout,
            "dblclick": this.ondblclick,
            scope: this
        });
    },
    onmousedown: function (evt) {
        this.mousedown = true;
        OpenLayers.Event.stop(evt, true);
    },
    onmousemove: function (evt) {
        if (this.mousedown) {
            OpenLayers.Event.stop(evt, true);
        }
    },
    onmouseup: function (evt) {
        if (this.mousedown) {
            this.mousedown = false;
            OpenLayers.Event.stop(evt, true);
        }
    },
    onclick: function (evt) {
        OpenLayers.Event.stop(evt, true);
    },
    onmouseout: function (evt) {
        this.mousedown = false;
    },
    ondblclick: function (evt) {
        OpenLayers.Event.stop(evt, true);
    },
    CLASS_NAME: "OpenLayers.Popup"
});
OpenLayers.Popup.WIDTH = 200;
OpenLayers.Popup.HEIGHT = 200;
OpenLayers.Popup.COLOR = "white";
OpenLayers.Popup.OPACITY = 1;
OpenLayers.Popup.BORDER = "0px";
OpenLayers.Tile = OpenLayers.Class({
    EVENT_TYPES: ["loadstart", "loadend", "reload", "unload"],
    events: null,
    id: null,
    layer: null,
    url: null,
    bounds: null,
    size: null,
    position: null,
    isLoading: false,
    initialize: function (layer, position, bounds, url, size) {
        this.layer = layer;
        this.position = position.clone();
        this.bounds = bounds.clone();
        this.url = url;
        this.size = size.clone();
        this.id = OpenLayers.Util.createUniqueID("Tile_");
        this.events = new OpenLayers.Events(this, null, this.EVENT_TYPES);
    },
    unload: function () {
        if (this.isLoading) {
            this.isLoading = false;
            this.events.triggerEvent("unload");
        }
    },
    destroy: function () {
        this.layer = null;
        this.bounds = null;
        this.size = null;
        this.position = null;
        this.events.destroy();
        this.events = null;
    },
    clone: function (obj) {
        if (obj == null) {
            obj = new OpenLayers.Tile(this.layer, this.position, this.bounds, this.url, this.size);
        }
        OpenLayers.Util.applyDefaults(obj, this);
        return obj;
    },
    draw: function () {
        var maxExtent = this.layer.maxExtent;
        var withinMaxExtent = (maxExtent && this.bounds.intersectsBounds(maxExtent, false));
        this.shouldDraw = (withinMaxExtent || this.layer.displayOutsideMaxExtent);
        this.clear();
        return this.shouldDraw;
    },
    moveTo: function (bounds, position, redraw) {
        if (redraw == null) {
            redraw = true;
        }
        this.bounds = bounds.clone();
        this.position = position.clone();
        if (redraw) {
            this.draw();
        }
    },
    clear: function () {},
    getBoundsFromBaseLayer: function (position) {
        var msg = OpenLayers.i18n('reprojectDeprecated', {
            'layerName': this.layer.name
        });
        OpenLayers.Console.warn(msg);
        var topLeft = this.layer.map.getLonLatFromLayerPx(position);
        var bottomRightPx = position.clone();
        bottomRightPx.x += this.size.w;
        bottomRightPx.y += this.size.h;
        var bottomRight = this.layer.map.getLonLatFromLayerPx(bottomRightPx);
        if (topLeft.lon > bottomRight.lon) {
            if (topLeft.lon < 0) {
                topLeft.lon = -180 - (topLeft.lon + 180);
            } else {
                bottomRight.lon = 180 + bottomRight.lon + 180;
            }
        }
        var bounds = new OpenLayers.Bounds(topLeft.lon, bottomRight.lat, bottomRight.lon, topLeft.lat);
        return bounds;
    },
    showTile: function () {
        if (this.shouldDraw) {
            this.show();
        }
    },
    show: function () {},
    hide: function () {},
    CLASS_NAME: "OpenLayers.Tile"
});
OpenLayers.Tile.Image = OpenLayers.Class(OpenLayers.Tile, {
    url: null,
    imgDiv: null,
    frame: null,
    layerAlphaHack: null,
    isBackBuffer: false,
    lastRatio: 1,
    isFirstDraw: true,
    backBufferTile: null,
    initialize: function (layer, position, bounds, url, size) {
        OpenLayers.Tile.prototype.initialize.apply(this, arguments);
        this.url = url;
        this.frame = document.createElement('div');
        this.frame.style.overflow = 'hidden';
        this.frame.style.position = 'absolute';
        this.layerAlphaHack = this.layer.alpha && OpenLayers.Util.alphaHack();
    },
    destroy: function () {
        if (this.imgDiv != null) {
            if (this.layerAlphaHack) {
                OpenLayers.Event.stopObservingElement(this.imgDiv.childNodes[0].id);
            } else {
                OpenLayers.Event.stopObservingElement(this.imgDiv.id);
            }
            if (this.imgDiv.parentNode == this.frame) {
                this.frame.removeChild(this.imgDiv);
                this.imgDiv.map = null;
            }
            this.imgDiv.urls = null;
            this.imgDiv.src = null;
        }
        this.imgDiv = null;
        if ((this.frame != null) && (this.frame.parentNode == this.layer.div)) {
            this.layer.div.removeChild(this.frame);
        }
        this.frame = null;
        if (this.backBufferTile) {
            this.backBufferTile.destroy();
            this.backBufferTile = null;
        }
        this.layer.events.unregister("loadend", this, this.resetBackBuffer);
        OpenLayers.Tile.prototype.destroy.apply(this, arguments);
    },
    clone: function (obj) {
        if (obj == null) {
            obj = new OpenLayers.Tile.Image(this.layer, this.position, this.bounds, this.url, this.size);
        }
        obj = OpenLayers.Tile.prototype.clone.apply(this, [obj]);
        obj.imgDiv = null;
        return obj;
    },
    draw: function () {
        if (this.layer != this.layer.map.baseLayer && this.layer.reproject) {
            this.bounds = this.getBoundsFromBaseLayer(this.position);
        }
        var drawTile = OpenLayers.Tile.prototype.draw.apply(this, arguments);
        if (OpenLayers.Util.indexOf(this.layer.SUPPORTED_TRANSITIONS, this.layer.transitionEffect) != -1) {
            if (drawTile) {
                if (!this.backBufferTile) {
                    this.backBufferTile = this.clone();
                    this.backBufferTile.hide();
                    this.backBufferTile.isBackBuffer = true;
                    this.events.register('loadend', this, this.resetBackBuffer);
                    this.layer.events.register("loadend", this, this.resetBackBuffer);
                }
                this.startTransition();
            } else {
                if (this.backBufferTile) {
                    this.backBufferTile.clear();
                }
            }
        } else {
            if (drawTile && this.isFirstDraw) {
                this.events.register('loadend', this, this.showTile);
                this.isFirstDraw = false;
            }
        }
        if (!drawTile) {
            return false;
        }
        if (this.isLoading) {
            this.events.triggerEvent("reload");
        } else {
            this.isLoading = true;
            this.events.triggerEvent("loadstart");
        }
        return this.renderTile();
    },
    resetBackBuffer: function () {
        this.showTile();
        if (this.backBufferTile && (this.isFirstDraw || !this.layer.numLoadingTiles)) {
            this.isFirstDraw = false;
            var maxExtent = this.layer.maxExtent;
            var withinMaxExtent = (maxExtent && this.bounds.intersectsBounds(maxExtent, false));
            if (withinMaxExtent) {
                this.backBufferTile.position = this.position;
                this.backBufferTile.bounds = this.bounds;
                this.backBufferTile.size = this.size;
                this.backBufferTile.imageSize = this.layer.imageSize || this.size;
                this.backBufferTile.imageOffset = this.layer.imageOffset;
                this.backBufferTile.resolution = this.layer.getResolution();
                this.backBufferTile.renderTile();
            }
        }
    },
    renderTile: function () {
        if (this.imgDiv == null) {
            this.initImgDiv();
        }
        this.imgDiv.viewRequestID = this.layer.map.viewRequestID;
        if (this.layer.url instanceof Array) {
            this.imgDiv.urls = this.layer.url.slice();
        }
        this.url = this.layer.getURL(this.bounds);
        OpenLayers.Util.modifyDOMElement(this.frame, null, this.position, this.size);
        var imageSize = this.layer.getImageSize();
        if (this.layerAlphaHack) {
            OpenLayers.Util.modifyAlphaImageDiv(this.imgDiv, null, null, imageSize, this.url);
        } else {
            OpenLayers.Util.modifyDOMElement(this.imgDiv, null, null, imageSize);
            this.imgDiv.src = this.url;
        }
        return true;
    },
    clear: function () {
        if (this.imgDiv) {
            this.hide();
            if (OpenLayers.Tile.Image.useBlankTile) {
                this.imgDiv.src = OpenLayers.Util.getImagesLocation() + "blank.gif";
            }
        }
    },
    initImgDiv: function () {
        var offset = this.layer.imageOffset;
        var size = this.layer.getImageSize();
        if (this.layerAlphaHack) {
            this.imgDiv = OpenLayers.Util.createAlphaImageDiv(null, offset, size, null, "relative", null, null, null, true);
        } else {
            this.imgDiv = OpenLayers.Util.createImage(null, offset, size, null, "relative", null, null, true);
        }
        this.imgDiv.className = 'olTileImage';
        this.frame.style.zIndex = this.isBackBuffer ? 0 : 1;
        this.frame.appendChild(this.imgDiv);
        this.layer.div.appendChild(this.frame);
        if (this.layer.opacity != null) {
            OpenLayers.Util.modifyDOMElement(this.imgDiv, null, null, null, null, null, null, this.layer.opacity);
        }
        this.imgDiv.map = this.layer.map;
        var onload = function () {
                if (this.isLoading) {
                    this.isLoading = false;
                    this.events.triggerEvent("loadend");
                }
            };
        if (this.layerAlphaHack) {
            OpenLayers.Event.observe(this.imgDiv.childNodes[0], 'load', OpenLayers.Function.bind(onload, this));
        } else {
            OpenLayers.Event.observe(this.imgDiv, 'load', OpenLayers.Function.bind(onload, this));
        }
        var onerror = function () {
                if (this.imgDiv._attempts > OpenLayers.IMAGE_RELOAD_ATTEMPTS) {
                    onload.call(this);
                }
            };
        OpenLayers.Event.observe(this.imgDiv, "error", OpenLayers.Function.bind(onerror, this));
    },
    checkImgURL: function () {
        if (this.layer) {
            var loaded = this.layerAlphaHack ? this.imgDiv.firstChild.src : this.imgDiv.src;
            if (!OpenLayers.Util.isEquivalentUrl(loaded, this.url)) {
                this.hide();
            }
        }
    },
    startTransition: function () {
        if (!this.backBufferTile || !this.backBufferTile.imgDiv) {
            return;
        }
        var ratio = 1;
        if (this.backBufferTile.resolution) {
            ratio = this.backBufferTile.resolution / this.layer.getResolution();
        }
        if (ratio != this.lastRatio) {
            if (this.layer.transitionEffect == 'resize') {
                var upperLeft = new OpenLayers.LonLat(this.backBufferTile.bounds.left, this.backBufferTile.bounds.top);
                var size = new OpenLayers.Size(this.backBufferTile.size.w * ratio, this.backBufferTile.size.h * ratio);
                var px = this.layer.map.getLayerPxFromLonLat(upperLeft);
                OpenLayers.Util.modifyDOMElement(this.backBufferTile.frame, null, px, size);
                var imageSize = this.backBufferTile.imageSize;
                imageSize = new OpenLayers.Size(imageSize.w * ratio, imageSize.h * ratio);
                var imageOffset = this.backBufferTile.imageOffset;
                if (imageOffset) {
                    imageOffset = new OpenLayers.Pixel(imageOffset.x * ratio, imageOffset.y * ratio);
                }
                OpenLayers.Util.modifyDOMElement(this.backBufferTile.imgDiv, null, imageOffset, imageSize);
                this.backBufferTile.show();
            }
        } else {
            if (this.layer.singleTile) {
                this.backBufferTile.show();
            } else {
                this.backBufferTile.hide();
            }
        }
        this.lastRatio = ratio;
    },
    show: function () {
        this.frame.style.display = '';
        if (OpenLayers.Util.indexOf(this.layer.SUPPORTED_TRANSITIONS, this.layer.transitionEffect) != -1) {
            if (navigator.userAgent.toLowerCase().indexOf("gecko") != -1) {
                this.frame.scrollLeft = this.frame.scrollLeft;
            }
        }
    },
    hide: function () {
        this.frame.style.display = 'none';
    },
    CLASS_NAME: "OpenLayers.Tile.Image"
});
OpenLayers.Tile.Image.useBlankTile = (OpenLayers.Util.getBrowserName() == "safari" || OpenLayers.Util.getBrowserName() == "opera");
OpenLayers.Layer.SphericalMercator = {
    getExtent: function () {
        var extent = null;
        if (this.sphericalMercator) {
            extent = this.map.calculateBounds();
        } else {
            extent = OpenLayers.Layer.FixedZoomLevels.prototype.getExtent.apply(this);
        }
        return extent;
    },
    initMercatorParameters: function () {
        this.RESOLUTIONS = [];
        var maxResolution = 156543.0339;
        for (var zoom = 0; zoom <= this.MAX_ZOOM_LEVEL; ++zoom) {
            this.RESOLUTIONS[zoom] = maxResolution / Math.pow(2, zoom);
        }
        this.units = "m";
        this.projection = "EPSG:900913";
    },
    forwardMercator: function (lon, lat) {
        var x = lon * 20037508.34 / 180;
        var y = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
        y = y * 20037508.34 / 180;
        return new OpenLayers.LonLat(x, y);
    },
    inverseMercator: function (x, y) {
        var lon = (x / 20037508.34) * 180;
        var lat = (y / 20037508.34) * 180;
        lat = 180 / Math.PI * (2 * Math.atan(Math.exp(lat * Math.PI / 180)) - Math.PI / 2);
        return new OpenLayers.LonLat(lon, lat);
    },
    projectForward: function (point) {
        var lonlat = OpenLayers.Layer.SphericalMercator.forwardMercator(point.x, point.y);
        point.x = lonlat.lon;
        point.y = lonlat.lat;
        return point;
    },
    projectInverse: function (point) {
        var lonlat = OpenLayers.Layer.SphericalMercator.inverseMercator(point.x, point.y);
        point.x = lonlat.lon;
        point.y = lonlat.lat;
        return point;
    }
};
OpenLayers.Projection.addTransform("EPSG:4326", "EPSG:900913", OpenLayers.Layer.SphericalMercator.projectForward);
OpenLayers.Projection.addTransform("EPSG:900913", "EPSG:4326", OpenLayers.Layer.SphericalMercator.projectInverse);
OpenLayers.Layer.HTTPRequest = OpenLayers.Class(OpenLayers.Layer, {
    URL_HASH_FACTOR: (Math.sqrt(5) - 1) / 2,
    url: null,
    params: null,
    reproject: false,
    initialize: function (name, url, params, options) {
        var newArguments = arguments;
        newArguments = [name, options];
        OpenLayers.Layer.prototype.initialize.apply(this, newArguments);
        this.url = url;
        this.params = OpenLayers.Util.extend({}, params);
    },
    destroy: function () {
        this.url = null;
        this.params = null;
        OpenLayers.Layer.prototype.destroy.apply(this, arguments);
    },
    clone: function (obj) {
        if (obj == null) {
            obj = new OpenLayers.Layer.HTTPRequest(this.name, this.url, this.params, this.options);
        }
        obj = OpenLayers.Layer.prototype.clone.apply(this, [obj]);
        return obj;
    },
    setUrl: function (newUrl) {
        this.url = newUrl;
    },
    mergeNewParams: function (newParams) {
        this.params = OpenLayers.Util.extend(this.params, newParams);
        return this.redraw();
    },
    redraw: function (force) {
        if (force) {
            return this.mergeNewParams({
                "_olSalt": Math.random()
            });
        } else {
            return OpenLayers.Layer.prototype.redraw.apply(this, []);
        }
    },
    selectUrl: function (paramString, urls) {
        var product = 1;
        for (var i = 0, len = paramString.length; i < len; i++) {
            product *= paramString.charCodeAt(i) * this.URL_HASH_FACTOR;
            product -= Math.floor(product);
        }
        return urls[Math.floor(product * urls.length)];
    },
    getFullRequestString: function (newParams, altUrl) {
        var url = altUrl || this.url;
        var allParams = OpenLayers.Util.extend({}, this.params);
        allParams = OpenLayers.Util.extend(allParams, newParams);
        var paramsString = OpenLayers.Util.getParameterString(allParams);
        if (url instanceof Array) {
            url = this.selectUrl(paramsString, url);
        }
        var urlParams = OpenLayers.Util.upperCaseObject(OpenLayers.Util.getParameters(url));
        for (var key in allParams) {
            if (key.toUpperCase() in urlParams) {
                delete allParams[key];
            }
        }
        paramsString = OpenLayers.Util.getParameterString(allParams);
        paramsString = paramsString.toLowerCase();
        var requestString = url;
        if (paramsString != "") {
            var lastServerChar = url.charAt(url.length - 1);
            if ((lastServerChar == "&") || (lastServerChar == "?")) {
                requestString += paramsString;
            } else {
                if (url.indexOf('?') == -1) {
                    requestString += '?' + paramsString;
                } else {
                    requestString += '&' + paramsString;
                }
            }
        }
        return requestString;
    },
    CLASS_NAME: "OpenLayers.Layer.HTTPRequest"
});
OpenLayers.Layer.Grid = OpenLayers.Class(OpenLayers.Layer.HTTPRequest, {
    tileSize: null,
    grid: null,
    singleTile: false,
    ratio: 1.5,
    buffer: 0,
    numLoadingTiles: 0,
    initialize: function (name, url, params, options) {
        OpenLayers.Layer.HTTPRequest.prototype.initialize.apply(this, arguments);
        this.events.addEventType("tileloaded");
        this.grid = [];
    },
    destroy: function () {
        this.clearGrid();
        this.grid = null;
        this.tileSize = null;
        OpenLayers.Layer.HTTPRequest.prototype.destroy.apply(this, arguments);
    },
    clearGrid: function () {
        if (this.grid) {
            for (var iRow = 0, len = this.grid.length; iRow < len; iRow++) {
                var row = this.grid[iRow];
                for (var iCol = 0, clen = row.length; iCol < clen; iCol++) {
                    var tile = row[iCol];
                    this.removeTileMonitoringHooks(tile);
                    tile.destroy();
                }
            }
            this.grid = [];
        }
    },
    clone: function (obj) {
        if (obj == null) {
            obj = new OpenLayers.Layer.Grid(this.name, this.url, this.params, this.options);
        }
        obj = OpenLayers.Layer.HTTPRequest.prototype.clone.apply(this, [obj]);
        if (this.tileSize != null) {
            obj.tileSize = this.tileSize.clone();
        }
        obj.grid = [];
        return obj;
    },
    moveTo: function (bounds, zoomChanged, dragging) {
        OpenLayers.Layer.HTTPRequest.prototype.moveTo.apply(this, arguments);
        bounds = bounds || this.map.getExtent();
        if (bounds != null) {
            var forceReTile = !this.grid.length || zoomChanged;
            var tilesBounds = this.getTilesBounds();
            if (this.singleTile) {
                if (forceReTile || (!dragging && !tilesBounds.containsBounds(bounds))) {
                    this.initSingleTile(bounds);
                }
            } else {
                if (forceReTile || !tilesBounds.containsBounds(bounds, true)) {
                    this.initGriddedTiles(bounds);
                } else {
                    this.moveGriddedTiles(bounds);
                }
            }
        }
    },
    setTileSize: function (size) {
        if (this.singleTile) {
            size = this.map.getSize().clone();
            size.h = parseInt(size.h * this.ratio);
            size.w = parseInt(size.w * this.ratio);
        }
        OpenLayers.Layer.HTTPRequest.prototype.setTileSize.apply(this, [size]);
    },
    getGridBounds: function () {
        var msg = "The getGridBounds() function is deprecated. It will be " + "removed in 3.0. Please use getTilesBounds() instead.";
        OpenLayers.Console.warn(msg);
        return this.getTilesBounds();
    },
    getTilesBounds: function () {
        var bounds = null;
        if (this.grid.length) {
            var bottom = this.grid.length - 1;
            var bottomLeftTile = this.grid[bottom][0];
            var right = this.grid[0].length - 1;
            var topRightTile = this.grid[0][right];
            bounds = new OpenLayers.Bounds(bottomLeftTile.bounds.left, bottomLeftTile.bounds.bottom, topRightTile.bounds.right, topRightTile.bounds.top);
        }
        return bounds;
    },
    initSingleTile: function (bounds) {
        var center = bounds.getCenterLonLat();
        var tileWidth = bounds.getWidth() * this.ratio;
        var tileHeight = bounds.getHeight() * this.ratio;
        var tileBounds = new OpenLayers.Bounds(center.lon - (tileWidth / 2), center.lat - (tileHeight / 2), center.lon + (tileWidth / 2), center.lat + (tileHeight / 2));
        var ul = new OpenLayers.LonLat(tileBounds.left, tileBounds.top);
        var px = this.map.getLayerPxFromLonLat(ul);
        if (!this.grid.length) {
            this.grid[0] = [];
        }
        var tile = this.grid[0][0];
        if (!tile) {
            tile = this.addTile(tileBounds, px);
            this.addTileMonitoringHooks(tile);
            tile.draw();
            this.grid[0][0] = tile;
        } else {
            tile.moveTo(tileBounds, px);
        }
        this.removeExcessTiles(1, 1);
    },
    calculateGridLayout: function (bounds, extent, resolution) {
        var tilelon = resolution * this.tileSize.w;
        var tilelat = resolution * this.tileSize.h;
        var offsetlon = bounds.left - extent.left;
        var tilecol = Math.floor(offsetlon / tilelon) - this.buffer;
        var tilecolremain = offsetlon / tilelon - tilecol;
        var tileoffsetx = -tilecolremain * this.tileSize.w;
        var tileoffsetlon = extent.left + tilecol * tilelon;
        var offsetlat = bounds.top - (extent.bottom + tilelat);
        var tilerow = Math.ceil(offsetlat / tilelat) + this.buffer;
        var tilerowremain = tilerow - offsetlat / tilelat;
        var tileoffsety = -tilerowremain * this.tileSize.h;
        var tileoffsetlat = extent.bottom + tilerow * tilelat;
        return {
            tilelon: tilelon,
            tilelat: tilelat,
            tileoffsetlon: tileoffsetlon,
            tileoffsetlat: tileoffsetlat,
            tileoffsetx: tileoffsetx,
            tileoffsety: tileoffsety
        };
    },
    initGriddedTiles: function (bounds) {
        var viewSize = this.map.getSize();
        var minRows = Math.ceil(viewSize.h / this.tileSize.h) + Math.max(1, 2 * this.buffer);
        var minCols = Math.ceil(viewSize.w / this.tileSize.w) + Math.max(1, 2 * this.buffer);
        var extent = this.maxExtent;
        var resolution = this.map.getResolution();
        var tileLayout = this.calculateGridLayout(bounds, extent, resolution);
        var tileoffsetx = Math.round(tileLayout.tileoffsetx);
        var tileoffsety = Math.round(tileLayout.tileoffsety);
        var tileoffsetlon = tileLayout.tileoffsetlon;
        var tileoffsetlat = tileLayout.tileoffsetlat;
        var tilelon = tileLayout.tilelon;
        var tilelat = tileLayout.tilelat;
        this.origin = new OpenLayers.Pixel(tileoffsetx, tileoffsety);
        var startX = tileoffsetx;
        var startLon = tileoffsetlon;
        var rowidx = 0;
        var layerContainerDivLeft = parseInt(this.map.layerContainerDiv.style.left);
        var layerContainerDivTop = parseInt(this.map.layerContainerDiv.style.top);
        do {
            var row = this.grid[rowidx++];
            if (!row) {
                row = [];
                this.grid.push(row);
            }
            tileoffsetlon = startLon;
            tileoffsetx = startX;
            var colidx = 0;
            do {
                var tileBounds = new OpenLayers.Bounds(tileoffsetlon, tileoffsetlat, tileoffsetlon + tilelon, tileoffsetlat + tilelat);
                var x = tileoffsetx;
                x -= layerContainerDivLeft;
                var y = tileoffsety;
                y -= layerContainerDivTop;
                var px = new OpenLayers.Pixel(x, y);
                var tile = row[colidx++];
                if (!tile) {
                    tile = this.addTile(tileBounds, px);
                    this.addTileMonitoringHooks(tile);
                    row.push(tile);
                } else {
                    tile.moveTo(tileBounds, px, false);
                }
                tileoffsetlon += tilelon;
                tileoffsetx += this.tileSize.w;
            } while ((tileoffsetlon <= bounds.right + tilelon * this.buffer) || colidx < minCols)
            tileoffsetlat -= tilelat;
            tileoffsety += this.tileSize.h;
        } while ((tileoffsetlat >= bounds.bottom - tilelat * this.buffer) || rowidx < minRows)
        this.removeExcessTiles(rowidx, colidx);
        this.spiralTileLoad();
    },
    spiralTileLoad: function () {
        var tileQueue = [];
        var directions = ["right", "down", "left", "up"];
        var iRow = 0;
        var iCell = -1;
        var direction = OpenLayers.Util.indexOf(directions, "right");
        var directionsTried = 0;
        while (directionsTried < directions.length) {
            var testRow = iRow;
            var testCell = iCell;
            switch (directions[direction]) {
            case "right":
                testCell++;
                break;
            case "down":
                testRow++;
                break;
            case "left":
                testCell--;
                break;
            case "up":
                testRow--;
                break;
            }
            var tile = null;
            if ((testRow < this.grid.length) && (testRow >= 0) && (testCell < this.grid[0].length) && (testCell >= 0)) {
                tile = this.grid[testRow][testCell];
            }
            if ((tile != null) && (!tile.queued)) {
                tileQueue.unshift(tile);
                tile.queued = true;
                directionsTried = 0;
                iRow = testRow;
                iCell = testCell;
            } else {
                direction = (direction + 1) % 4;
                directionsTried++;
            }
        }
        for (var i = 0, len = tileQueue.length; i < len; i++) {
            var tile = tileQueue[i];
            tile.draw();
            tile.queued = false;
        }
    },
    addTile: function (bounds, position) {},
    addTileMonitoringHooks: function (tile) {
        tile.onLoadStart = function () {
            if (this.numLoadingTiles == 0) {
                this.events.triggerEvent("loadstart");
            }
            this.numLoadingTiles++;
        };
        tile.events.register("loadstart", this, tile.onLoadStart);
        tile.onLoadEnd = function () {
            this.numLoadingTiles--;
            this.events.triggerEvent("tileloaded");
            if (this.numLoadingTiles == 0) {
                this.events.triggerEvent("loadend");
            }
        };
        tile.events.register("loadend", this, tile.onLoadEnd);
        tile.events.register("unload", this, tile.onLoadEnd);
    },
    removeTileMonitoringHooks: function (tile) {
        tile.unload();
        tile.events.un({
            "loadstart": tile.onLoadStart,
            "loadend": tile.onLoadEnd,
            "unload": tile.onLoadEnd,
            scope: this
        });
    },
    moveGriddedTiles: function (bounds) {
        var buffer = this.buffer || 1;
        while (true) {
            var tlLayer = this.grid[0][0].position;
            var tlViewPort = this.map.getViewPortPxFromLayerPx(tlLayer);
            if (tlViewPort.x > -this.tileSize.w * (buffer - 1)) {
                this.shiftColumn(true);
            } else if (tlViewPort.x < -this.tileSize.w * buffer) {
                this.shiftColumn(false);
            } else if (tlViewPort.y > -this.tileSize.h * (buffer - 1)) {
                this.shiftRow(true);
            } else if (tlViewPort.y < -this.tileSize.h * buffer) {
                this.shiftRow(false);
            } else {
                break;
            }
        };
    },
    shiftRow: function (prepend) {
        var modelRowIndex = (prepend) ? 0 : (this.grid.length - 1);
        var grid = this.grid;
        var modelRow = grid[modelRowIndex];
        var resolution = this.map.getResolution();
        var deltaY = (prepend) ? -this.tileSize.h : this.tileSize.h;
        var deltaLat = resolution * -deltaY;
        var row = (prepend) ? grid.pop() : grid.shift();
        for (var i = 0, len = modelRow.length; i < len; i++) {
            var modelTile = modelRow[i];
            var bounds = modelTile.bounds.clone();
            var position = modelTile.position.clone();
            bounds.bottom = bounds.bottom + deltaLat;
            bounds.top = bounds.top + deltaLat;
            position.y = position.y + deltaY;
            row[i].moveTo(bounds, position);
        }
        if (prepend) {
            grid.unshift(row);
        } else {
            grid.push(row);
        }
    },
    shiftColumn: function (prepend) {
        var deltaX = (prepend) ? -this.tileSize.w : this.tileSize.w;
        var resolution = this.map.getResolution();
        var deltaLon = resolution * deltaX;
        for (var i = 0, len = this.grid.length; i < len; i++) {
            var row = this.grid[i];
            var modelTileIndex = (prepend) ? 0 : (row.length - 1);
            var modelTile = row[modelTileIndex];
            var bounds = modelTile.bounds.clone();
            var position = modelTile.position.clone();
            bounds.left = bounds.left + deltaLon;
            bounds.right = bounds.right + deltaLon;
            position.x = position.x + deltaX;
            var tile = prepend ? this.grid[i].pop() : this.grid[i].shift();
            tile.moveTo(bounds, position);
            if (prepend) {
                row.unshift(tile);
            } else {
                row.push(tile);
            }
        }
    },
    removeExcessTiles: function (rows, columns) {
        while (this.grid.length > rows) {
            var row = this.grid.pop();
            for (var i = 0, l = row.length; i < l; i++) {
                var tile = row[i];
                this.removeTileMonitoringHooks(tile);
                tile.destroy();
            }
        }
        while (this.grid[0].length > columns) {
            for (var i = 0, l = this.grid.length; i < l; i++) {
                var row = this.grid[i];
                var tile = row.pop();
                this.removeTileMonitoringHooks(tile);
                tile.destroy();
            }
        }
    },
    onMapResize: function () {
        if (this.singleTile) {
            this.clearGrid();
            this.setTileSize();
        }
    },
    getTileBounds: function (viewPortPx) {
        var maxExtent = this.maxExtent;
        var resolution = this.getResolution();
        var tileMapWidth = resolution * this.tileSize.w;
        var tileMapHeight = resolution * this.tileSize.h;
        var mapPoint = this.getLonLatFromViewPortPx(viewPortPx);
        var tileLeft = maxExtent.left + (tileMapWidth * Math.floor((mapPoint.lon - maxExtent.left) / tileMapWidth));
        var tileBottom = maxExtent.bottom + (tileMapHeight * Math.floor((mapPoint.lat - maxExtent.bottom) / tileMapHeight));
        return new OpenLayers.Bounds(tileLeft, tileBottom, tileLeft + tileMapWidth, tileBottom + tileMapHeight);
    },
    CLASS_NAME: "OpenLayers.Layer.Grid"
});
OpenLayers.Layer.WMS = OpenLayers.Class(OpenLayers.Layer.Grid, {
    DEFAULT_PARAMS: {
        service: "WMS",
        version: "1.1.1",
        request: "GetMap",
        styles: "",
        exceptions: "application/vnd.ogc.se_inimage",
        format: "image/png"
    },
    reproject: false,
    isBaseLayer: true,
    encodeBBOX: false,
    initialize: function (name, url, params, options) {
        var newArguments = [];
        params = OpenLayers.Util.upperCaseObject(params);
        newArguments.push(name, url, params, options);
        OpenLayers.Layer.Grid.prototype.initialize.apply(this, newArguments);
        OpenLayers.Util.applyDefaults(this.params, OpenLayers.Util.upperCaseObject(this.DEFAULT_PARAMS));
        if (this.params.TRANSPARENT && this.params.TRANSPARENT.toString().toLowerCase() == "true") {
            if ((options == null) || (!options.isBaseLayer)) {
                this.isBaseLayer = false;
            }
            if (this.params.FORMAT == "image/jpeg") {
                this.params.FORMAT = OpenLayers.Util.alphaHack() ? "image/gif" : "image/png";
            }
        }
    },
    destroy: function () {
        OpenLayers.Layer.Grid.prototype.destroy.apply(this, arguments);
    },
    clone: function (obj) {
        if (obj == null) {
            obj = new OpenLayers.Layer.WMS(this.name, this.url, this.params, this.options);
        }
        obj = OpenLayers.Layer.Grid.prototype.clone.apply(this, [obj]);
        return obj;
    },
    getURL: function (bounds) {
        bounds = this.adjustBounds(bounds);
        var imageSize = this.getImageSize();
        var newParams = {
            'BBOX': this.encodeBBOX ? bounds.toBBOX() : bounds.toArray(),
            'WIDTH': imageSize.w,
            'HEIGHT': imageSize.h
        };
        var requestString = this.getFullRequestString(newParams);
        return requestString;
    },
    addTile: function (bounds, position) {
        return new OpenLayers.Tile.Image(this, position, bounds, null, this.tileSize);
    },
    mergeNewParams: function (newParams) {
        var upperParams = OpenLayers.Util.upperCaseObject(newParams);
        var newArguments = [upperParams];
        return OpenLayers.Layer.Grid.prototype.mergeNewParams.apply(this, newArguments);
    },
    getFullRequestString: function (newParams, altUrl) {
        var projectionCode = this.map.getProjection();
        this.params.SRS = (projectionCode == "none") ? null : projectionCode;
        return OpenLayers.Layer.Grid.prototype.getFullRequestString.apply(this, arguments);
    },
    CLASS_NAME: "OpenLayers.Layer.WMS"
});
OpenLayers.Layer.TileCache = OpenLayers.Class(OpenLayers.Layer.Grid, {
    isBaseLayer: true,
    tileOrigin: null,
    format: 'image/png',
    initialize: function (name, url, layername, options) {
        this.layername = layername;
        OpenLayers.Layer.Grid.prototype.initialize.apply(this, [name, url,
        {},
        options]);
        this.extension = this.format.split('/')[1].toLowerCase();
        this.extension = (this.extension == 'jpg') ? 'jpeg' : this.extension;
    },
    clone: function (obj) {
        if (obj == null) {
            obj = new OpenLayers.Layer.TileCache(this.name, this.url, this.layername, this.options);
        }
        obj = OpenLayers.Layer.Grid.prototype.clone.apply(this, [obj]);
        return obj;
    },
    getURL: function (bounds) {
        var res = this.map.getResolution();
        var bbox = this.maxExtent;
        var size = this.tileSize;
        var tileX = Math.round((bounds.left - bbox.left) / (res * size.w));
        var tileY = Math.round((bounds.bottom - bbox.bottom) / (res * size.h));
        var tileZ = this.map.zoom;

        function zeroPad(number, length) {
            number = String(number);
            var zeros = [];
            for (var i = 0; i < length; ++i) {
                zeros.push('0');
            }
            return zeros.join('').substring(0, length - number.length) + number;
        }
        var components = [this.layername, zeroPad(tileZ, 2), zeroPad(parseInt(tileX / 1000000), 3), zeroPad((parseInt(tileX / 1000) % 1000), 3), zeroPad((parseInt(tileX) % 1000), 3), zeroPad(parseInt(tileY / 1000000), 3), zeroPad((parseInt(tileY / 1000) % 1000), 3), zeroPad((parseInt(tileY) % 1000), 3) + '.' + this.extension];
        var path = components.join('/');
        var url = this.url;
        if (url instanceof Array) {
            url = this.selectUrl(path, url);
        }
        url = (url.charAt(url.length - 1) == '/') ? url : url + '/';
        return url + path + '?new';
    },
    addTile: function (bounds, position) {
        var url = this.getURL(bounds);
        return new OpenLayers.Tile.Image(this, position, bounds, url, this.tileSize);
    },
    setMap: function (map) {
        OpenLayers.Layer.Grid.prototype.setMap.apply(this, arguments);
        if (!this.tileOrigin) {
            this.tileOrigin = new OpenLayers.LonLat(this.map.maxExtent.left, this.map.maxExtent.bottom);
        }
    },
    CLASS_NAME: "OpenLayers.Layer.TileCache"
});
OpenLayers.Popup.Anchored = OpenLayers.Class(OpenLayers.Popup, {
    relativePosition: null,
    anchor: null,
    initialize: function (id, lonlat, contentSize, contentHTML, anchor, closeBox, closeBoxCallback) {
        var newArguments = [id, lonlat, contentSize, contentHTML, closeBox, closeBoxCallback];
        OpenLayers.Popup.prototype.initialize.apply(this, newArguments);
        this.anchor = (anchor != null) ? anchor : {
            size: new OpenLayers.Size(0, 0),
            offset: new OpenLayers.Pixel(0, 0)
        };
    },
    destroy: function () {
        this.anchor = null;
        this.relativePosition = null;
        OpenLayers.Popup.prototype.destroy.apply(this, arguments);
    },
    show: function () {
        this.updatePosition();
        OpenLayers.Popup.prototype.show.apply(this, arguments);
    },
    moveTo: function (px) {
        var oldRelativePosition = this.relativePosition;
        this.relativePosition = this.calculateRelativePosition(px);
        var newPx = this.calculateNewPx(px);
        var newArguments = new Array(newPx);
        OpenLayers.Popup.prototype.moveTo.apply(this, newArguments);
        if (this.relativePosition != oldRelativePosition) {
            this.updateRelativePosition();
        }
    },
    setSize: function (contentSize) {
        OpenLayers.Popup.prototype.setSize.apply(this, arguments);
        if ((this.lonlat) && (this.map)) {
            var px = this.map.getLayerPxFromLonLat(this.lonlat);
            this.moveTo(px);
        }
    },
    calculateRelativePosition: function (px) {
        var lonlat = this.map.getLonLatFromLayerPx(px);
        var extent = this.map.getExtent();
        var quadrant = extent.determineQuadrant(lonlat);
        return OpenLayers.Bounds.oppositeQuadrant(quadrant);
    },
    updateRelativePosition: function () {},
    calculateNewPx: function (px) {
        var newPx = px.offset(this.anchor.offset);
        var size = this.size || this.contentSize;
        var top = (this.relativePosition.charAt(0) == 't');
        newPx.y += (top) ? -size.h : this.anchor.size.h;
        var left = (this.relativePosition.charAt(1) == 'l');
        newPx.x += (left) ? -size.w : this.anchor.size.w;
        return newPx;
    },
    CLASS_NAME: "OpenLayers.Popup.Anchored"
});
OpenLayers.Popup.AnchoredBubble = OpenLayers.Class(OpenLayers.Popup.Anchored, {
    rounded: false,
    initialize: function (id, lonlat, contentSize, contentHTML, anchor, closeBox, closeBoxCallback) {
        this.padding = new OpenLayers.Bounds(0, OpenLayers.Popup.AnchoredBubble.CORNER_SIZE, 0, OpenLayers.Popup.AnchoredBubble.CORNER_SIZE);
        OpenLayers.Popup.Anchored.prototype.initialize.apply(this, arguments);
    },
    draw: function (px) {
        OpenLayers.Popup.Anchored.prototype.draw.apply(this, arguments);
        this.setContentHTML();
        this.setBackgroundColor();
        this.setOpacity();
        return this.div;
    },
    updateRelativePosition: function () {
        this.setRicoCorners();
    },
    setSize: function (contentSize) {
        OpenLayers.Popup.Anchored.prototype.setSize.apply(this, arguments);
        this.setRicoCorners();
    },
    setBackgroundColor: function (color) {
        if (color != undefined) {
            this.backgroundColor = color;
        }
        if (this.div != null) {
            if (this.contentDiv != null) {
                this.div.style.background = "transparent";
                OpenLayers.Rico.Corner.changeColor(this.groupDiv, this.backgroundColor);
            }
        }
    },
    setOpacity: function (opacity) {
        OpenLayers.Popup.Anchored.prototype.setOpacity.call(this, opacity);
        if (this.div != null) {
            if (this.groupDiv != null) {
                OpenLayers.Rico.Corner.changeOpacity(this.groupDiv, this.opacity);
            }
        }
    },
    setBorder: function (border) {
        this.border = 0;
    },
    setRicoCorners: function () {
        var corners = this.getCornersToRound(this.relativePosition);
        var options = {
            corners: corners,
            color: this.backgroundColor,
            bgColor: "transparent",
            blend: false
        };
        if (!this.rounded) {
            OpenLayers.Rico.Corner.round(this.div, options);
            this.rounded = true;
        } else {
            OpenLayers.Rico.Corner.reRound(this.groupDiv, options);
            this.setBackgroundColor();
            this.setOpacity();
        }
    },
    getCornersToRound: function () {
        var corners = ['tl', 'tr', 'bl', 'br'];
        var corner = OpenLayers.Bounds.oppositeQuadrant(this.relativePosition);
        OpenLayers.Util.removeItem(corners, corner);
        return corners.join(" ");
    },
    CLASS_NAME: "OpenLayers.Popup.AnchoredBubble"
});
OpenLayers.Popup.AnchoredBubble.CORNER_SIZE = 5;
OpenLayers.Popup.Framed = OpenLayers.Class(OpenLayers.Popup.Anchored, {
    imageSrc: null,
    imageSize: null,
    isAlphaImage: false,
    positionBlocks: null,
    blocks: null,
    fixedRelativePosition: false,
    initialize: function (id, lonlat, contentSize, contentHTML, anchor, closeBox, closeBoxCallback) {
        OpenLayers.Popup.Anchored.prototype.initialize.apply(this, arguments);
        if (this.fixedRelativePosition) {
            this.updateRelativePosition();
            this.calculateRelativePosition = function (px) {
                return this.relativePosition;
            };
        }
        this.contentDiv.style.position = "absolute";
        this.contentDiv.style.zIndex = 1;
        if (closeBox) {
            this.closeDiv.style.zIndex = 1;
        }
        this.groupDiv.style.position = "absolute";
        this.groupDiv.style.top = "0px";
        this.groupDiv.style.left = "0px";
        this.groupDiv.style.height = "100%";
        this.groupDiv.style.width = "100%";
    },
    destroy: function () {
        this.imageSrc = null;
        this.imageSize = null;
        this.isAlphaImage = null;
        this.fixedRelativePosition = false;
        this.positionBlocks = null;
        for (var i = 0; i < this.blocks.length; i++) {
            var block = this.blocks[i];
            if (block.image) {
                block.div.removeChild(block.image);
            }
            block.image = null;
            if (block.div) {
                this.groupDiv.removeChild(block.div);
            }
            block.div = null;
        }
        this.blocks = null;
        OpenLayers.Popup.Anchored.prototype.destroy.apply(this, arguments);
    },
    setBackgroundColor: function (color) {},
    setBorder: function () {},
    setOpacity: function (opacity) {},
    setSize: function (contentSize) {
        OpenLayers.Popup.Anchored.prototype.setSize.apply(this, arguments);
        this.updateBlocks();
    },
    updateRelativePosition: function () {
        this.padding = this.positionBlocks[this.relativePosition].padding;
        if (this.closeDiv) {
            var contentDivPadding = this.getContentDivPadding();
            this.closeDiv.style.right = contentDivPadding.right + this.padding.right + "px";
            this.closeDiv.style.top = contentDivPadding.top + this.padding.top + "px";
        }
        this.updateBlocks();
    },
    calculateNewPx: function (px) {
        var newPx = OpenLayers.Popup.Anchored.prototype.calculateNewPx.apply(this, arguments);
        newPx = newPx.offset(this.positionBlocks[this.relativePosition].offset);
        return newPx;
    },
    createBlocks: function () {
        this.blocks = [];
        var firstPosition = null;
        for (var key in this.positionBlocks) {
            firstPosition = key;
            break;
        }
        var position = this.positionBlocks[firstPosition];
        for (var i = 0; i < position.blocks.length; i++) {
            var block = {};
            this.blocks.push(block);
            var divId = this.id + '_FrameDecorationDiv_' + i;
            block.div = OpenLayers.Util.createDiv(divId, null, null, null, "absolute", null, "hidden", null);
            var imgId = this.id + '_FrameDecorationImg_' + i;
            var imageCreator = (this.isAlphaImage) ? OpenLayers.Util.createAlphaImageDiv : OpenLayers.Util.createImage;
            block.image = imageCreator(imgId, null, this.imageSize, this.imageSrc, "absolute", null, null, null);
            block.div.appendChild(block.image);
            this.groupDiv.appendChild(block.div);
        }
    },
    updateBlocks: function () {
        if (!this.blocks) {
            this.createBlocks();
        }
        if (this.size && this.relativePosition) {
            var position = this.positionBlocks[this.relativePosition];
            for (var i = 0; i < position.blocks.length; i++) {
                var positionBlock = position.blocks[i];
                var block = this.blocks[i];
                var l = positionBlock.anchor.left;
                var b = positionBlock.anchor.bottom;
                var r = positionBlock.anchor.right;
                var t = positionBlock.anchor.top;
                var w = (isNaN(positionBlock.size.w)) ? this.size.w - (r + l) : positionBlock.size.w;
                var h = (isNaN(positionBlock.size.h)) ? this.size.h - (b + t) : positionBlock.size.h;
                block.div.style.width = w + 'px';
                block.div.style.height = h + 'px';
                block.div.style.left = (l != null) ? l + 'px' : '';
                block.div.style.bottom = (b != null) ? b + 'px' : '';
                block.div.style.right = (r != null) ? r + 'px' : '';
                block.div.style.top = (t != null) ? t + 'px' : '';
                block.image.style.left = positionBlock.position.x + 'px';
                block.image.style.top = positionBlock.position.y + 'px';
            }
            this.contentDiv.style.left = this.padding.left + "px";
            this.contentDiv.style.top = this.padding.top + "px";
        }
    },
    CLASS_NAME: "OpenLayers.Popup.Framed"
});
OpenLayers.Popup.FramedCloud = OpenLayers.Class(OpenLayers.Popup.Framed, {
    contentDisplayClass: "olFramedCloudPopupContent",
    autoSize: true,
    panMapIfOutOfView: true,
    imageSize: new OpenLayers.Size(676, 736),
    isAlphaImage: false,
    fixedRelativePosition: false,
    positionBlocks: {
        "tl": {
            'offset': new OpenLayers.Pixel(44, 0),
            'padding': new OpenLayers.Bounds(8, 40, 8, 9),
            'blocks': [{
                size: new OpenLayers.Size('auto', 'auto'),
                anchor: new OpenLayers.Bounds(0, 51, 22, 0),
                position: new OpenLayers.Pixel(0, 0)
            }, {
                size: new OpenLayers.Size(22, 'auto'),
                anchor: new OpenLayers.Bounds(null, 50, 0, 0),
                position: new OpenLayers.Pixel(-638, 0)
            }, {
                size: new OpenLayers.Size('auto', 21),
                anchor: new OpenLayers.Bounds(0, 32, 80, null),
                position: new OpenLayers.Pixel(0, -629)
            }, {
                size: new OpenLayers.Size(22, 21),
                anchor: new OpenLayers.Bounds(null, 32, 0, null),
                position: new OpenLayers.Pixel(-638, -629)
            }, {
                size: new OpenLayers.Size(81, 54),
                anchor: new OpenLayers.Bounds(null, 0, 0, null),
                position: new OpenLayers.Pixel(0, -668)
            }]
        },
        "tr": {
            'offset': new OpenLayers.Pixel(-45, 0),
            'padding': new OpenLayers.Bounds(8, 40, 8, 9),
            'blocks': [{
                size: new OpenLayers.Size('auto', 'auto'),
                anchor: new OpenLayers.Bounds(0, 51, 22, 0),
                position: new OpenLayers.Pixel(0, 0)
            }, {
                size: new OpenLayers.Size(22, 'auto'),
                anchor: new OpenLayers.Bounds(null, 50, 0, 0),
                position: new OpenLayers.Pixel(-638, 0)
            }, {
                size: new OpenLayers.Size('auto', 21),
                anchor: new OpenLayers.Bounds(0, 32, 22, null),
                position: new OpenLayers.Pixel(0, -629)
            }, {
                size: new OpenLayers.Size(22, 21),
                anchor: new OpenLayers.Bounds(null, 32, 0, null),
                position: new OpenLayers.Pixel(-638, -629)
            }, {
                size: new OpenLayers.Size(81, 54),
                anchor: new OpenLayers.Bounds(0, 0, null, null),
                position: new OpenLayers.Pixel(-215, -668)
            }]
        },
        "bl": {
            'offset': new OpenLayers.Pixel(45, 0),
            'padding': new OpenLayers.Bounds(8, 9, 8, 40),
            'blocks': [{
                size: new OpenLayers.Size('auto', 'auto'),
                anchor: new OpenLayers.Bounds(0, 21, 22, 32),
                position: new OpenLayers.Pixel(0, 0)
            }, {
                size: new OpenLayers.Size(22, 'auto'),
                anchor: new OpenLayers.Bounds(null, 21, 0, 32),
                position: new OpenLayers.Pixel(-638, 0)
            }, {
                size: new OpenLayers.Size('auto', 21),
                anchor: new OpenLayers.Bounds(0, 0, 22, null),
                position: new OpenLayers.Pixel(0, -629)
            }, {
                size: new OpenLayers.Size(22, 21),
                anchor: new OpenLayers.Bounds(null, 0, 0, null),
                position: new OpenLayers.Pixel(-638, -629)
            }, {
                size: new OpenLayers.Size(81, 54),
                anchor: new OpenLayers.Bounds(null, null, 0, 0),
                position: new OpenLayers.Pixel(-101, -674)
            }]
        },
        "br": {
            'offset': new OpenLayers.Pixel(-44, 0),
            'padding': new OpenLayers.Bounds(8, 9, 8, 40),
            'blocks': [{
                size: new OpenLayers.Size('auto', 'auto'),
                anchor: new OpenLayers.Bounds(0, 21, 22, 32),
                position: new OpenLayers.Pixel(0, 0)
            }, {
                size: new OpenLayers.Size(22, 'auto'),
                anchor: new OpenLayers.Bounds(null, 21, 0, 32),
                position: new OpenLayers.Pixel(-638, 0)
            }, {
                size: new OpenLayers.Size('auto', 21),
                anchor: new OpenLayers.Bounds(0, 0, 22, null),
                position: new OpenLayers.Pixel(0, -629)
            }, {
                size: new OpenLayers.Size(22, 21),
                anchor: new OpenLayers.Bounds(null, 0, 0, null),
                position: new OpenLayers.Pixel(-638, -629)
            }, {
                size: new OpenLayers.Size(81, 54),
                anchor: new OpenLayers.Bounds(0, null, null, 0),
                position: new OpenLayers.Pixel(-311, -674)
            }]
        }
    },
    minSize: new OpenLayers.Size(105, 10),
    maxSize: new OpenLayers.Size(600, 660),
    initialize: function (id, lonlat, contentSize, contentHTML, anchor, closeBox, closeBoxCallback) {
        this.imageSrc = OpenLayers.Util.getImagesLocation() + 'cloud-popup-relative.png';
        OpenLayers.Popup.Framed.prototype.initialize.apply(this, arguments);
        this.contentDiv.className = this.contentDisplayClass;
    },
    destroy: function () {
        OpenLayers.Popup.Framed.prototype.destroy.apply(this, arguments);
    },
    CLASS_NAME: "OpenLayers.Popup.FramedCloud"
});
OpenLayers.Feature = OpenLayers.Class({
    layer: null,
    id: null,
    lonlat: null,
    data: null,
    marker: null,
    popupClass: OpenLayers.Popup.AnchoredBubble,
    popup: null,
    initialize: function (layer, lonlat, data) {
        this.layer = layer;
        this.lonlat = lonlat;
        this.data = (data != null) ? data : {};
        this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_");
    },
    destroy: function () {
        if ((this.layer != null) && (this.layer.map != null)) {
            if (this.popup != null) {
                this.layer.map.removePopup(this.popup);
            }
        }
        this.layer = null;
        this.id = null;
        this.lonlat = null;
        this.data = null;
        if (this.marker != null) {
            this.destroyMarker(this.marker);
            this.marker = null;
        }
        if (this.popup != null) {
            this.destroyPopup(this.popup);
            this.popup = null;
        }
    },
    onScreen: function () {
        var onScreen = false;
        if ((this.layer != null) && (this.layer.map != null)) {
            var screenBounds = this.layer.map.getExtent();
            onScreen = screenBounds.containsLonLat(this.lonlat);
        }
        return onScreen;
    },
    createMarker: function () {
        if (this.lonlat != null) {
            this.marker = new OpenLayers.Marker(this.lonlat, this.data.icon);
        }
        return this.marker;
    },
    destroyMarker: function () {
        this.marker.destroy();
    },
    createPopup: function (closeBox) {
        if (this.lonlat != null) {
            var id = this.id + "_popup";
            var anchor = (this.marker) ? this.marker.icon : null;
            if (!this.popup) {
                this.popup = new this.popupClass(id, this.lonlat, this.data.popupSize, this.data.popupContentHTML, anchor, closeBox);
            }
            if (this.data.overflow != null) {
                this.popup.contentDiv.style.overflow = this.data.overflow;
            }
            this.popup.feature = this;
        }
        return this.popup;
    },
    destroyPopup: function () {
        if (this.popup) {
            this.popup.feature = null;
            this.popup.destroy();
            this.popup = null;
        }
    },
    CLASS_NAME: "OpenLayers.Feature"
});
OpenLayers.State = {
    UNKNOWN: 'Unknown',
    INSERT: 'Insert',
    UPDATE: 'Update',
    DELETE: 'Delete'
};
OpenLayers.Feature.Vector = OpenLayers.Class(OpenLayers.Feature, {
    fid: null,
    geometry: null,
    attributes: null,
    state: null,
    style: null,
    renderIntent: "default",
    initialize: function (geometry, attributes, style) {
        OpenLayers.Feature.prototype.initialize.apply(this, [null, null, attributes]);
        this.lonlat = null;
        this.geometry = geometry ? geometry : null;
        this.state = null;
        this.attributes = {};
        if (attributes) {
            this.attributes = OpenLayers.Util.extend(this.attributes, attributes);
        }
        this.style = style ? style : null;
    },
    destroy: function () {
        if (this.layer) {
            this.layer.removeFeatures(this);
            this.layer = null;
        }
        this.geometry = null;
        OpenLayers.Feature.prototype.destroy.apply(this, arguments);
    },
    clone: function () {
        return new OpenLayers.Feature.Vector(this.geometry ? this.geometry.clone() : null, this.attributes, this.style);
    },
    onScreen: function (boundsOnly) {
        var onScreen = false;
        if (this.layer && this.layer.map) {
            var screenBounds = this.layer.map.getExtent();
            if (boundsOnly) {
                var featureBounds = this.geometry.getBounds();
                onScreen = screenBounds.intersectsBounds(featureBounds);
            } else {
                var screenPoly = screenBounds.toGeometry();
                onScreen = screenPoly.intersects(this.geometry);
            }
        }
        return onScreen;
    },
    createMarker: function () {
        return null;
    },
    destroyMarker: function () {},
    createPopup: function () {
        return null;
    },
    atPoint: function (lonlat, toleranceLon, toleranceLat) {
        var atPoint = false;
        if (this.geometry) {
            atPoint = this.geometry.atPoint(lonlat, toleranceLon, toleranceLat);
        }
        return atPoint;
    },
    destroyPopup: function () {},
    move: function (location) {
        if (!this.layer || !this.geometry.move) {
            return;
        }
        var pixel;
        if (location.CLASS_NAME == "OpenLayers.LonLat") {
            pixel = this.layer.getViewPortPxFromLonLat(location);
        } else {
            pixel = location;
        }
        var lastPixel = this.layer.getViewPortPxFromLonLat(this.geometry.getBounds().getCenterLonLat());
        var res = this.layer.map.getResolution();
        this.geometry.move(res * (pixel.x - lastPixel.x), res * (lastPixel.y - pixel.y));
        this.layer.drawFeature(this);
        return lastPixel;
    },
    toState: function (state) {
        if (state == OpenLayers.State.UPDATE) {
            switch (this.state) {
            case OpenLayers.State.UNKNOWN:
            case OpenLayers.State.DELETE:
                this.state = state;
                break;
            case OpenLayers.State.UPDATE:
            case OpenLayers.State.INSERT:
                break;
            }
        } else if (state == OpenLayers.State.INSERT) {
            switch (this.state) {
            case OpenLayers.State.UNKNOWN:
                break;
            default:
                this.state = state;
                break;
            }
        } else if (state == OpenLayers.State.DELETE) {
            switch (this.state) {
            case OpenLayers.State.INSERT:
                break;
            case OpenLayers.State.DELETE:
                break;
            case OpenLayers.State.UNKNOWN:
            case OpenLayers.State.UPDATE:
                this.state = state;
                break;
            }
        } else if (state == OpenLayers.State.UNKNOWN) {
            this.state = state;
        }
    },
    CLASS_NAME: "OpenLayers.Feature.Vector"
});
OpenLayers.Feature.Vector.style = {
    'default': {
        fillColor: "#ee9900",
        fillOpacity: 0.4,
        hoverFillColor: "white",
        hoverFillOpacity: 0.8,
        strokeColor: "#ee9900",
        strokeOpacity: 1,
        strokeWidth: 1,
        strokeLinecap: "round",
        strokeDashstyle: "solid",
        hoverStrokeColor: "red",
        hoverStrokeOpacity: 1,
        hoverStrokeWidth: 0.2,
        pointRadius: 6,
        hoverPointRadius: 1,
        hoverPointUnit: "%",
        pointerEvents: "visiblePainted",
        cursor: "inherit"
    },
    'select': {
        fillColor: "blue",
        fillOpacity: 0.4,
        hoverFillColor: "white",
        hoverFillOpacity: 0.8,
        strokeColor: "blue",
        strokeOpacity: 1,
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeDashstyle: "solid",
        hoverStrokeColor: "red",
        hoverStrokeOpacity: 1,
        hoverStrokeWidth: 0.2,
        pointRadius: 6,
        hoverPointRadius: 1,
        hoverPointUnit: "%",
        pointerEvents: "visiblePainted",
        cursor: "pointer"
    },
    'temporary': {
        fillColor: "yellow",
        fillOpacity: 0.2,
        hoverFillColor: "white",
        hoverFillOpacity: 0.8,
        strokeColor: "yellow",
        strokeOpacity: 1,
        strokeLinecap: "round",
        strokeWidth: 4,
        strokeDashstyle: "solid",
        hoverStrokeColor: "red",
        hoverStrokeOpacity: 1,
        hoverStrokeWidth: 0.2,
        pointRadius: 6,
        hoverPointRadius: 1,
        hoverPointUnit: "%",
        pointerEvents: "visiblePainted",
        cursor: "inherit"
    }
};
OpenLayers.Handler = OpenLayers.Class({
    id: null,
    control: null,
    map: null,
    keyMask: null,
    active: false,
    evt: null,
    initialize: function (control, callbacks, options) {
        OpenLayers.Util.extend(this, options);
        this.control = control;
        this.callbacks = callbacks;
        if (control.map) {
            this.setMap(control.map);
        }
        OpenLayers.Util.extend(this, options);
        this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_");
    },
    setMap: function (map) {
        this.map = map;
    },
    checkModifiers: function (evt) {
        if (this.keyMask == null) {
            return true;
        }
        var keyModifiers = (evt.shiftKey ? OpenLayers.Handler.MOD_SHIFT : 0) | (evt.ctrlKey ? OpenLayers.Handler.MOD_CTRL : 0) | (evt.altKey ? OpenLayers.Handler.MOD_ALT : 0);
        return (keyModifiers == this.keyMask);
    },
    activate: function () {
        if (this.active) {
            return false;
        }
        var events = OpenLayers.Events.prototype.BROWSER_EVENTS;
        for (var i = 0, len = events.length; i < len; i++) {
            if (this[events[i]]) {
                this.register(events[i], this[events[i]]);
            }
        }
        this.active = true;
        return true;
    },
    deactivate: function () {
        if (!this.active) {
            return false;
        }
        var events = OpenLayers.Events.prototype.BROWSER_EVENTS;
        for (var i = 0, len = events.length; i < len; i++) {
            if (this[events[i]]) {
                this.unregister(events[i], this[events[i]]);
            }
        }
        this.active = false;
        return true;
    },
    callback: function (name, args) {
        if (name && this.callbacks[name]) {
            this.callbacks[name].apply(this.control, args);
        }
    },
    register: function (name, method) {
        this.map.events.registerPriority(name, this, method);
        this.map.events.registerPriority(name, this, this.setEvent);
    },
    unregister: function (name, method) {
        this.map.events.unregister(name, this, method);
        this.map.events.unregister(name, this, this.setEvent);
    },
    setEvent: function (evt) {
        this.evt = evt;
        return true;
    },
    destroy: function () {
        this.deactivate();
        this.control = this.map = null;
    },
    CLASS_NAME: "OpenLayers.Handler"
});
OpenLayers.Handler.MOD_NONE = 0;
OpenLayers.Handler.MOD_SHIFT = 1;
OpenLayers.Handler.MOD_CTRL = 2;
OpenLayers.Handler.MOD_ALT = 4;
OpenLayers.Handler.Click = OpenLayers.Class(OpenLayers.Handler, {
    delay: 300,
    single: true,
    'double': false,
    pixelTolerance: 0,
    stopSingle: false,
    stopDouble: false,
    timerId: null,
    down: null,
    rightclickTimerId: null,
    initialize: function (control, callbacks, options) {
        OpenLayers.Handler.prototype.initialize.apply(this, arguments);
        if (this.pixelTolerance != null) {
            this.mousedown = function (evt) {
                this.down = evt.xy;
                return true;
            };
        }
    },
    mousedown: null,
    mouseup: function (evt) {
        var propagate = true;
        if (this.checkModifiers(evt) && this.control.handleRightClicks && OpenLayers.Event.isRightClick(evt)) {
            propogate = this.rightclick(evt);
        }
        return propagate;
    },
    rightclick: function (evt) {
        if (this.passesTolerance(evt)) {
            if (this.rightclickTimerId != null) {
                this.clearTimer();
                this.callback('dblrightclick', [evt]);
                return !this.stopDouble;
            } else {
                var clickEvent = this['double'] ? OpenLayers.Util.extend({}, evt) : this.callback('rightclick', [evt]);
                var delayedRightCall = OpenLayers.Function.bind(this.delayedRightCall, this, clickEvent);
                this.rightclickTimerId = window.setTimeout(delayedRightCall, this.delay);
            }
        }
        return !this.stopSingle;
    },
    delayedRightCall: function (evt) {
        this.rightclickTimerId = null;
        if (evt) {
            this.callback('rightclick', [evt]);
        }
        return !this.stopSingle;
    },
    dblclick: function (evt) {
        if (this.passesTolerance(evt)) {
            if (this["double"]) {
                this.callback('dblclick', [evt]);
            }
            this.clearTimer();
        }
        return !this.stopDouble;
    },
    click: function (evt) {
        if (this.passesTolerance(evt)) {
            if (this.timerId != null) {
                this.clearTimer();
            } else {
                var clickEvent = this.single ? OpenLayers.Util.extend({}, evt) : null;
                this.timerId = window.setTimeout(OpenLayers.Function.bind(this.delayedCall, this, clickEvent), this.delay);
            }
        }
        return !this.stopSingle;
    },
    passesTolerance: function (evt) {
        var passes = true;
        if (this.pixelTolerance != null && this.down) {
            var dpx = Math.sqrt(Math.pow(this.down.x - evt.xy.x, 2) + Math.pow(this.down.y - evt.xy.y, 2));
            if (dpx > this.pixelTolerance) {
                passes = false;
            }
        }
        return passes;
    },
    clearTimer: function () {
        if (this.timerId != null) {
            window.clearTimeout(this.timerId);
            this.timerId = null;
        }
    },
    delayedCall: function (evt) {
        this.timerId = null;
        if (evt) {
            this.callback('click', [evt]);
        }
    },
    deactivate: function () {
        var deactivated = false;
        if (OpenLayers.Handler.prototype.deactivate.apply(this, arguments)) {
            this.clearTimer();
            this.down = null;
            deactivated = true;
        }
        return deactivated;
    },
    CLASS_NAME: "OpenLayers.Handler.Click"
});
OpenLayers.Handler.Hover = OpenLayers.Class(OpenLayers.Handler, {
    delay: 500,
    pixelTolerance: null,
    stopMove: false,
    px: null,
    timerId: null,
    initialize: function (control, callbacks, options) {
        OpenLayers.Handler.prototype.initialize.apply(this, arguments);
    },
    mousemove: function (evt) {
        if (this.passesTolerance(evt.xy)) {
            this.clearTimer();
            this.callback('move', [evt]);
            this.px = evt.xy;
            evt = OpenLayers.Util.extend({}, evt);
            this.timerId = window.setTimeout(OpenLayers.Function.bind(this.delayedCall, this, evt), this.delay);
        }
        return !this.stopMove;
    },
    mouseout: function (evt) {
        if (OpenLayers.Util.mouseLeft(evt, this.map.div)) {
            this.clearTimer();
            this.callback('move', [evt]);
        }
        return true;
    },
    passesTolerance: function (px) {
        var passes = true;
        if (this.pixelTolerance && this.px) {
            var dpx = Math.sqrt(Math.pow(this.px.x - px.x, 2) + Math.pow(this.px.y - px.y, 2));
            if (dpx < this.pixelTolerance) {
                passes = false;
            }
        }
        return passes;
    },
    clearTimer: function () {
        if (this.timerId != null) {
            window.clearTimeout(this.timerId);
            this.timerId = null;
        }
    },
    delayedCall: function (evt) {
        this.callback('pause', [evt]);
    },
    deactivate: function () {
        var deactivated = false;
        if (OpenLayers.Handler.prototype.deactivate.apply(this, arguments)) {
            this.clearTimer();
            deactivated = true;
        }
        return deactivated;
    },
    CLASS_NAME: "OpenLayers.Handler.Hover"
});
OpenLayers.Handler.Point = OpenLayers.Class(OpenLayers.Handler, {
    point: null,
    layer: null,
    multi: false,
    drawing: false,
    mouseDown: false,
    lastDown: null,
    lastUp: null,
    persist: false,
    layerOptions: null,
    initialize: function (control, callbacks, options) {
        this.style = OpenLayers.Util.extend(OpenLayers.Feature.Vector.style['default'], {});
        OpenLayers.Handler.prototype.initialize.apply(this, arguments);
    },
    activate: function () {
        if (!OpenLayers.Handler.prototype.activate.apply(this, arguments)) {
            return false;
        }
        var options = OpenLayers.Util.extend({
            displayInLayerSwitcher: false,
            calculateInRange: function () {
                return true;
            }
        }, this.layerOptions);
        this.layer = new OpenLayers.Layer.Vector(this.CLASS_NAME, options);
        this.map.addLayer(this.layer);
        return true;
    },
    createFeature: function () {
        this.point = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point());
        this.layer.addFeatures([this.point], {
            silent: true
        });
    },
    deactivate: function () {
        if (!OpenLayers.Handler.prototype.deactivate.apply(this, arguments)) {
            return false;
        }
        if (this.drawing) {
            this.cancel();
        }
        this.destroyFeature();
        if (this.layer.map != null) {
            this.layer.destroy(false);
        }
        this.layer = null;
        return true;
    },
    destroyFeature: function () {
        if (this.layer) {
            this.layer.destroyFeatures();
        }
        this.point = null;
    },
    finalize: function (cancel) {
        var key = cancel ? "cancel" : "done";
        this.drawing = false;
        this.mouseDown = false;
        this.lastDown = null;
        this.lastUp = null;
        this.callback(key, [this.geometryClone()]);
        if (cancel || !this.persist) {
            this.destroyFeature();
        }
    },
    cancel: function () {
        this.finalize(true);
    },
    click: function (evt) {
        OpenLayers.Event.stop(evt);
        return false;
    },
    dblclick: function (evt) {
        OpenLayers.Event.stop(evt);
        return false;
    },
    drawFeature: function () {
        this.layer.drawFeature(this.point, this.style);
    },
    getGeometry: function () {
        var geometry = this.point.geometry;
        if (this.multi) {
            geometry = new OpenLayers.Geometry.MultiPoint([geometry]);
        }
        return geometry;
    },
    geometryClone: function () {
        return this.getGeometry().clone();
    },
    mousedown: function (evt) {
        if (!this.checkModifiers(evt)) {
            return true;
        }
        if (this.lastDown && this.lastDown.equals(evt.xy)) {
            return true;
        }
        if (this.lastDown == null) {
            if (this.persist) {
                this.destroyFeature();
            }
            this.createFeature();
        }
        this.lastDown = evt.xy;
        this.drawing = true;
        var lonlat = this.map.getLonLatFromPixel(evt.xy);
        this.point.geometry.x = lonlat.lon;
        this.point.geometry.y = lonlat.lat;
        this.point.geometry.clearBounds();
        this.drawFeature();
        return false;
    },
    mousemove: function (evt) {
        if (this.drawing) {
            var lonlat = this.map.getLonLatFromPixel(evt.xy);
            this.point.geometry.x = lonlat.lon;
            this.point.geometry.y = lonlat.lat;
            this.point.geometry.clearBounds();
            this.drawFeature();
        }
        return true;
    },
    mouseup: function (evt) {
        if (this.drawing) {
            this.finalize();
            return false;
        } else {
            return true;
        }
    },
    CLASS_NAME: "OpenLayers.Handler.Point"
});
OpenLayers.Handler.Path = OpenLayers.Class(OpenLayers.Handler.Point, {
    line: null,
    freehand: false,
    freehandToggle: 'shiftKey',
    initialize: function (control, callbacks, options) {
        OpenLayers.Handler.Point.prototype.initialize.apply(this, arguments);
    },
    createFeature: function () {
        this.line = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LineString());
        this.point = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point());
        this.layer.addFeatures([this.line, this.point], {
            silent: true
        });
    },
    destroyFeature: function () {
        OpenLayers.Handler.Point.prototype.destroyFeature.apply(this);
        this.line = null;
    },
    destroyPoint: function () {
        if (this.point) {
            this.layer.destroyFeatures([this.point]);
        }
    },
    addPoint: function () {
        this.line.geometry.addComponent(this.point.geometry.clone(), this.line.geometry.components.length);
        this.callback("point", [this.point.geometry, this.getGeometry()]);
    },
    freehandMode: function (evt) {
        return (this.freehandToggle && evt[this.freehandToggle]) ? !this.freehand : this.freehand;
    },
    modifyFeature: function () {
        var index = this.line.geometry.components.length - 1;
        this.line.geometry.components[index].x = this.point.geometry.x;
        this.line.geometry.components[index].y = this.point.geometry.y;
        this.line.geometry.components[index].clearBounds();
    },
    drawFeature: function () {
        this.layer.drawFeature(this.line, this.style);
        this.layer.drawFeature(this.point, this.style);
    },
    getGeometry: function () {
        var geometry = this.line.geometry;
        if (this.multi) {
            geometry = new OpenLayers.Geometry.MultiLineString([geometry]);
        }
        return geometry;
    },
    mousedown: function (evt) {
        if (this.lastDown && this.lastDown.equals(evt.xy)) {
            return false;
        }
        if (this.lastDown == null) {
            if (this.persist) {
                this.destroyFeature();
            }
            this.createFeature();
        }
        this.mouseDown = true;
        this.lastDown = evt.xy;
        var lonlat = this.control.map.getLonLatFromPixel(evt.xy);
        this.point.geometry.x = lonlat.lon;
        this.point.geometry.y = lonlat.lat;
        this.point.geometry.clearBounds();
        if ((this.lastUp == null) || !this.lastUp.equals(evt.xy)) {
            this.addPoint();
        }
        this.drawFeature();
        this.drawing = true;
        return false;
    },
    mousemove: function (evt) {
        if (this.drawing) {
            var lonlat = this.map.getLonLatFromPixel(evt.xy);
            this.point.geometry.x = lonlat.lon;
            this.point.geometry.y = lonlat.lat;
            this.point.geometry.clearBounds();
            if (this.mouseDown && this.freehandMode(evt)) {
                this.addPoint();
            } else {
                this.modifyFeature();
            }
            this.drawFeature();
        }
        return true;
    },
    mouseup: function (evt) {
        this.mouseDown = false;
        if (this.drawing) {
            if (this.freehandMode(evt)) {
                if (this.persist) {
                    this.destroyPoint();
                }
                this.finalize();
            } else {
                if (this.lastUp == null) {
                    this.addPoint();
                }
                this.lastUp = evt.xy;
            }
            return false;
        }
        return true;
    },
    dblclick: function (evt) {
        if (!this.freehandMode(evt)) {
            var index = this.line.geometry.components.length - 1;
            this.line.geometry.removeComponent(this.line.geometry.components[index]);
            if (this.persist) {
                this.destroyPoint();
            }
            this.finalize();
        }
        return false;
    },
    CLASS_NAME: "OpenLayers.Handler.Path"
});
OpenLayers.Handler.Polygon = OpenLayers.Class(OpenLayers.Handler.Path, {
    polygon: null,
    initialize: function (control, callbacks, options) {
        OpenLayers.Handler.Path.prototype.initialize.apply(this, arguments);
    },
    createFeature: function () {
        this.polygon = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Polygon());
        this.line = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LinearRing());
        this.polygon.geometry.addComponent(this.line.geometry);
        this.point = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point());
        this.layer.addFeatures([this.polygon, this.point], {
            silent: true
        });
    },
    destroyFeature: function () {
        OpenLayers.Handler.Path.prototype.destroyFeature.apply(this);
        this.polygon = null;
    },
    modifyFeature: function () {
        var index = this.line.geometry.components.length - 2;
        this.line.geometry.components[index].x = this.point.geometry.x;
        this.line.geometry.components[index].y = this.point.geometry.y;
        this.line.geometry.components[index].clearBounds();
    },
    drawFeature: function () {
        this.layer.drawFeature(this.polygon, this.style);
        this.layer.drawFeature(this.point, this.style);
    },
    getGeometry: function () {
        var geometry = this.polygon.geometry;
        if (this.multi) {
            geometry = new OpenLayers.Geometry.MultiPolygon([geometry]);
        }
        return geometry;
    },
    dblclick: function (evt) {
        if (!this.freehandMode(evt)) {
            var index = this.line.geometry.components.length - 2;
            this.line.geometry.removeComponent(this.line.geometry.components[index]);
            if (this.persist) {
                this.destroyPoint();
            }
            this.finalize();
        }
        return false;
    },
    CLASS_NAME: "OpenLayers.Handler.Polygon"
});
OpenLayers.Handler.Feature = OpenLayers.Class(OpenLayers.Handler, {
    EVENTMAP: {
        'click': {
            'in': 'click',
            'out': 'clickout'
        },
        'mousemove': {
            'in': 'over',
            'out': 'out'
        },
        'dblclick': {
            'in': 'dblclick',
            'out': null
        },
        'mousedown': {
            'in': null,
            'out': null
        },
        'mouseup': {
            'in': null,
            'out': null
        }
    },
    feature: null,
    lastFeature: null,
    down: null,
    up: null,
    clickoutTolerance: 4,
    geometryTypes: null,
    stopClick: true,
    stopDown: true,
    stopUp: false,
    initialize: function (control, layer, callbacks, options) {
        OpenLayers.Handler.prototype.initialize.apply(this, [control, callbacks, options]);
        this.layer = layer;
    },
    mousedown: function (evt) {
        this.down = evt.xy;
        return this.handle(evt) ? !this.stopDown : true;
    },
    mouseup: function (evt) {
        this.up = evt.xy;
        return this.handle(evt) ? !this.stopUp : true;
    },
    click: function (evt) {
        return this.handle(evt) ? !this.stopClick : true;
    },
    mousemove: function (evt) {
        if (!this.callbacks['over'] && !this.callbacks['out']) {
            return true;
        }
        this.handle(evt);
        return true;
    },
    dblclick: function (evt) {
        return !this.handle(evt);
    },
    geometryTypeMatches: function (feature) {
        return this.geometryTypes == null || OpenLayers.Util.indexOf(this.geometryTypes, feature.geometry.CLASS_NAME) > -1;
    },
    handle: function (evt) {
        var type = evt.type;
        var handled = false;
        var previouslyIn = !! (this.feature);
        var click = (type == "click" || type == "dblclick");
        this.feature = this.layer.getFeatureFromEvent(evt);
        if (this.feature) {
            var inNew = (this.feature != this.lastFeature);
            if (this.geometryTypeMatches(this.feature)) {
                if (previouslyIn && inNew) {
                    this.triggerCallback(type, 'out', [this.lastFeature]);
                    this.triggerCallback(type, 'in', [this.feature]);
                } else if (!previouslyIn || click) {
                    this.triggerCallback(type, 'in', [this.feature]);
                }
                this.lastFeature = this.feature;
                handled = true;
            } else {
                if (previouslyIn && inNew || (click && this.lastFeature)) {
                    this.triggerCallback(type, 'out', [this.lastFeature]);
                }
                this.feature = null;
            }
        } else {
            if (previouslyIn || (click && this.lastFeature)) {
                this.triggerCallback(type, 'out', [this.lastFeature]);
            }
        }
        return handled;
    },
    triggerCallback: function (type, mode, args) {
        var key = this.EVENTMAP[type][mode];
        if (key) {
            if (type == 'click' && mode == 'out' && this.up && this.down) {
                var dpx = Math.sqrt(Math.pow(this.up.x - this.down.x, 2) + Math.pow(this.up.y - this.down.y, 2));
                if (dpx <= this.clickoutTolerance) {
                    this.callback(key, args);
                }
            } else {
                this.callback(key, args);
            }
        }
    },
    activate: function () {
        var activated = false;
        if (OpenLayers.Handler.prototype.activate.apply(this, arguments)) {
            this.moveLayerToTop();
            this.map.events.on({
                "removelayer": this.handleMapEvents,
                "changelayer": this.handleMapEvents,
                scope: this
            });
            activated = true;
        }
        return activated;
    },
    deactivate: function () {
        var deactivated = false;
        if (OpenLayers.Handler.prototype.deactivate.apply(this, arguments)) {
            this.moveLayerBack();
            this.feature = null;
            this.lastFeature = null;
            this.down = null;
            this.up = null;
            this.map.events.un({
                "removelayer": this.handleMapEvents,
                "changelayer": this.handleMapEvents,
                scope: this
            });
            deactivated = true;
        }
        return deactivated;
    },
    handleMapEvents: function (evt) {
        if (!evt.property || evt.property == "order") {
            this.moveLayerToTop();
        }
    },
    moveLayerToTop: function () {
        var index = Math.max(this.map.Z_INDEX_BASE['Feature'] - 1, this.layer.getZIndex()) + 1;
        this.layer.setZIndex(index);
    },
    moveLayerBack: function () {
        var index = this.layer.getZIndex() - 1;
        if (index >= this.map.Z_INDEX_BASE['Feature']) {
            this.layer.setZIndex(index);
        } else {
            this.map.setLayerZIndex(this.layer, this.map.getLayerIndex(this.layer));
        }
    },
    CLASS_NAME: "OpenLayers.Handler.Feature"
});
OpenLayers.Handler.Drag = OpenLayers.Class(OpenLayers.Handler, {
    started: false,
    stopDown: true,
    dragging: false,
    last: null,
    start: null,
    oldOnselectstart: null,
    interval: 0,
    timeoutId: null,
    initialize: function (control, callbacks, options) {
        OpenLayers.Handler.prototype.initialize.apply(this, arguments);
    },
    down: function (evt) {},
    move: function (evt) {},
    up: function (evt) {},
    out: function (evt) {},
    mousedown: function (evt) {
        var propagate = true;
        this.dragging = false;
        if (this.checkModifiers(evt) && OpenLayers.Event.isLeftClick(evt)) {
            this.started = true;
            this.start = evt.xy;
            this.last = evt.xy;
            this.map.div.style.cursor = "url(\"http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/closedhand.cur\"), move";
            this.down(evt);
            this.callback("down", [evt.xy]);
            OpenLayers.Event.stop(evt);
            if (!this.oldOnselectstart) {
                this.oldOnselectstart = (document.onselectstart) ? document.onselectstart : function () {
                    return true;
                };
                document.onselectstart = function () {
                    return false;
                };
            }
            propagate = !this.stopDown;
        } else {
            this.started = false;
            this.start = null;
            this.last = null;
        }
        return propagate;
    },
    mousemove: function (evt) {
        if (this.started && !this.timeoutId && (evt.xy.x != this.last.x || evt.xy.y != this.last.y)) {
            if (this.interval > 0) {
                this.timeoutId = setTimeout(OpenLayers.Function.bind(this.removeTimeout, this), this.interval);
            }
            this.dragging = true;
            this.move(evt);
            this.callback("move", [evt.xy]);
            if (!this.oldOnselectstart) {
                this.oldOnselectstart = document.onselectstart;
                document.onselectstart = function () {
                    return false;
                };
            }
            this.last = this.evt.xy;
        }
        return true;
    },
    removeTimeout: function () {
        this.timeoutId = null;
    },
    mouseup: function (evt) {
        if (this.started) {
            var dragged = (this.start != this.last);
            this.started = false;
            this.dragging = false;
            this.map.div.style.cursor = "";
            this.up(evt);
            this.callback("up", [evt.xy]);
            if (dragged) {
                this.callback("done", [evt.xy]);
            }
            document.onselectstart = this.oldOnselectstart;
        }
        return true;
    },
    mouseout: function (evt) {
        if (this.started && OpenLayers.Util.mouseLeft(evt, this.map.div)) {
            var dragged = (this.start != this.last);
            this.started = false;
            this.dragging = false;
            this.map.div.style.cursor = "";
            this.out(evt);
            this.callback("out", []);
            if (dragged) {
                this.callback("done", [evt.xy]);
            }
            if (document.onselectstart) {
                document.onselectstart = this.oldOnselectstart;
            }
        }
        return true;
    },
    click: function (evt) {
        return (this.start == this.last);
    },
    activate: function () {
        var activated = false;
        if (OpenLayers.Handler.prototype.activate.apply(this, arguments)) {
            this.dragging = false;
            activated = true;
        }
        return activated;
    },
    deactivate: function () {
        var deactivated = false;
        if (OpenLayers.Handler.prototype.deactivate.apply(this, arguments)) {
            this.started = false;
            this.dragging = false;
            this.start = null;
            this.last = null;
            deactivated = true;
        }
        return deactivated;
    },
    CLASS_NAME: "OpenLayers.Handler.Drag"
});
OpenLayers.Handler.RegularPolygon = OpenLayers.Class(OpenLayers.Handler.Drag, {
    sides: 4,
    radius: null,
    snapAngle: null,
    snapToggle: 'shiftKey',
    persist: false,
    irregular: false,
    angle: null,
    fixedRadius: false,
    feature: null,
    layer: null,
    origin: null,
    initialize: function (control, callbacks, options) {
        this.style = OpenLayers.Util.extend(OpenLayers.Feature.Vector.style['default'], {});
        OpenLayers.Handler.prototype.initialize.apply(this, [control, callbacks, options]);
        this.options = (options) ? options : new Object();
    },
    setOptions: function (newOptions) {
        OpenLayers.Util.extend(this.options, newOptions);
        OpenLayers.Util.extend(this, newOptions);
    },
    activate: function () {
        var activated = false;
        if (OpenLayers.Handler.prototype.activate.apply(this, arguments)) {
            var options = {
                displayInLayerSwitcher: false,
                calculateInRange: function () {
                    return true;
                }
            };
            this.layer = new OpenLayers.Layer.Vector(this.CLASS_NAME, options);
            this.map.addLayer(this.layer);
            activated = true;
        }
        return activated;
    },
    deactivate: function () {
        var deactivated = false;
        if (OpenLayers.Handler.Drag.prototype.deactivate.apply(this, arguments)) {
            if (this.dragging) {
                this.cancel();
            }
            if (this.layer.map != null) {
                this.layer.destroy(false);
                if (this.feature) {
                    this.feature.destroy();
                }
            }
            this.layer = null;
            this.feature = null;
            deactivated = true;
        }
        return deactivated;
    },
    down: function (evt) {
        this.fixedRadius = !! (this.radius);
        var maploc = this.map.getLonLatFromPixel(evt.xy);
        this.origin = new OpenLayers.Geometry.Point(maploc.lon, maploc.lat);
        if (!this.fixedRadius || this.irregular) {
            this.radius = this.map.getResolution();
        }
        if (this.persist) {
            this.clear();
        }
        this.feature = new OpenLayers.Feature.Vector();
        this.createGeometry();
        this.layer.addFeatures([this.feature], {
            silent: true
        });
        this.layer.drawFeature(this.feature, this.style);
    },
    move: function (evt) {
        var maploc = this.map.getLonLatFromPixel(evt.xy);
        var point = new OpenLayers.Geometry.Point(maploc.lon, maploc.lat);
        if (this.irregular) {
            var ry = Math.sqrt(2) * Math.abs(point.y - this.origin.y) / 2;
            this.radius = Math.max(this.map.getResolution() / 2, ry);
        } else if (this.fixedRadius) {
            this.origin = point;
        } else {
            this.calculateAngle(point, evt);
            this.radius = Math.max(this.map.getResolution() / 2, point.distanceTo(this.origin));
        }
        this.modifyGeometry();
        if (this.irregular) {
            var dx = point.x - this.origin.x;
            var dy = point.y - this.origin.y;
            var ratio;
            if (dy == 0) {
                ratio = dx / (this.radius * Math.sqrt(2));
            } else {
                ratio = dx / dy;
            }
            this.feature.geometry.resize(1, this.origin, ratio);
            this.feature.geometry.move(dx / 2, dy / 2);
        }
        this.layer.drawFeature(this.feature, this.style);
    },
    up: function (evt) {
        this.finalize();
    },
    out: function (evt) {
        this.finalize();
    },
    createGeometry: function () {
        this.angle = Math.PI * ((1 / this.sides) - (1 / 2));
        if (this.snapAngle) {
            this.angle += this.snapAngle * (Math.PI / 180);
        }
        this.feature.geometry = OpenLayers.Geometry.Polygon.createRegularPolygon(this.origin, this.radius, this.sides, this.snapAngle);
    },
    modifyGeometry: function () {
        var angle, dx, dy, point;
        var ring = this.feature.geometry.components[0];
        if (ring.components.length != (this.sides + 1)) {
            this.createGeometry();
            ring = this.feature.geometry.components[0];
        }
        for (var i = 0; i < this.sides; ++i) {
            point = ring.components[i];
            angle = this.angle + (i * 2 * Math.PI / this.sides);
            point.x = this.origin.x + (this.radius * Math.cos(angle));
            point.y = this.origin.y + (this.radius * Math.sin(angle));
            point.clearBounds();
        }
    },
    calculateAngle: function (point, evt) {
        var alpha = Math.atan2(point.y - this.origin.y, point.x - this.origin.x);
        if (this.snapAngle && (this.snapToggle && !evt[this.snapToggle])) {
            var snapAngleRad = (Math.PI / 180) * this.snapAngle;
            this.angle = Math.round(alpha / snapAngleRad) * snapAngleRad;
        } else {
            this.angle = alpha;
        }
    },
    cancel: function () {
        this.callback("cancel", null);
        this.finalize();
    },
    finalize: function () {
        this.origin = null;
        this.radius = this.options.radius;
    },
    clear: function () {
        this.layer.renderer.clear();
        this.layer.destroyFeatures();
    },
    callback: function (name, args) {
        if (this.callbacks[name]) {
            this.callbacks[name].apply(this.control, [this.feature.geometry.clone()]);
        }
        if (!this.persist && (name == "done" || name == "cancel")) {
            this.clear();
        }
    },
    CLASS_NAME: "OpenLayers.Handler.RegularPolygon"
});
OpenLayers.Handler.Box = OpenLayers.Class(OpenLayers.Handler, {
    dragHandler: null,
    boxDivClassName: 'olHandlerBoxZoomBox',
    boxCharacteristics: null,
    initialize: function (control, callbacks, options) {
        OpenLayers.Handler.prototype.initialize.apply(this, arguments);
        var callbacks = {
            "down": this.startBox,
            "move": this.moveBox,
            "out": this.removeBox,
            "up": this.endBox
        };
        this.dragHandler = new OpenLayers.Handler.Drag(this, callbacks, {
            keyMask: this.keyMask
        });
    },
    setMap: function (map) {
        OpenLayers.Handler.prototype.setMap.apply(this, arguments);
        if (this.dragHandler) {
            this.dragHandler.setMap(map);
        }
    },
    startBox: function (xy) {
        this.zoomBox = OpenLayers.Util.createDiv('zoomBox', this.dragHandler.start);
        this.zoomBox.className = this.boxDivClassName;
        this.zoomBox.style.zIndex = this.map.Z_INDEX_BASE["Popup"] - 1;
        this.map.viewPortDiv.appendChild(this.zoomBox);
        this.map.div.style.cursor = "crosshair";
    },
    moveBox: function (xy) {
        var startX = this.dragHandler.start.x;
        var startY = this.dragHandler.start.y;
        var deltaX = Math.abs(startX - xy.x);
        var deltaY = Math.abs(startY - xy.y);
        this.zoomBox.style.width = Math.max(1, deltaX) + "px";
        this.zoomBox.style.height = Math.max(1, deltaY) + "px";
        this.zoomBox.style.left = xy.x < startX ? xy.x + "px" : startX + "px";
        this.zoomBox.style.top = xy.y < startY ? xy.y + "px" : startY + "px";
        var box = this.getBoxCharacteristics(deltaX, deltaY);
        if (box.newBoxModel) {
            if (xy.x > startX) {
                this.zoomBox.style.width = Math.max(1, deltaX - box.xOffset) + "px";
            }
            if (xy.y > startY) {
                this.zoomBox.style.height = Math.max(1, deltaY - box.yOffset) + "px";
            }
        }
    },
    endBox: function (end) {
        var result;
        if (Math.abs(this.dragHandler.start.x - end.x) > 5 || Math.abs(this.dragHandler.start.y - end.y) > 5) {
            var start = this.dragHandler.start;
            var top = Math.min(start.y, end.y);
            var bottom = Math.max(start.y, end.y);
            var left = Math.min(start.x, end.x);
            var right = Math.max(start.x, end.x);
            result = new OpenLayers.Bounds(left, bottom, right, top);
        } else {
            result = this.dragHandler.start.clone();
        }
        this.removeBox();
        this.map.div.style.cursor = "";
        this.callback("done", [result]);
    },
    removeBox: function () {
        this.map.viewPortDiv.removeChild(this.zoomBox);
        this.zoomBox = null;
        this.boxCharacteristics = null;
    },
    activate: function () {
        if (OpenLayers.Handler.prototype.activate.apply(this, arguments)) {
            this.dragHandler.activate();
            return true;
        } else {
            return false;
        }
    },
    deactivate: function () {
        if (OpenLayers.Handler.prototype.deactivate.apply(this, arguments)) {
            this.dragHandler.deactivate();
            return true;
        } else {
            return false;
        }
    },
    getBoxCharacteristics: function (dx, dy) {
        if (!this.boxCharacteristics) {
            var xOffset = parseInt(OpenLayers.Element.getStyle(this.zoomBox, "border-left-width")) + parseInt(OpenLayers.Element.getStyle(this.zoomBox, "border-right-width")) + 1;
            var yOffset = parseInt(OpenLayers.Element.getStyle(this.zoomBox, "border-top-width")) + parseInt(OpenLayers.Element.getStyle(this.zoomBox, "border-bottom-width")) + 1;
            var newBoxModel = OpenLayers.Util.getBrowserName() == "msie" ? document.compatMode != "BackCompat" : true;
            this.boxCharacteristics = {
                xOffset: xOffset,
                yOffset: yOffset,
                newBoxModel: newBoxModel
            };
        }
        return this.boxCharacteristics;
    },
    CLASS_NAME: "OpenLayers.Handler.Box"
});
OpenLayers.Handler.MouseWheel = OpenLayers.Class(OpenLayers.Handler, {
    wheelListener: null,
    mousePosition: null,
    initialize: function (control, callbacks, options) {
        OpenLayers.Handler.prototype.initialize.apply(this, arguments);
        this.wheelListener = OpenLayers.Function.bindAsEventListener(this.onWheelEvent, this);
    },
    destroy: function () {
        OpenLayers.Handler.prototype.destroy.apply(this, arguments);
        this.wheelListener = null;
    },
    onWheelEvent: function (e) {
        if (!this.map || !this.checkModifiers(e)) {
            return;
        }
        var overScrollableDiv = false;
        var overLayerDiv = false;
        var overMapDiv = false;
        var elem = OpenLayers.Event.element(e);
        while ((elem != null) && !overMapDiv && !overScrollableDiv) {
            if (!overScrollableDiv) {
                try {
                    if (elem.currentStyle) {
                        overflow = elem.currentStyle["overflow"];
                    } else {
                        var style = document.defaultView.getComputedStyle(elem, null);
                        var overflow = style.getPropertyValue("overflow");
                    }
                    overScrollableDiv = (overflow && (overflow == "auto") || (overflow == "scroll"));
                } catch (err) {}
            }
            if (!overLayerDiv) {
                for (var i = 0, len = this.map.layers.length; i < len; i++) {
                    if (elem == this.map.layers[i].div || elem == this.map.layers[i].pane) {
                        overLayerDiv = true;
                        break;
                    }
                }
            }
            overMapDiv = (elem == this.map.div);
            elem = elem.parentNode;
        }
        if (!overScrollableDiv && overMapDiv) {
            if (overLayerDiv) {
                this.wheelZoom(e);
            }
            OpenLayers.Event.stop(e);
        }
    },
    wheelZoom: function (e) {
        var delta = 0;
        if (!e) {
            e = window.event;
        }
        if (e.wheelDelta) {
            delta = e.wheelDelta / 120;
            if (window.opera && window.opera.version() < 9.2) {
                delta = -delta;
            }
        } else if (e.detail) {
            delta = -e.detail / 3;
        }
        if (delta) {
            if (this.mousePosition) {
                e.xy = this.mousePosition;
            }
            if (!e.xy) {
                e.xy = this.map.getPixelFromLonLat(this.map.getCenter());
            }
            if (delta < 0) {
                this.callback("down", [e, delta]);
            } else {
                this.callback("up", [e, delta]);
            }
        }
    },
    mousemove: function (evt) {
        this.mousePosition = evt.xy;
    },
    activate: function (evt) {
        if (OpenLayers.Handler.prototype.activate.apply(this, arguments)) {
            var wheelListener = this.wheelListener;
            OpenLayers.Event.observe(window, "DOMMouseScroll", wheelListener);
            OpenLayers.Event.observe(window, "mousewheel", wheelListener);
            OpenLayers.Event.observe(document, "mousewheel", wheelListener);
            return true;
        } else {
            return false;
        }
    },
    deactivate: function (evt) {
        if (OpenLayers.Handler.prototype.deactivate.apply(this, arguments)) {
            var wheelListener = this.wheelListener;
            OpenLayers.Event.stopObserving(window, "DOMMouseScroll", wheelListener);
            OpenLayers.Event.stopObserving(window, "mousewheel", wheelListener);
            OpenLayers.Event.stopObserving(document, "mousewheel", wheelListener);
            return true;
        } else {
            return false;
        }
    },
    CLASS_NAME: "OpenLayers.Handler.MouseWheel"
});
OpenLayers.Handler.Keyboard = OpenLayers.Class(OpenLayers.Handler, {
    KEY_EVENTS: ["keydown", "keyup"],
    eventListener: null,
    initialize: function (control, callbacks, options) {
        OpenLayers.Handler.prototype.initialize.apply(this, arguments);
        this.eventListener = OpenLayers.Function.bindAsEventListener(this.handleKeyEvent, this);
    },
    destroy: function () {
        this.deactivate();
        this.eventListener = null;
        OpenLayers.Handler.prototype.destroy.apply(this, arguments);
    },
    activate: function () {
        if (OpenLayers.Handler.prototype.activate.apply(this, arguments)) {
            for (var i = 0, len = this.KEY_EVENTS.length; i < len; i++) {
                OpenLayers.Event.observe(document, this.KEY_EVENTS[i], this.eventListener);
            }
            return true;
        } else {
            return false;
        }
    },
    deactivate: function () {
        var deactivated = false;
        if (OpenLayers.Handler.prototype.deactivate.apply(this, arguments)) {
            for (var i = 0, len = this.KEY_EVENTS.length; i < len; i++) {
                OpenLayers.Event.stopObserving(document, this.KEY_EVENTS[i], this.eventListener);
            }
            deactivated = true;
        }
        return deactivated;
    },
    handleKeyEvent: function (evt) {
        if (this.checkModifiers(evt)) {
            this.callback(evt.type, [evt]);
        }
    },
    CLASS_NAME: "OpenLayers.Handler.Keyboard"
});
OpenLayers.Control = OpenLayers.Class({
    id: null,
    map: null,
    div: null,
    type: null,
    allowSelection: false,
    displayClass: "",
    title: "",
    active: null,
    handler: null,
    eventListeners: null,
    events: null,
    EVENT_TYPES: ["activate", "deactivate"],
    initialize: function (options) {
        this.displayClass = this.CLASS_NAME.replace("OpenLayers.", "ol").replace(/\./g, "");
        OpenLayers.Util.extend(this, options);
        this.events = new OpenLayers.Events(this, null, this.EVENT_TYPES);
        if (this.eventListeners instanceof Object) {
            this.events.on(this.eventListeners);
        }
        if (this.id == null) {
            this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_");
        }
    },
    destroy: function () {
        if (this.events) {
            if (this.eventListeners) {
                this.events.un(this.eventListeners);
            }
            this.events.destroy();
            this.events = null;
        }
        this.eventListeners = null;
        if (this.handler) {
            this.handler.destroy();
            this.handler = null;
        }
        if (this.handlers) {
            for (var key in this.handlers) {
                if (this.handlers.hasOwnProperty(key) && typeof this.handlers[key].destroy == "function") {
                    this.handlers[key].destroy();
                }
            }
            this.handlers = null;
        }
        if (this.map) {
            this.map.removeControl(this);
            this.map = null;
        }
    },
    setMap: function (map) {
        this.map = map;
        if (this.handler) {
            this.handler.setMap(map);
        }
    },
    draw: function (px) {
        if (this.div == null) {
            this.div = OpenLayers.Util.createDiv(this.id);
            this.div.className = this.displayClass;
            if (!this.allowSelection) {
                this.div.className += " olControlNoSelect";
                this.div.setAttribute("unselectable", "on", 0);
                this.div.onselectstart = function () {
                    return (false);
                };
            }
            if (this.title != "") {
                this.div.title = this.title;
            }
        }
        if (px != null) {
            this.position = px.clone();
        }
        this.moveTo(this.position);
        return this.div;
    },
    moveTo: function (px) {
        if ((px != null) && (this.div != null)) {
            this.div.style.left = px.x + "px";
            this.div.style.top = px.y + "px";
        }
    },
    activate: function () {
        if (this.active) {
            return false;
        }
        if (this.handler) {
            this.handler.activate();
        }
        this.active = true;
        this.events.triggerEvent("activate");
        return true;
    },
    deactivate: function () {
        if (this.active) {
            if (this.handler) {
                this.handler.deactivate();
            }
            this.active = false;
            this.events.triggerEvent("deactivate");
            return true;
        }
        return false;
    },
    CLASS_NAME: "OpenLayers.Control"
});
OpenLayers.Control.TYPE_BUTTON = 1;
OpenLayers.Control.TYPE_TOGGLE = 2;
OpenLayers.Control.TYPE_TOOL = 3;
OpenLayers.Control.ZoomBox = OpenLayers.Class(OpenLayers.Control, {
    type: OpenLayers.Control.TYPE_TOOL,
    out: false,
    draw: function () {
        this.handler = new OpenLayers.Handler.Box(this, {
            done: this.zoomBox
        }, {
            keyMask: this.keyMask
        });
    },
    zoomBox: function (position) {
        if (position instanceof OpenLayers.Bounds) {
            if (!this.out) {
                var minXY = this.map.getLonLatFromPixel(new OpenLayers.Pixel(position.left, position.bottom));
                var maxXY = this.map.getLonLatFromPixel(new OpenLayers.Pixel(position.right, position.top));
                var bounds = new OpenLayers.Bounds(minXY.lon, minXY.lat, maxXY.lon, maxXY.lat);
            } else {
                var pixWidth = Math.abs(position.right - position.left);
                var pixHeight = Math.abs(position.top - position.bottom);
                var zoomFactor = Math.min((this.map.size.h / pixHeight), (this.map.size.w / pixWidth));
                var extent = this.map.getExtent();
                var center = this.map.getLonLatFromPixel(position.getCenterPixel());
                var xmin = center.lon - (extent.getWidth() / 2) * zoomFactor;
                var xmax = center.lon + (extent.getWidth() / 2) * zoomFactor;
                var ymin = center.lat - (extent.getHeight() / 2) * zoomFactor;
                var ymax = center.lat + (extent.getHeight() / 2) * zoomFactor;
                var bounds = new OpenLayers.Bounds(xmin, ymin, xmax, ymax);
            }
            this.map.zoomToExtent(bounds);
        } else {
            if (!this.out) {
                this.map.setCenter(this.map.getLonLatFromPixel(position), this.map.getZoom() + 1);
            } else {
                this.map.setCenter(this.map.getLonLatFromPixel(position), this.map.getZoom() - 1);
            }
        }
    },
    CLASS_NAME: "OpenLayers.Control.ZoomBox"
});
OpenLayers.Control.DragPan = OpenLayers.Class(OpenLayers.Control, {
    type: OpenLayers.Control.TYPE_TOOL,
    panned: false,
    interval: 25,
    draw: function () {
        this.handler = new OpenLayers.Handler.Drag(this, {
            "move": this.panMap,
            "done": this.panMapDone
        }, {
            interval: this.interval
        });
    },
    panMap: function (xy) {
        this.panned = true;
        this.map.pan(this.handler.last.x - xy.x, this.handler.last.y - xy.y, {
            dragging: this.handler.dragging,
            animate: false
        });
    },
    panMapDone: function (xy) {
        if (this.panned) {
            this.panMap(xy);
            this.panned = false;
        }
    },
    CLASS_NAME: "OpenLayers.Control.DragPan"
});
OpenLayers.Control.Navigation = OpenLayers.Class(OpenLayers.Control, {
    dragPan: null,
    dragPanOptions: null,
    zoomBox: null,
    zoomWheelEnabled: true,
    handleRightClicks: false,
    initialize: function (options) {
        this.handlers = {};
        OpenLayers.Control.prototype.initialize.apply(this, arguments);
    },
    destroy: function () {
        this.deactivate();
        if (this.dragPan) {
            this.dragPan.destroy();
        }
        this.dragPan = null;
        if (this.zoomBox) {
            this.zoomBox.destroy();
        }
        this.zoomBox = null;
        OpenLayers.Control.prototype.destroy.apply(this, arguments);
    },
    activate: function () {
        this.dragPan.activate();
        if (this.zoomWheelEnabled) {
            this.handlers.wheel.activate();
        }
        this.handlers.click.activate();
        this.zoomBox.activate();
        return OpenLayers.Control.prototype.activate.apply(this, arguments);
    },
    deactivate: function () {
        this.zoomBox.deactivate();
        this.dragPan.deactivate();
        this.handlers.click.deactivate();
        this.handlers.wheel.deactivate();
        return OpenLayers.Control.prototype.deactivate.apply(this, arguments);
    },
    draw: function () {
        if (this.handleRightClicks) {
            this.map.div.oncontextmenu = function () {
                return false;
            };
        }
        var clickCallbacks = {
            'dblclick': this.defaultDblClick,
            'dblrightclick': this.defaultDblRightClick
        };
        var clickOptions = {
            'double': true,
            'stopDouble': true
        };
        this.handlers.click = new OpenLayers.Handler.Click(this, clickCallbacks, clickOptions);
        this.dragPan = new OpenLayers.Control.DragPan(OpenLayers.Util.extend({
            map: this.map
        }, this.dragPanOptions));
        this.zoomBox = new OpenLayers.Control.ZoomBox({
            map: this.map,
            keyMask: OpenLayers.Handler.MOD_SHIFT
        });
        this.dragPan.draw();
        this.zoomBox.draw();
        this.handlers.wheel = new OpenLayers.Handler.MouseWheel(this, {
            "up": this.wheelUp,
            "down": this.wheelDown
        });
        this.activate();
    },
    defaultDblClick: function (evt) {
        var newCenter = this.map.getLonLatFromViewPortPx(evt.xy);
        this.map.setCenter(newCenter, this.map.zoom + 1);
    },
    defaultDblRightClick: function (evt) {
        var newCenter = this.map.getLonLatFromViewPortPx(evt.xy);
        this.map.setCenter(newCenter, this.map.zoom - 1);
    },
    wheelChange: function (evt, deltaZ) {
        var newZoom = this.map.getZoom() + deltaZ;
        if (!this.map.isValidZoomLevel(newZoom)) {
            return;
        }
        var size = this.map.getSize();
        var deltaX = size.w / 2 - evt.xy.x;
        var deltaY = evt.xy.y - size.h / 2;
        var newRes = this.map.baseLayer.getResolutionForZoom(newZoom);
        var zoomPoint = this.map.getLonLatFromPixel(evt.xy);
        var newCenter = new OpenLayers.LonLat(zoomPoint.lon + deltaX * newRes, zoomPoint.lat + deltaY * newRes);
        this.map.setCenter(newCenter, newZoom);
    },
    wheelUp: function (evt) {
        this.wheelChange(evt, 1);
    },
    wheelDown: function (evt) {
        this.wheelChange(evt, -1);
    },
    disableZoomWheel: function () {
        this.zoomWheelEnabled = false;
        this.handlers.wheel.deactivate();
    },
    enableZoomWheel: function () {
        this.zoomWheelEnabled = true;
        if (this.active) {
            this.handlers.wheel.activate();
        }
    },
    CLASS_NAME: "OpenLayers.Control.Navigation"
});
OpenLayers.Control.KeyboardDefaults = OpenLayers.Class(OpenLayers.Control, {
    slideFactor: 200,
    initialize: function () {
        OpenLayers.Control.prototype.initialize.apply(this, arguments);
    },
    destroy: function () {
        if (this.handler) {
            this.handler.destroy();
        }
        this.handler = null;
        OpenLayers.Control.prototype.destroy.apply(this, arguments);
    },
    draw: function () {
        this.handler = new OpenLayers.Handler.Keyboard(this, {
            "keydown": this.defaultKeyPress
        });
        this.activate();
    },
    defaultKeyPress: function (evt) {
        switch (evt.keyCode) {
        case OpenLayers.Event.KEY_LEFT:
            this.map.pan(-this.slideFactor, 0);
            break;
        case OpenLayers.Event.KEY_RIGHT:
            this.map.pan(this.slideFactor, 0);
            break;
        case OpenLayers.Event.KEY_UP:
            this.map.pan(0, -this.slideFactor);
            break;
        case OpenLayers.Event.KEY_DOWN:
            this.map.pan(0, this.slideFactor);
            break;
        case 33:
            var size = this.map.getSize();
            this.map.pan(0, -0.75 * size.h);
            break;
        case 34:
            var size = this.map.getSize();
            this.map.pan(0, 0.75 * size.h);
            break;
        case 35:
            var size = this.map.getSize();
            this.map.pan(0.75 * size.w, 0);
            break;
        case 36:
            var size = this.map.getSize();
            this.map.pan(-0.75 * size.w, 0);
            break;
        case 43:
        case 61:
        case 187:
        case 107:
            this.map.zoomIn();
            break;
        case 45:
        case 109:
        case 189:
        case 95:
            this.map.zoomOut();
            break;
        }
    },
    CLASS_NAME: "OpenLayers.Control.KeyboardDefaults"
});
OpenLayers.Geometry = OpenLayers.Class({
    id: null,
    parent: null,
    bounds: null,
    initialize: function () {
        this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_");
    },
    destroy: function () {
        this.id = null;
        this.bounds = null;
    },
    clone: function () {
        return new OpenLayers.Geometry();
    },
    setBounds: function (bounds) {
        if (bounds) {
            this.bounds = bounds.clone();
        }
    },
    clearBounds: function () {
        this.bounds = null;
        if (this.parent) {
            this.parent.clearBounds();
        }
    },
    extendBounds: function (newBounds) {
        var bounds = this.getBounds();
        if (!bounds) {
            this.setBounds(newBounds);
        } else {
            this.bounds.extend(newBounds);
        }
    },
    getBounds: function () {
        if (this.bounds == null) {
            this.calculateBounds();
        }
        return this.bounds;
    },
    calculateBounds: function () {},
    atPoint: function (lonlat, toleranceLon, toleranceLat) {
        var atPoint = false;
        var bounds = this.getBounds();
        if ((bounds != null) && (lonlat != null)) {
            var dX = (toleranceLon != null) ? toleranceLon : 0;
            var dY = (toleranceLat != null) ? toleranceLat : 0;
            var toleranceBounds = new OpenLayers.Bounds(this.bounds.left - dX, this.bounds.bottom - dY, this.bounds.right + dX, this.bounds.top + dY);
            atPoint = toleranceBounds.containsLonLat(lonlat);
        }
        return atPoint;
    },
    getLength: function () {
        return 0.0;
    },
    getArea: function () {
        return 0.0;
    },
    toString: function () {
        return OpenLayers.Format.WKT.prototype.write(new OpenLayers.Feature.Vector(this));
    },
    CLASS_NAME: "OpenLayers.Geometry"
});
OpenLayers.Geometry.segmentsIntersect = function (seg1, seg2, point) {
    var intersection = false;
    var x11_21 = seg1.x1 - seg2.x1;
    var y11_21 = seg1.y1 - seg2.y1;
    var x12_11 = seg1.x2 - seg1.x1;
    var y12_11 = seg1.y2 - seg1.y1;
    var y22_21 = seg2.y2 - seg2.y1;
    var x22_21 = seg2.x2 - seg2.x1;
    var d = (y22_21 * x12_11) - (x22_21 * y12_11);
    var n1 = (x22_21 * y11_21) - (y22_21 * x11_21);
    var n2 = (x12_11 * y11_21) - (y12_11 * x11_21);
    if (d == 0) {
        if (n1 == 0 && n2 == 0) {
            intersection = true;
        }
    } else {
        var along1 = n1 / d;
        var along2 = n2 / d;
        if (along1 >= 0 && along1 <= 1 && along2 >= 0 && along2 <= 1) {
            if (!point) {
                intersection = true;
            } else {
                var x = seg1.x1 + (along1 * x12_11);
                var y = seg1.y1 + (along1 * y12_11);
                intersection = new OpenLayers.Geometry.Point(x, y);
            }
        }
    }
    return intersection;
};
OpenLayers.Geometry.Collection = OpenLayers.Class(OpenLayers.Geometry, {
    components: null,
    componentTypes: null,
    initialize: function (components) {
        OpenLayers.Geometry.prototype.initialize.apply(this, arguments);
        this.components = [];
        if (components != null) {
            this.addComponents(components);
        }
    },
    destroy: function () {
        this.components.length = 0;
        this.components = null;
    },
    clone: function () {
        var geometry = eval("new " + this.CLASS_NAME + "()");
        geometry.components = this.components;
        OpenLayers.Util.applyDefaults(geometry, this);
        return geometry;
    },
    getComponentsString: function () {
        var strings = [];
        for (var i = 0, len = this.components.length; i < len; i++) {
            strings.push(this.components[i].toShortString());
        }
        return strings.join(",");
    },
    calculateBounds: function () {
        this.bounds = null;
        if (this.components && this.components.length > 0) {
            this.setBounds(this.components[0].getBounds());
            for (var i = 1, len = this.components.length; i < len; i++) {
                this.extendBounds(this.components[i].getBounds());
            }
        }
    },
    addComponents: function (components) {
        if (!(components instanceof Array)) {
            components = [components];
        }
        for (var i = 0, len = components.length; i < len; i++) {
            this.addComponent(components[i]);
        }
    },
    addComponent: function (component, index) {
        var added = false;
        if (component) {
            if (this.componentTypes == null || (OpenLayers.Util.indexOf(this.componentTypes, component.CLASS_NAME) > -1)) {
                if (index != null && (index < this.components.length)) {
                    var components1 = this.components.slice(0, index);
                    var components2 = this.components.slice(index, this.components.length);
                    components1.push(component);
                    this.components = components1.concat(components2);
                } else {
                    this.components.push(component);
                }
                component.parent = this;
                this.clearBounds();
                added = true;
            }
        }
        return added;
    },
    removeComponents: function (components) {
        if (!(components instanceof Array)) {
            components = [components];
        }
        for (var i = components.length - 1; i >= 0; --i) {
            this.removeComponent(components[i]);
        }
    },
    removeComponent: function (component) {
        OpenLayers.Util.removeItem(this.components, component);
        this.clearBounds();
    },
    getLength: function () {
        var length = 0.0;
        for (var i = 0, len = this.components.length; i < len; i++) {
            length += this.components[i].getLength();
        }
        return length;
    },
    getArea: function () {
        var area = 0.0;
        for (var i = 0, len = this.components.length; i < len; i++) {
            area += this.components[i].getArea();
        }
        return area;
    },
    move: function (x, y) {
        for (var i = 0, len = this.components.length; i < len; i++) {
            this.components[i].move(x, y);
        }
    },
    rotate: function (angle, origin) {
        for (var i = 0, len = this.components.length; i < len; ++i) {
            this.components[i].rotate(angle, origin);
        }
    },
    resize: function (scale, origin, ratio) {
        for (var i = 0; i < this.components.length; ++i) {
            this.components[i].resize(scale, origin, ratio);
        }
    },
    equals: function (geometry) {
        var equivalent = true;
        if (!geometry || !geometry.CLASS_NAME || (this.CLASS_NAME != geometry.CLASS_NAME)) {
            equivalent = false;
        } else if (!(geometry.components instanceof Array) || (geometry.components.length != this.components.length)) {
            equivalent = false;
        } else {
            for (var i = 0, len = this.components.length; i < len; ++i) {
                if (!this.components[i].equals(geometry.components[i])) {
                    equivalent = false;
                    break;
                }
            }
        }
        return equivalent;
    },
    transform: function (source, dest) {
        if (source && dest) {
            for (var i = 0, len = this.components.length; i < len; i++) {
                var component = this.components[i];
                component.transform(source, dest);
            }
            this.bounds = null;
        }
        return this;
    },
    intersects: function (geometry) {
        var intersect = false;
        for (var i = 0, len = this.components.length; i < len; ++i) {
            intersect = geometry.intersects(this.components[i]);
            if (intersect) {
                break;
            }
        }
        return intersect;
    },
    CLASS_NAME: "OpenLayers.Geometry.Collection"
});
OpenLayers.Geometry.Point = OpenLayers.Class(OpenLayers.Geometry, {
    x: null,
    y: null,
    initialize: function (x, y) {
        OpenLayers.Geometry.prototype.initialize.apply(this, arguments);
        this.x = parseFloat(x);
        this.y = parseFloat(y);
    },
    clone: function (obj) {
        if (obj == null) {
            obj = new OpenLayers.Geometry.Point(this.x, this.y);
        }
        OpenLayers.Util.applyDefaults(obj, this);
        return obj;
    },
    calculateBounds: function () {
        this.bounds = new OpenLayers.Bounds(this.x, this.y, this.x, this.y);
    },
    distanceTo: function (point) {
        var distance = 0.0;
        if ((this.x != null) && (this.y != null) && (point != null) && (point.x != null) && (point.y != null)) {
            var dx2 = Math.pow(this.x - point.x, 2);
            var dy2 = Math.pow(this.y - point.y, 2);
            distance = Math.sqrt(dx2 + dy2);
        }
        return distance;
    },
    equals: function (geom) {
        var equals = false;
        if (geom != null) {
            equals = ((this.x == geom.x && this.y == geom.y) || (isNaN(this.x) && isNaN(this.y) && isNaN(geom.x) && isNaN(geom.y)));
        }
        return equals;
    },
    toShortString: function () {
        return (this.x + ", " + this.y);
    },
    move: function (x, y) {
        this.x = this.x + x;
        this.y = this.y + y;
        this.clearBounds();
    },
    rotate: function (angle, origin) {
        angle *= Math.PI / 180;
        var radius = this.distanceTo(origin);
        var theta = angle + Math.atan2(this.y - origin.y, this.x - origin.x);
        this.x = origin.x + (radius * Math.cos(theta));
        this.y = origin.y + (radius * Math.sin(theta));
        this.clearBounds();
    },
    resize: function (scale, origin, ratio) {
        ratio = (ratio == undefined) ? 1 : ratio;
        this.x = origin.x + (scale * ratio * (this.x - origin.x));
        this.y = origin.y + (scale * (this.y - origin.y));
        this.clearBounds();
    },
    intersects: function (geometry) {
        var intersect = false;
        if (geometry.CLASS_NAME == "OpenLayers.Geometry.Point") {
            intersect = this.equals(geometry);
        } else {
            intersect = geometry.intersects(this);
        }
        return intersect;
    },
    transform: function (source, dest) {
        if ((source && dest)) {
            OpenLayers.Projection.transform(this, source, dest);
            this.bounds = null;
        }
        return this;
    },
    CLASS_NAME: "OpenLayers.Geometry.Point"
});
OpenLayers.Geometry.MultiPoint = OpenLayers.Class(OpenLayers.Geometry.Collection, {
    componentTypes: ["OpenLayers.Geometry.Point"],
    initialize: function (components) {
        OpenLayers.Geometry.Collection.prototype.initialize.apply(this, arguments);
    },
    addPoint: function (point, index) {
        this.addComponent(point, index);
    },
    removePoint: function (point) {
        this.removeComponent(point);
    },
    CLASS_NAME: "OpenLayers.Geometry.MultiPoint"
});
OpenLayers.Geometry.Curve = OpenLayers.Class(OpenLayers.Geometry.MultiPoint, {
    componentTypes: ["OpenLayers.Geometry.Point"],
    initialize: function (points) {
        OpenLayers.Geometry.MultiPoint.prototype.initialize.apply(this, arguments);
    },
    getLength: function () {
        var length = 0.0;
        if (this.components && (this.components.length > 1)) {
            for (var i = 1, len = this.components.length; i < len; i++) {
                length += this.components[i - 1].distanceTo(this.components[i]);
            }
        }
        return length;
    },
    CLASS_NAME: "OpenLayers.Geometry.Curve"
});
OpenLayers.Geometry.LineString = OpenLayers.Class(OpenLayers.Geometry.Curve, {
    initialize: function (points) {
        OpenLayers.Geometry.Curve.prototype.initialize.apply(this, arguments);
    },
    removeComponent: function (point) {
        if (this.components && (this.components.length > 2)) {
            OpenLayers.Geometry.Collection.prototype.removeComponent.apply(this, arguments);
        }
    },
    intersects: function (geometry) {
        var intersect = false;
        var type = geometry.CLASS_NAME;
        if (type == "OpenLayers.Geometry.LineString" || type == "OpenLayers.Geometry.LinearRing" || type == "OpenLayers.Geometry.Point") {
            var segs1 = this.getSortedSegments();
            var segs2;
            if (type == "OpenLayers.Geometry.Point") {
                segs2 = [{
                    x1: geometry.x,
                    y1: geometry.y,
                    x2: geometry.x,
                    y2: geometry.y
                }];
            } else {
                segs2 = geometry.getSortedSegments();
            }
            var seg1, seg1x1, seg1x2, seg1y1, seg1y2, seg2, seg2y1, seg2y2;
            outer: for (var i = 0, len = segs1.length; i < len; ++i) {
                seg1 = segs1[i];
                seg1x1 = seg1.x1;
                seg1x2 = seg1.x2;
                seg1y1 = seg1.y1;
                seg1y2 = seg1.y2;
                inner: for (var j = 0, jlen = segs2.length; j < jlen; ++j) {
                    seg2 = segs2[j];
                    if (seg2.x1 > seg1x2) {
                        break;
                    }
                    if (seg2.x2 < seg1x1) {
                        continue;
                    }
                    seg2y1 = seg2.y1;
                    seg2y2 = seg2.y2;
                    if (Math.min(seg2y1, seg2y2) > Math.max(seg1y1, seg1y2)) {
                        continue;
                    }
                    if (Math.max(seg2y1, seg2y2) < Math.min(seg1y1, seg1y2)) {
                        continue;
                    }
                    if (OpenLayers.Geometry.segmentsIntersect(seg1, seg2)) {
                        intersect = true;
                        break outer;
                    }
                }
            }
        } else {
            intersect = geometry.intersects(this);
        }
        return intersect;
    },
    getSortedSegments: function () {
        var numSeg = this.components.length - 1;
        var segments = new Array(numSeg);
        for (var i = 0; i < numSeg; ++i) {
            point1 = this.components[i];
            point2 = this.components[i + 1];
            if (point1.x < point2.x) {
                segments[i] = {
                    x1: point1.x,
                    y1: point1.y,
                    x2: point2.x,
                    y2: point2.y
                };
            } else {
                segments[i] = {
                    x1: point2.x,
                    y1: point2.y,
                    x2: point1.x,
                    y2: point1.y
                };
            }
        }

        function byX1(seg1, seg2) {
            return seg1.x1 - seg2.x1;
        }
        return segments.sort(byX1);
    },
    CLASS_NAME: "OpenLayers.Geometry.LineString"
});
OpenLayers.Geometry.LinearRing = OpenLayers.Class(OpenLayers.Geometry.LineString, {
    componentTypes: ["OpenLayers.Geometry.Point"],
    initialize: function (points) {
        OpenLayers.Geometry.LineString.prototype.initialize.apply(this, arguments);
    },
    addComponent: function (point, index) {
        var added = false;
        var lastPoint = this.components.pop();
        if (index != null || !point.equals(lastPoint)) {
            added = OpenLayers.Geometry.Collection.prototype.addComponent.apply(this, arguments);
        }
        var firstPoint = this.components[0];
        OpenLayers.Geometry.Collection.prototype.addComponent.apply(this, [firstPoint]);
        return added;
    },
    removeComponent: function (point) {
        if (this.components.length > 4) {
            this.components.pop();
            OpenLayers.Geometry.Collection.prototype.removeComponent.apply(this, arguments);
            var firstPoint = this.components[0];
            OpenLayers.Geometry.Collection.prototype.addComponent.apply(this, [firstPoint]);
        }
    },
    move: function (x, y) {
        for (var i = 0, len = this.components.length; i < len - 1; i++) {
            this.components[i].move(x, y);
        }
    },
    rotate: function (angle, origin) {
        for (var i = 0, len = this.components.length; i < len - 1; ++i) {
            this.components[i].rotate(angle, origin);
        }
    },
    resize: function (scale, origin, ratio) {
        for (var i = 0, len = this.components.length; i < len - 1; ++i) {
            this.components[i].resize(scale, origin, ratio);
        }
    },
    transform: function (source, dest) {
        if (source && dest) {
            for (var i = 0, len = this.components.length; i < len - 1; i++) {
                var component = this.components[i];
                component.transform(source, dest);
            }
            this.bounds = null;
        }
        return this;
    },
    getArea: function () {
        var area = 0.0;
        if (this.components && (this.components.length > 2)) {
            var sum = 0.0;
            for (var i = 0, len = this.components.length; i < len - 1; i++) {
                var b = this.components[i];
                var c = this.components[i + 1];
                sum += (b.x + c.x) * (c.y - b.y);
            }
            area = -sum / 2.0;
        }
        return area;
    },
    containsPoint: function (point) {
        var approx = OpenLayers.Number.limitSigDigs;
        var digs = 14;
        var px = approx(point.x, digs);
        var py = approx(point.y, digs);

        function getX(y, x1, y1, x2, y2) {
            return (((x1 - x2) * y) + ((x2 * y1) - (x1 * y2))) / (y1 - y2);
        }
        var numSeg = this.components.length - 1;
        var start, end, x1, y1, x2, y2, cx, cy;
        var crosses = 0;
        for (var i = 0; i < numSeg; ++i) {
            start = this.components[i];
            x1 = approx(start.x, digs);
            y1 = approx(start.y, digs);
            end = this.components[i + 1];
            x2 = approx(end.x, digs);
            y2 = approx(end.y, digs);
            if (y1 == y2) {
                if (py == y1) {
                    if (x1 <= x2 && (px >= x1 && px <= x2) || x1 >= x2 && (px <= x1 && px >= x2)) {
                        crosses = -1;
                        break;
                    }
                }
                continue;
            }
            cx = approx(getX(py, x1, y1, x2, y2), digs);
            if (cx == px) {
                if (y1 < y2 && (py >= y1 && py <= y2) || y1 > y2 && (py <= y1 && py >= y2)) {
                    crosses = -1;
                    break;
                }
            }
            if (cx <= px) {
                continue;
            }
            if (x1 != x2 && (cx < Math.min(x1, x2) || cx > Math.max(x1, x2))) {
                continue;
            }
            if (y1 < y2 && (py >= y1 && py < y2) || y1 > y2 && (py < y1 && py >= y2)) {
                ++crosses;
            }
        }
        var contained = (crosses == -1) ? 1 : !! (crosses & 1);
        return contained;
    },
    intersects: function (geometry) {
        var intersect = false;
        if (geometry.CLASS_NAME == "OpenLayers.Geometry.Point") {
            intersect = this.containsPoint(geometry);
        } else if (geometry.CLASS_NAME == "OpenLayers.Geometry.LineString") {
            intersect = geometry.intersects(this);
        } else if (geometry.CLASS_NAME == "OpenLayers.Geometry.LinearRing") {
            intersect = OpenLayers.Geometry.LineString.prototype.intersects.apply(this, [geometry]);
        } else {
            for (var i = 0, len = geometry.components.length; i < len; ++i) {
                intersect = geometry.components[i].intersects(this);
                if (intersect) {
                    break;
                }
            }
        }
        return intersect;
    },
    CLASS_NAME: "OpenLayers.Geometry.LinearRing"
});
OpenLayers.Geometry.Polygon = OpenLayers.Class(OpenLayers.Geometry.Collection, {
    componentTypes: ["OpenLayers.Geometry.LinearRing"],
    initialize: function (components) {
        OpenLayers.Geometry.Collection.prototype.initialize.apply(this, arguments);
    },
    getArea: function () {
        var area = 0.0;
        if (this.components && (this.components.length > 0)) {
            area += Math.abs(this.components[0].getArea());
            for (var i = 1, len = this.components.length; i < len; i++) {
                area -= Math.abs(this.components[i].getArea());
            }
        }
        return area;
    },
    containsPoint: function (point) {
        var numRings = this.components.length;
        var contained = false;
        if (numRings > 0) {
            contained = this.components[0].containsPoint(point);
            if (contained !== 1) {
                if (contained && numRings > 1) {
                    var hole;
                    for (var i = 1; i < numRings; ++i) {
                        hole = this.components[i].containsPoint(point);
                        if (hole) {
                            if (hole === 1) {
                                contained = 1;
                            } else {
                                contained = false;
                            }
                            break;
                        }
                    }
                }
            }
        }
        return contained;
    },
    intersects: function (geometry) {
        var intersect = false;
        var i, len;
        if (geometry.CLASS_NAME == "OpenLayers.Geometry.Point") {
            intersect = this.containsPoint(geometry);
        } else if (geometry.CLASS_NAME == "OpenLayers.Geometry.LineString" || geometry.CLASS_NAME == "OpenLayers.Geometry.LinearRing") {
            for (i = 0, len = this.components.length; i < len; ++i) {
                intersect = geometry.intersects(this.components[i]);
                if (intersect) {
                    break;
                }
            }
            if (!intersect) {
                for (i = 0, len = geometry.components.length; i < len; ++i) {
                    intersect = this.containsPoint(geometry.components[i]);
                    if (intersect) {
                        break;
                    }
                }
            }
        } else {
            for (i = 0, len = geometry.components.length; i < len; ++i) {
                intersect = this.intersects(geometry.components[i]);
                if (intersect) {
                    break;
                }
            }
        }
        if (!intersect && geometry.CLASS_NAME == "OpenLayers.Geometry.Polygon") {
            var ring = this.components[0];
            for (i = 0, len = ring.components.length; i < len; ++i) {
                intersect = geometry.containsPoint(ring.components[i]);
                if (intersect) {
                    break;
                }
            }
        }
        return intersect;
    },
    CLASS_NAME: "OpenLayers.Geometry.Polygon"
});
OpenLayers.Geometry.Polygon.createRegularPolygon = function (origin, radius, sides, rotation) {
    var angle = Math.PI * ((1 / sides) - (1 / 2));
    if (rotation) {
        angle += (rotation / 180) * Math.PI;
    }
    var rotatedAngle, x, y;
    var points = [];
    for (var i = 0; i < sides; ++i) {
        rotatedAngle = angle + (i * 2 * Math.PI / sides);
        x = origin.x + (radius * Math.cos(rotatedAngle));
        y = origin.y + (radius * Math.sin(rotatedAngle));
        points.push(new OpenLayers.Geometry.Point(x, y));
    }
    var ring = new OpenLayers.Geometry.LinearRing(points);
    return new OpenLayers.Geometry.Polygon([ring]);
};
OpenLayers.Renderer = OpenLayers.Class({
    container: null,
    extent: null,
    locked: false,
    size: null,
    resolution: null,
    map: null,
    initialize: function (containerID, options) {
        this.container = OpenLayers.Util.getElement(containerID);
    },
    destroy: function () {
        this.container = null;
        this.extent = null;
        this.size = null;
        this.resolution = null;
        this.map = null;
    },
    supported: function () {
        return false;
    },
    setExtent: function (extent, resolutionChanged) {
        this.extent = extent.clone();
        if (resolutionChanged) {
            this.resolution = null;
        }
    },
    setSize: function (size) {
        this.size = size.clone();
        this.resolution = null;
    },
    getResolution: function () {
        this.resolution = this.resolution || this.map.getResolution();
        return this.resolution;
    },
    drawFeature: function (feature, style) {
        if (style == null) {
            style = feature.style;
        }
        if (feature.geometry) {
            var bounds = feature.geometry.getBounds();
            if (bounds) {
                if (!bounds.intersectsBounds(this.extent)) {
                    style = {
                        display: "none"
                    };
                }
                return this.drawGeometry(feature.geometry, style, feature.id);
            }
        }
    },
    drawGeometry: function (geometry, style, featureId) {},
    clear: function () {},
    getFeatureIdFromEvent: function (evt) {},
    eraseFeatures: function (features) {
        if (!(features instanceof Array)) {
            features = [features];
        }
        for (var i = 0, len = features.length; i < len; ++i) {
            this.eraseGeometry(features[i].geometry);
        }
    },
    eraseGeometry: function (geometry) {},
    CLASS_NAME: "OpenLayers.Renderer"
});
OpenLayers.ElementsIndexer = OpenLayers.Class({
    maxZIndex: null,
    order: null,
    indices: null,
    compare: null,
    initialize: function (yOrdering) {
        this.compare = yOrdering ? OpenLayers.ElementsIndexer.IndexingMethods.Z_ORDER_Y_ORDER : OpenLayers.ElementsIndexer.IndexingMethods.Z_ORDER_DRAWING_ORDER;
        this.order = [];
        this.indices = {};
        this.maxZIndex = 0;
    },
    insert: function (newNode) {
        if (this.exists(newNode)) {
            this.remove(newNode);
        }
        var nodeId = newNode.id;
        this.determineZIndex(newNode);
        var leftIndex = -1;
        var rightIndex = this.order.length;
        var middle;
        while (rightIndex - leftIndex > 1) {
            middle = parseInt((leftIndex + rightIndex) / 2);
            var placement = this.compare(this, newNode, OpenLayers.Util.getElement(this.order[middle]));
            if (placement > 0) {
                leftIndex = middle;
            } else {
                rightIndex = middle;
            }
        }
        this.order.splice(rightIndex, 0, nodeId);
        this.indices[nodeId] = this.getZIndex(newNode);
        var nextIndex = rightIndex + 1;
        return nextIndex < this.order.length ? OpenLayers.Util.getElement(this.order[nextIndex]) : null;
    },
    remove: function (node) {
        var nodeId = node.id;
        var arrayIndex = OpenLayers.Util.indexOf(this.order, nodeId);
        if (arrayIndex >= 0) {
            this.order.splice(arrayIndex, 1);
            delete this.indices[nodeId];
            if (this.order.length > 0) {
                var lastId = this.order[this.order.length - 1];
                this.maxZIndex = this.indices[lastId];
            } else {
                this.maxZIndex = 0;
            }
        }
    },
    clear: function () {
        this.order = [];
        this.indices = {};
        this.maxZIndex = 0;
    },
    exists: function (node) {
        return (this.indices[node.id] != null);
    },
    getZIndex: function (node) {
        return node._style.graphicZIndex;
    },
    determineZIndex: function (node) {
        var zIndex = node._style.graphicZIndex;
        if (zIndex == null) {
            zIndex = this.maxZIndex;
            node._style.graphicZIndex = zIndex;
        } else if (zIndex > this.maxZIndex) {
            this.maxZIndex = zIndex;
        }
    },
    CLASS_NAME: "OpenLayers.ElementsIndexer"
});
OpenLayers.ElementsIndexer.IndexingMethods = {
    Z_ORDER: function (indexer, newNode, nextNode) {
        var newZIndex = indexer.getZIndex(newNode);
        var returnVal = 0;
        if (nextNode) {
            var nextZIndex = indexer.getZIndex(nextNode);
            returnVal = newZIndex - nextZIndex;
        }
        return returnVal;
    },
    Z_ORDER_DRAWING_ORDER: function (indexer, newNode, nextNode) {
        var returnVal = OpenLayers.ElementsIndexer.IndexingMethods.Z_ORDER(indexer, newNode, nextNode);
        if (nextNode && returnVal == 0) {
            returnVal = 1;
        }
        return returnVal;
    },
    Z_ORDER_Y_ORDER: function (indexer, newNode, nextNode) {
        var returnVal = OpenLayers.ElementsIndexer.IndexingMethods.Z_ORDER(indexer, newNode, nextNode);
        if (nextNode && returnVal == 0) {
            var newLat = newNode._geometry.getBounds().bottom;
            var nextLat = nextNode._geometry.getBounds().bottom;
            var result = nextLat - newLat;
            returnVal = (result == 0) ? 1 : result;
        }
        return returnVal;
    }
};
OpenLayers.Renderer.Elements = OpenLayers.Class(OpenLayers.Renderer, {
    rendererRoot: null,
    root: null,
    xmlns: null,
    indexer: null,
    BACKGROUND_ID_SUFFIX: "_background",
    minimumSymbolizer: {
        strokeLinecap: "round",
        strokeOpacity: 1,
        strokeDashstyle: "solid",
        fillOpacity: 1,
        pointRadius: 0
    },
    initialize: function (containerID, options) {
        OpenLayers.Renderer.prototype.initialize.apply(this, arguments);
        this.rendererRoot = this.createRenderRoot();
        this.root = this.createRoot();
        this.rendererRoot.appendChild(this.root);
        this.container.appendChild(this.rendererRoot);
        if (options && (options.zIndexing || options.yOrdering)) {
            this.indexer = new OpenLayers.ElementsIndexer(options.yOrdering);
        }
    },
    destroy: function () {
        this.clear();
        this.rendererRoot = null;
        this.root = null;
        this.xmlns = null;
        OpenLayers.Renderer.prototype.destroy.apply(this, arguments);
    },
    clear: function () {
        if (this.root) {
            while (this.root.childNodes.length > 0) {
                this.root.removeChild(this.root.firstChild);
            }
        }
        if (this.indexer) {
            this.indexer.clear();
        }
    },
    getNodeType: function (geometry, style) {},
    drawGeometry: function (geometry, style, featureId) {
        var className = geometry.CLASS_NAME;
        var rendered = true;
        if ((className == "OpenLayers.Geometry.Collection") || (className == "OpenLayers.Geometry.MultiPoint") || (className == "OpenLayers.Geometry.MultiLineString") || (className == "OpenLayers.Geometry.MultiPolygon")) {
            for (var i = 0, len = geometry.components.length; i < len; i++) {
                rendered = this.drawGeometry(geometry.components[i], style, featureId) && rendered;
            }
            return rendered;
        };
        rendered = false;
        if (style.display != "none") {
            if (style.backgroundGraphic) {
                this.redrawBackgroundNode(geometry.id, geometry, style, featureId);
            }
            rendered = this.redrawNode(geometry.id, geometry, style, featureId);
        }
        if (rendered == false) {
            var node = document.getElementById(geometry.id);
            if (node) {
                if (node._style.backgroundGraphic) {
                    node.parentNode.removeChild(document.getElementById(geometry.id + this.BACKGROUND_ID_SUFFIX));
                }
                node.parentNode.removeChild(node);
            }
        }
        return rendered;
    },
    redrawNode: function (id, geometry, style, featureId) {
        var node = this.nodeFactory(id, this.getNodeType(geometry, style));
        node._featureId = featureId;
        node._geometry = geometry;
        node._geometryClass = geometry.CLASS_NAME;
        node._style = style;
        var drawResult = this.drawGeometryNode(node, geometry, style);
        if (drawResult === false) {
            return false;
        }
        node = drawResult.node;
        var insert = this.indexer ? this.indexer.insert(node) : null;
        if (insert) {
            this.root.insertBefore(node, insert);
        } else {
            this.root.appendChild(node);
        }
        this.postDraw(node);
        return drawResult.complete;
    },
    redrawBackgroundNode: function (id, geometry, style, featureId) {
        var backgroundStyle = OpenLayers.Util.extend({}, style);
        backgroundStyle.externalGraphic = backgroundStyle.backgroundGraphic;
        backgroundStyle.graphicXOffset = backgroundStyle.backgroundXOffset;
        backgroundStyle.graphicYOffset = backgroundStyle.backgroundYOffset;
        backgroundStyle.graphicZIndex = backgroundStyle.backgroundGraphicZIndex;
        backgroundStyle.backgroundGraphic = null;
        backgroundStyle.backgroundXOffset = null;
        backgroundStyle.backgroundYOffset = null;
        backgroundStyle.backgroundGraphicZIndex = null;
        return this.redrawNode(id + this.BACKGROUND_ID_SUFFIX, geometry, backgroundStyle, null);
    },
    drawGeometryNode: function (node, geometry, style) {
        style = style || node._style;
        OpenLayers.Util.applyDefaults(style, this.minimumSymbolizer);
        var options = {
            'isFilled': true,
            'isStroked': !! style.strokeWidth
        };
        var drawn;
        switch (geometry.CLASS_NAME) {
        case "OpenLayers.Geometry.Point":
            drawn = this.drawPoint(node, geometry);
            break;
        case "OpenLayers.Geometry.LineString":
            options.isFilled = false;
            drawn = this.drawLineString(node, geometry);
            break;
        case "OpenLayers.Geometry.LinearRing":
            drawn = this.drawLinearRing(node, geometry);
            break;
        case "OpenLayers.Geometry.Polygon":
            drawn = this.drawPolygon(node, geometry);
            break;
        case "OpenLayers.Geometry.Surface":
            drawn = this.drawSurface(node, geometry);
            break;
        case "OpenLayers.Geometry.Rectangle":
            drawn = this.drawRectangle(node, geometry);
            break;
        default:
            break;
        }
        node._style = style;
        node._options = options;
        if (drawn != false) {
            return {
                node: this.setStyle(node, style, options, geometry),
                complete: drawn
            };
        } else {
            return false;
        }
    },
    postDraw: function (node) {},
    drawPoint: function (node, geometry) {},
    drawLineString: function (node, geometry) {},
    drawLinearRing: function (node, geometry) {},
    drawPolygon: function (node, geometry) {},
    drawRectangle: function (node, geometry) {},
    drawCircle: function (node, geometry) {},
    drawSurface: function (node, geometry) {},
    getFeatureIdFromEvent: function (evt) {
        var target = evt.target;
        var useElement = target && target.correspondingUseElement;
        var node = useElement ? useElement : (target || evt.srcElement);
        var featureId = node._featureId;
        return featureId;
    },
    eraseGeometry: function (geometry) {
        if ((geometry.CLASS_NAME == "OpenLayers.Geometry.MultiPoint") || (geometry.CLASS_NAME == "OpenLayers.Geometry.MultiLineString") || (geometry.CLASS_NAME == "OpenLayers.Geometry.MultiPolygon") || (geometry.CLASS_NAME == "OpenLayers.Geometry.Collection")) {
            for (var i = 0, len = geometry.components.length; i < len; i++) {
                this.eraseGeometry(geometry.components[i]);
            }
        } else {
            var element = OpenLayers.Util.getElement(geometry.id);
            if (element && element.parentNode) {
                if (element.geometry) {
                    element.geometry.destroy();
                    element.geometry = null;
                }
                element.parentNode.removeChild(element);
                if (this.indexer) {
                    this.indexer.remove(element);
                }
                if (element._style.backgroundGraphic) {
                    var backgroundId = geometry.id + this.BACKGROUND_ID_SUFFIX;
                    var bElem = OpenLayers.Util.getElement(backgroundId);
                    if (bElem && bElem.parentNode) {
                        bElem.parentNode.removeChild(bElem);
                    }
                }
            }
        }
    },
    nodeFactory: function (id, type) {
        var node = OpenLayers.Util.getElement(id);
        if (node) {
            if (!this.nodeTypeCompare(node, type)) {
                node.parentNode.removeChild(node);
                node = this.nodeFactory(id, type);
            }
        } else {
            node = this.createNode(type, id);
        }
        return node;
    },
    nodeTypeCompare: function (node, type) {},
    createNode: function (type, id) {},
    isComplexSymbol: function (graphicName) {
        return (graphicName != "circle") && !! graphicName;
    },
    CLASS_NAME: "OpenLayers.Renderer.Elements"
});
OpenLayers.Renderer.symbol = {
    "star": [350, 75, 379, 161, 469, 161, 397, 215, 423, 301, 350, 250, 277, 301, 303, 215, 231, 161, 321, 161, 350, 75],
    "cross": [4, 0, 6, 0, 6, 4, 10, 4, 10, 6, 6, 6, 6, 10, 4, 10, 4, 6, 0, 6, 0, 4, 4, 4, 4, 0],
    "x": [0, 0, 25, 0, 50, 35, 75, 0, 100, 0, 65, 50, 100, 100, 75, 100, 50, 65, 25, 100, 0, 100, 35, 50, 0, 0],
    "square": [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
    "triangle": [0, 10, 10, 10, 5, 0, 0, 10]
};
OpenLayers.Renderer.SVG = OpenLayers.Class(OpenLayers.Renderer.Elements, {
    xmlns: "http://www.w3.org/2000/svg",
    xlinkns: "http://www.w3.org/1999/xlink",
    MAX_PIXEL: 15000,
    translationParameters: null,
    symbolSize: {},
    initialize: function (containerID) {
        if (!this.supported()) {
            return;
        }
        OpenLayers.Renderer.Elements.prototype.initialize.apply(this, arguments);
        this.translationParameters = {
            x: 0,
            y: 0
        };
    },
    destroy: function () {
        OpenLayers.Renderer.Elements.prototype.destroy.apply(this, arguments);
    },
    supported: function () {
        var svgFeature = "http://www.w3.org/TR/SVG11/feature#";
        return (document.implementation && (document.implementation.hasFeature("org.w3c.svg", "1.0") || document.implementation.hasFeature(svgFeature + "SVG", "1.1") || document.implementation.hasFeature(svgFeature + "BasicStructure", "1.1")));
    },
    inValidRange: function (x, y, xyOnly) {
        var left = x + (xyOnly ? 0 : this.translationParameters.x);
        var top = y + (xyOnly ? 0 : this.translationParameters.y);
        return (left >= -this.MAX_PIXEL && left <= this.MAX_PIXEL && top >= -this.MAX_PIXEL && top <= this.MAX_PIXEL);
    },
    setExtent: function (extent, resolutionChanged) {
        OpenLayers.Renderer.Elements.prototype.setExtent.apply(this, arguments);
        var resolution = this.getResolution();
        var left = -extent.left / resolution;
        var top = extent.top / resolution;
        if (resolutionChanged) {
            this.left = left;
            this.top = top;
            var extentString = "0 0 " + this.size.w + " " + this.size.h;
            this.rendererRoot.setAttributeNS(null, "viewBox", extentString);
            this.translate(0, 0);
            return true;
        } else {
            var inRange = this.translate(left - this.left, top - this.top);
            if (!inRange) {
                this.setExtent(extent, true);
            }
            return inRange;
        }
    },
    translate: function (x, y) {
        if (!this.inValidRange(x, y, true)) {
            return false;
        } else {
            var transformString = "";
            if (x || y) {
                transformString = "translate(" + x + "," + y + ")";
            }
            this.root.setAttributeNS(null, "transform", transformString);
            this.translationParameters = {
                x: x,
                y: y
            };
            return true;
        }
    },
    setSize: function (size) {
        OpenLayers.Renderer.prototype.setSize.apply(this, arguments);
        this.rendererRoot.setAttributeNS(null, "width", this.size.w);
        this.rendererRoot.setAttributeNS(null, "height", this.size.h);
    },
    getNodeType: function (geometry, style) {
        var nodeType = null;
        switch (geometry.CLASS_NAME) {
        case "OpenLayers.Geometry.Point":
            if (style.externalGraphic) {
                nodeType = "image";
            } else if (this.isComplexSymbol(style.graphicName)) {
                nodeType = "use";
            } else {
                nodeType = "circle";
            }
            break;
        case "OpenLayers.Geometry.Rectangle":
            nodeType = "rect";
            break;
        case "OpenLayers.Geometry.LineString":
            nodeType = "polyline";
            break;
        case "OpenLayers.Geometry.LinearRing":
            nodeType = "polygon";
            break;
        case "OpenLayers.Geometry.Polygon":
        case "OpenLayers.Geometry.Curve":
        case "OpenLayers.Geometry.Surface":
            nodeType = "path";
            break;
        default:
            break;
        }
        return nodeType;
    },
    setStyle: function (node, style, options) {
        style = style || node._style;
        options = options || node._options;
        var r = parseFloat(node.getAttributeNS(null, "r"));
        var widthFactor = 1;
        var pos;
        if (node._geometryClass == "OpenLayers.Geometry.Point" && r) {
            if (style.externalGraphic) {
                pos = this.getPosition(node);
                if (style.graphicWidth && style.graphicHeight) {
                    node.setAttributeNS(null, "preserveAspectRatio", "none");
                }
                var width = style.graphicWidth || style.graphicHeight;
                var height = style.graphicHeight || style.graphicWidth;
                width = width ? width : style.pointRadius * 2;
                height = height ? height : style.pointRadius * 2;
                var xOffset = (style.graphicXOffset != undefined) ? style.graphicXOffset : -(0.5 * width);
                var yOffset = (style.graphicYOffset != undefined) ? style.graphicYOffset : -(0.5 * height);
                var opacity = style.graphicOpacity || style.fillOpacity;
                node.setAttributeNS(null, "x", (pos.x + xOffset).toFixed());
                node.setAttributeNS(null, "y", (pos.y + yOffset).toFixed());
                node.setAttributeNS(null, "width", width);
                node.setAttributeNS(null, "height", height);
                node.setAttributeNS(this.xlinkns, "href", style.externalGraphic);
                node.setAttributeNS(null, "style", "opacity: " + opacity);
            } else if (this.isComplexSymbol(style.graphicName)) {
                var offset = style.pointRadius * 3;
                var size = offset * 2;
                var id = this.importSymbol(style.graphicName);
                var href = "#" + id;
                pos = this.getPosition(node);
                widthFactor = this.symbolSize[id] / size;
                if (node.getAttributeNS(this.xlinkns, "href") != href) {
                    node.setAttributeNS(this.xlinkns, "href", href);
                } else if (size != parseFloat(node.getAttributeNS(null, "width"))) {
                    node.style.visibility = "hidden";
                    this.container.scrollLeft = this.container.scrollLeft;
                }
                node.setAttributeNS(null, "width", size);
                node.setAttributeNS(null, "height", size);
                node.setAttributeNS(null, "x", pos.x - offset);
                node.setAttributeNS(null, "y", pos.y - offset);
                node.style.visibility = "";
            } else {
                node.setAttributeNS(null, "r", style.pointRadius);
            }
            if (typeof style.rotation != "undefined" && pos) {
                var rotation = OpenLayers.String.format("rotate(${0} ${1} ${2})", [style.rotation, pos.x, pos.y]);
                node.setAttributeNS(null, "transform", rotation);
            }
        }
        if (options.isFilled) {
            node.setAttributeNS(null, "fill", style.fillColor);
            node.setAttributeNS(null, "fill-opacity", style.fillOpacity);
        } else {
            node.setAttributeNS(null, "fill", "none");
        }
        if (options.isStroked) {
            node.setAttributeNS(null, "stroke", style.strokeColor);
            node.setAttributeNS(null, "stroke-opacity", style.strokeOpacity);
            node.setAttributeNS(null, "stroke-width", style.strokeWidth * widthFactor);
            node.setAttributeNS(null, "stroke-linecap", style.strokeLinecap);
            node.setAttributeNS(null, "stroke-linejoin", "round");
            node.setAttributeNS(null, "stroke-dasharray", this.dashStyle(style, widthFactor));
        } else {
            node.setAttributeNS(null, "stroke", "none");
        }
        if (style.pointerEvents) {
            node.setAttributeNS(null, "pointer-events", style.pointerEvents);
        }
        if (style.cursor != null) {
            node.setAttributeNS(null, "cursor", style.cursor);
        }
        return node;
    },
    dashStyle: function (style, widthFactor) {
        var w = style.strokeWidth * widthFactor;
        switch (style.strokeDashstyle) {
        case 'solid':
            return 'none';
        case 'dot':
            return [1, 4 * w].join();
        case 'dash':
            return [4 * w, 4 * w].join();
        case 'dashdot':
            return [4 * w, 4 * w, 1, 4 * w].join();
        case 'longdash':
            return [8 * w, 4 * w].join();
        case 'longdashdot':
            return [8 * w, 4 * w, 1, 4 * w].join();
        default:
            return style.strokeDashstyle.replace(/ /g, ",");
        }
    },
    createNode: function (type, id) {
        var node = document.createElementNS(this.xmlns, type);
        if (id) {
            node.setAttributeNS(null, "id", id);
        }
        return node;
    },
    nodeTypeCompare: function (node, type) {
        return (type == node.nodeName);
    },
    createRenderRoot: function () {
        return this.nodeFactory(this.container.id + "_svgRoot", "svg");
    },
    createRoot: function () {
        return this.nodeFactory(this.container.id + "_root", "g");
    },
    createDefs: function () {
        var defs = this.nodeFactory("ol-renderer-defs", "defs");
        this.rendererRoot.appendChild(defs);
        return defs;
    },
    drawPoint: function (node, geometry) {
        return this.drawCircle(node, geometry, 1);
    },
    drawCircle: function (node, geometry, radius) {
        var resolution = this.getResolution();
        var x = (geometry.x / resolution + this.left);
        var y = (this.top - geometry.y / resolution);
        if (this.inValidRange(x, y)) {
            node.setAttributeNS(null, "cx", x);
            node.setAttributeNS(null, "cy", y);
            node.setAttributeNS(null, "r", radius);
            return node;
        } else {
            return false;
        }
    },
    drawLineString: function (node, geometry) {
        var componentsResult = this.getComponentsString(geometry.components);
        if (componentsResult.path) {
            node.setAttributeNS(null, "points", componentsResult.path);
            return (componentsResult.complete ? node : null);
        } else {
            return false;
        }
    },
    drawLinearRing: function (node, geometry) {
        var componentsResult = this.getComponentsString(geometry.components);
        if (componentsResult.path) {
            node.setAttributeNS(null, "points", componentsResult.path);
            return (componentsResult.complete ? node : null);
        } else {
            return false;
        }
    },
    drawPolygon: function (node, geometry) {
        var d = "";
        var draw = true;
        var complete = true;
        var linearRingResult, path;
        for (var j = 0, len = geometry.components.length; j < len; j++) {
            d += " M";
            linearRingResult = this.getComponentsString(geometry.components[j].components, " ");
            path = linearRingResult.path;
            if (path) {
                d += " " + path;
                complete = linearRingResult.complete && complete;
            } else {
                draw = false;
            }
        }
        d += " z";
        if (draw) {
            node.setAttributeNS(null, "d", d);
            node.setAttributeNS(null, "fill-rule", "evenodd");
            return complete ? node : null;
        } else {
            return false;
        }
    },
    drawRectangle: function (node, geometry) {
        var resolution = this.getResolution();
        var x = (geometry.x / resolution + this.left);
        var y = (this.top - geometry.y / resolution);
        if (this.inValidRange(x, y)) {
            node.setAttributeNS(null, "x", x);
            node.setAttributeNS(null, "y", y);
            node.setAttributeNS(null, "width", geometry.width / resolution);
            node.setAttributeNS(null, "height", geometry.height / resolution);
            return node;
        } else {
            return false;
        }
    },
    drawSurface: function (node, geometry) {
        var d = null;
        var draw = true;
        for (var i = 0, len = geometry.components.length; i < len; i++) {
            if ((i % 3) == 0 && (i / 3) == 0) {
                var component = this.getShortString(geometry.components[i]);
                if (!component) {
                    draw = false;
                }
                d = "M " + component;
            } else if ((i % 3) == 1) {
                var component = this.getShortString(geometry.components[i]);
                if (!component) {
                    draw = false;
                }
                d += " C " + component;
            } else {
                var component = this.getShortString(geometry.components[i]);
                if (!component) {
                    draw = false;
                }
                d += " " + component;
            }
        }
        d += " Z";
        if (draw) {
            node.setAttributeNS(null, "d", d);
            return node;
        } else {
            return false;
        }
    },
    getComponentsString: function (components, separator) {
        var renderCmp = [];
        var complete = true;
        var len = components.length;
        var strings = [];
        var str, component, j;
        for (var i = 0; i < len; i++) {
            component = components[i];
            renderCmp.push(component);
            str = this.getShortString(component);
            if (str) {
                strings.push(str);
            } else {
                if (i > 0) {
                    if (this.getShortString(components[i - 1])) {
                        strings.push(this.clipLine(components[i], components[i - 1]));
                    }
                }
                if (i < len - 1) {
                    if (this.getShortString(components[i + 1])) {
                        strings.push(this.clipLine(components[i], components[i + 1]));
                    }
                }
                complete = false;
            }
        }
        return {
            path: strings.join(separator || ","),
            complete: complete
        };
    },
    clipLine: function (badComponent, goodComponent) {
        if (goodComponent.equals(badComponent)) {
            return "";
        }
        var resolution = this.getResolution();
        var maxX = this.MAX_PIXEL - this.translationParameters.x;
        var maxY = this.MAX_PIXEL - this.translationParameters.y;
        var x1 = goodComponent.x / resolution + this.left;
        var y1 = this.top - goodComponent.y / resolution;
        var x2 = badComponent.x / resolution + this.left;
        var y2 = this.top - badComponent.y / resolution;
        var k;
        if (x2 < -maxX || x2 > maxX) {
            k = (y2 - y1) / (x2 - x1);
            x2 = x2 < 0 ? -maxX : maxX;
            y2 = y1 + (x2 - x1) * k;
        }
        if (y2 < -maxY || y2 > maxY) {
            k = (x2 - x1) / (y2 - y1);
            y2 = y2 < 0 ? -maxY : maxY;
            x2 = x1 + (y2 - y1) * k;
        }
        return x2 + "," + y2;
    },
    getShortString: function (point) {
        var resolution = this.getResolution();
        var x = (point.x / resolution + this.left);
        var y = (this.top - point.y / resolution);
        if (this.inValidRange(x, y)) {
            return x + "," + y;
        } else {
            return false;
        }
    },
    getPosition: function (node) {
        return ({
            x: parseFloat(node.getAttributeNS(null, "cx")),
            y: parseFloat(node.getAttributeNS(null, "cy"))
        });
    },
    importSymbol: function (graphicName) {
        if (!this.defs) {
            this.defs = this.createDefs();
        }
        var id = this.container.id + "-" + graphicName;
        if (document.getElementById(id) != null) {
            return id;
        }
        var symbol = OpenLayers.Renderer.symbol[graphicName];
        if (!symbol) {
            throw new Error(graphicName + ' is not a valid symbol name');
            return;
        }
        var symbolNode = this.nodeFactory(id, "symbol");
        var node = this.nodeFactory(null, "polygon");
        symbolNode.appendChild(node);
        var symbolExtent = new OpenLayers.Bounds(Number.MAX_VALUE, Number.MAX_VALUE, 0, 0);
        var points = "";
        var x, y;
        for (var i = 0; i < symbol.length; i = i + 2) {
            x = symbol[i];
            y = symbol[i + 1];
            symbolExtent.left = Math.min(symbolExtent.left, x);
            symbolExtent.bottom = Math.min(symbolExtent.bottom, y);
            symbolExtent.right = Math.max(symbolExtent.right, x);
            symbolExtent.top = Math.max(symbolExtent.top, y);
            points += " " + x + "," + y;
        }
        node.setAttributeNS(null, "points", points);
        var width = symbolExtent.getWidth();
        var height = symbolExtent.getHeight();
        var viewBox = [symbolExtent.left - width, symbolExtent.bottom - height, width * 3, height * 3];
        symbolNode.setAttributeNS(null, "viewBox", viewBox.join(" "));
        this.symbolSize[id] = Math.max(width, height) * 3;
        this.defs.appendChild(symbolNode);
        return symbolNode.id;
    },
    CLASS_NAME: "OpenLayers.Renderer.SVG"
});
OpenLayers.Renderer.Canvas = OpenLayers.Class(OpenLayers.Renderer, {
    root: null,
    canvas: null,
    features: null,
    geometryMap: null,
    initialize: function (containerID) {
        OpenLayers.Renderer.prototype.initialize.apply(this, arguments);
        this.root = document.createElement("canvas");
        this.container.appendChild(this.root);
        this.canvas = this.root.getContext("2d");
        this.features = {};
        this.geometryMap = {};
    },
    eraseGeometry: function (geometry) {
        this.eraseFeatures(this.features[this.geometryMap[geometry.id]][0]);
    },
    supported: function () {
        var canvas = document.createElement("canvas");
        return !!canvas.getContext;
    },
    setExtent: function (extent) {
        this.extent = extent.clone();
        this.resolution = null;
        this.redraw();
    },
    setSize: function (size) {
        this.size = size.clone();
        this.root.style.width = size.w + "px";
        this.root.style.height = size.h + "px";
        this.root.width = size.w;
        this.root.height = size.h;
        this.resolution = null;
    },
    drawFeature: function (feature, style) {
        if (style == null) {
            style = feature.style;
        }
        style = OpenLayers.Util.extend({
            'fillColor': '#000000',
            'strokeColor': '#000000',
            'strokeWidth': 2,
            'fillOpacity': 1,
            'strokeOpacity': 1
        }, style);
        this.features[feature.id] = [feature, style];
        this.geometryMap[feature.geometry.id] = feature.id;
        this.redraw();
    },
    drawGeometry: function (geometry, style) {
        var className = geometry.CLASS_NAME;
        if ((className == "OpenLayers.Geometry.Collection") || (className == "OpenLayers.Geometry.MultiPoint") || (className == "OpenLayers.Geometry.MultiLineString") || (className == "OpenLayers.Geometry.MultiPolygon")) {
            for (var i = 0; i < geometry.components.length; i++) {
                this.drawGeometry(geometry.components[i], style);
            }
            return;
        };
        switch (geometry.CLASS_NAME) {
        case "OpenLayers.Geometry.Point":
            this.drawPoint(geometry, style);
            break;
        case "OpenLayers.Geometry.LineString":
            this.drawLineString(geometry, style);
            break;
        case "OpenLayers.Geometry.LinearRing":
            this.drawLinearRing(geometry, style);
            break;
        case "OpenLayers.Geometry.Polygon":
            this.drawPolygon(geometry, style);
            break;
        default:
            break;
        }
    },
    drawExternalGraphic: function (pt, style) {
        var img = new Image();
        img.src = style.externalGraphic;
        var width = style.graphicWidth || style.graphicHeight;
        var height = style.graphicHeight || style.graphicWidth;
        width = width ? width : style.pointRadius * 2;
        height = height ? height : style.pointRadius * 2;
        var xOffset = (style.graphicXOffset != undefined) ? style.graphicXOffset : -(0.5 * width);
        var yOffset = (style.graphicYOffset != undefined) ? style.graphicYOffset : -(0.5 * height);
        var opacity = style.graphicOpacity || style.fillOpacity;
        var context = {
            img: img,
            x: (pt[0] + xOffset),
            y: (pt[1] + yOffset),
            width: width,
            height: height,
            canvas: this.canvas
        };
        img.onload = OpenLayers.Function.bind(function () {
            this.canvas.drawImage(this.img, this.x, this.y, this.width, this.height);
        }, context);
    },
    setCanvasStyle: function (type, style) {
        if (type == "fill") {
            this.canvas.globalAlpha = style['fillOpacity'];
            this.canvas.fillStyle = style['fillColor'];
        } else if (type == "stroke") {
            this.canvas.globalAlpha = style['strokeOpacity'];
            this.canvas.strokeStyle = style['strokeColor'];
            this.canvas.lineWidth = style['strokeWidth'];
        } else {
            this.canvas.globalAlpha = 0;
            this.canvas.lineWidth = 1;
        }
    },
    drawPoint: function (geometry, style) {
        var pt = this.getLocalXY(geometry);
        if (style.externalGraphic) {
            this.drawExternalGraphic(pt, style);
        } else {
            this.setCanvasStyle("fill", style);
            this.canvas.beginPath();
            this.canvas.arc(pt[0], pt[1], 6, 0, Math.PI * 2, true);
            this.canvas.fill();
            this.setCanvasStyle("stroke", style);
            this.canvas.beginPath();
            this.canvas.arc(pt[0], pt[1], 6, 0, Math.PI * 2, true);
            this.canvas.stroke();
            this.setCanvasStyle("reset");
        }
    },
    drawLineString: function (geometry, style) {
        this.setCanvasStyle("stroke", style);
        this.canvas.beginPath();
        var start = this.getLocalXY(geometry.components[0]);
        this.canvas.moveTo(start[0], start[1]);
        for (var i = 1; i < geometry.components.length; i++) {
            var pt = this.getLocalXY(geometry.components[i]);
            this.canvas.lineTo(pt[0], pt[1]);
        }
        this.canvas.stroke();
        this.setCanvasStyle("reset");
    },
    drawLinearRing: function (geometry, style) {
        this.setCanvasStyle("fill", style);
        this.canvas.beginPath();
        var start = this.getLocalXY(geometry.components[0]);
        this.canvas.moveTo(start[0], start[1]);
        for (var i = 1; i < geometry.components.length - 1; i++) {
            var pt = this.getLocalXY(geometry.components[i]);
            this.canvas.lineTo(pt[0], pt[1]);
        }
        this.canvas.fill();
        var oldWidth = this.canvas.lineWidth;
        this.setCanvasStyle("stroke", style);
        this.canvas.beginPath();
        var start = this.getLocalXY(geometry.components[0]);
        this.canvas.moveTo(start[0], start[1]);
        for (var i = 1; i < geometry.components.length; i++) {
            var pt = this.getLocalXY(geometry.components[i]);
            this.canvas.lineTo(pt[0], pt[1]);
        }
        this.canvas.stroke();
        this.setCanvasStyle("reset");
    },
    drawPolygon: function (geometry, style) {
        this.drawLinearRing(geometry.components[0], style);
        for (var i = 1; i < geometry.components.length; i++) {
            this.drawLinearRing(geometry.components[i], {
                fillOpacity: 0,
                strokeWidth: 0,
                strokeOpacity: 0,
                strokeColor: '#000000',
                fillColor: '#000000'
            });
        }
    },
    getLocalXY: function (point) {
        var resolution = this.getResolution();
        var extent = this.extent;
        var x = (point.x / resolution + (-extent.left / resolution));
        var y = ((extent.top / resolution) - point.y / resolution);
        return [x, y];
    },
    clear: function () {
        this.canvas.clearRect(0, 0, this.root.width, this.root.height);
    },
    getFeatureIdFromEvent: function (evt) {
        var loc = this.map.getLonLatFromPixel(evt.xy);
        var resolution = this.getResolution();
        var bounds = new OpenLayers.Bounds(loc.lon - resolution * 5, loc.lat - resolution * 5, loc.lon + resolution * 5, loc.lat + resolution * 5);
        var geom = bounds.toGeometry();
        for (var feat in this.features) {
            if (!this.features.hasOwnProperty(feat)) {
                continue;
            }
            if (this.features[feat][0].geometry.intersects(geom)) {
                return feat;
            }
        }
        return null;
    },
    eraseFeatures: function (features) {
        if (!(features instanceof Array)) {
            features = [features];
        }
        for (var i = 0; i < features.length; ++i) {
            delete this.features[features[i].id];
        }
        this.redraw();
    },
    redraw: function () {
        if (!this.locked) {
            this.clear();
            for (var id in this.features) {
                if (!this.features.hasOwnProperty(id)) {
                    continue;
                }
                if (!this.features[id][0].geometry) {
                    continue;
                }
                this.drawGeometry(this.features[id][0].geometry, this.features[id][1]);
            }
        }
    },
    CLASS_NAME: "OpenLayers.Renderer.Canvas"
});
OpenLayers.Renderer.VML = OpenLayers.Class(OpenLayers.Renderer.Elements, {
    xmlns: "urn:schemas-microsoft-com:vml",
    symbolCache: {},
    offset: null,
    initialize: function (containerID) {
        if (!this.supported()) {
            return;
        }
        if (!document.namespaces.olv) {
            document.namespaces.add("olv", this.xmlns);
            var style = document.createStyleSheet();
            style.addRule('olv\\:*', "behavior: url(#default#VML); " + "position: absolute; display: inline-block;");
        }
        OpenLayers.Renderer.Elements.prototype.initialize.apply(this, arguments);
        this.offset = {
            x: 0,
            y: 0
        };
    },
    destroy: function () {
        OpenLayers.Renderer.Elements.prototype.destroy.apply(this, arguments);
    },
    supported: function () {
        return !!(document.namespaces);
    },
    setExtent: function (extent, resolutionChanged) {
        OpenLayers.Renderer.Elements.prototype.setExtent.apply(this, arguments);
        var resolution = this.getResolution();
        var left = extent.left / resolution;
        var top = extent.top / resolution - this.size.h;
        if (resolutionChanged) {
            this.offset = {
                x: left,
                y: top
            };
            left = 0;
            top = 0;
        } else {
            left = left - this.offset.x;
            top = top - this.offset.y;
        }
        var org = left + " " + top;
        this.root.setAttribute("coordorigin", org);
        var size = this.size.w + " " + this.size.h;
        this.root.setAttribute("coordsize", size);
        this.root.style.flip = "y";
        return true;
    },
    setSize: function (size) {
        OpenLayers.Renderer.prototype.setSize.apply(this, arguments);
        this.rendererRoot.style.width = this.size.w + "px";
        this.rendererRoot.style.height = this.size.h + "px";
        this.root.style.width = this.size.w + "px";
        this.root.style.height = this.size.h + "px";
    },
    getNodeType: function (geometry, style) {
        var nodeType = null;
        switch (geometry.CLASS_NAME) {
        case "OpenLayers.Geometry.Point":
            if (style.externalGraphic) {
                nodeType = "olv:rect";
            } else if (this.isComplexSymbol(style.graphicName)) {
                nodeType = "olv:shape";
            } else {
                nodeType = "olv:oval";
            }
            break;
        case "OpenLayers.Geometry.Rectangle":
            nodeType = "olv:rect";
            break;
        case "OpenLayers.Geometry.LineString":
        case "OpenLayers.Geometry.LinearRing":
        case "OpenLayers.Geometry.Polygon":
        case "OpenLayers.Geometry.Curve":
        case "OpenLayers.Geometry.Surface":
            nodeType = "olv:shape";
            break;
        default:
            break;
        }
        return nodeType;
    },
    setStyle: function (node, style, options, geometry) {
        style = style || node._style;
        options = options || node._options;
        var widthFactor = 1;
        if (node._geometryClass == "OpenLayers.Geometry.Point") {
            if (style.externalGraphic) {
                var width = style.graphicWidth || style.graphicHeight;
                var height = style.graphicHeight || style.graphicWidth;
                width = width ? width : style.pointRadius * 2;
                height = height ? height : style.pointRadius * 2;
                var resolution = this.getResolution();
                var xOffset = (style.graphicXOffset != undefined) ? style.graphicXOffset : -(0.5 * width);
                var yOffset = (style.graphicYOffset != undefined) ? style.graphicYOffset : -(0.5 * height);
                node.style.left = ((geometry.x / resolution - this.offset.x) + xOffset).toFixed();
                node.style.top = ((geometry.y / resolution - this.offset.y) - (yOffset + height)).toFixed();
                node.style.width = width + "px";
                node.style.height = height + "px";
                node.style.flip = "y";
                style.fillColor = "none";
                options.isStroked = false;
            } else if (this.isComplexSymbol(style.graphicName)) {
                var cache = this.importSymbol(style.graphicName);
                var symbolExtent = cache.extent;
                var width = symbolExtent.getWidth();
                var height = symbolExtent.getHeight();
                node.setAttribute("path", cache.path);
                node.setAttribute("coordorigin", symbolExtent.left + "," + symbolExtent.bottom);
                node.setAttribute("coordsize", width + "," + height);
                node.style.left = symbolExtent.left + "px";
                node.style.top = symbolExtent.bottom + "px";
                node.style.width = width + "px";
                node.style.height = height + "px";
                this.drawCircle(node, geometry, style.pointRadius);
                node.style.flip = "y";
            } else {
                this.drawCircle(node, geometry, style.pointRadius);
            }
        }
        if (options.isFilled) {
            node.setAttribute("fillcolor", style.fillColor);
        } else {
            node.setAttribute("filled", "false");
        }
        var fills = node.getElementsByTagName("fill");
        var fill = (fills.length == 0) ? null : fills[0];
        if (!options.isFilled) {
            if (fill) {
                node.removeChild(fill);
            }
        } else {
            if (!fill) {
                fill = this.createNode('olv:fill', node.id + "_fill");
            }
            fill.setAttribute("opacity", style.fillOpacity);
            if (node._geometryClass == "OpenLayers.Geometry.Point" && style.externalGraphic) {
                if (style.graphicOpacity) {
                    fill.setAttribute("opacity", style.graphicOpacity);
                }
                fill.setAttribute("src", style.externalGraphic);
                fill.setAttribute("type", "frame");
                if (!(style.graphicWidth && style.graphicHeight)) {
                    fill.aspect = "atmost";
                }
            }
            if (fill.parentNode != node) {
                node.appendChild(fill);
            }
        }
        if (typeof style.rotation != "undefined") {
            if (style.externalGraphic) {
                this.graphicRotate(node, xOffset, yOffset);
                fill.setAttribute("opacity", 0);
            } else {
                node.style.rotation = style.rotation;
            }
        }
        if (options.isStroked) {
            node.setAttribute("strokecolor", style.strokeColor);
            node.setAttribute("strokeweight", style.strokeWidth + "px");
        } else {
            node.setAttribute("stroked", "false");
        }
        var strokes = node.getElementsByTagName("stroke");
        var stroke = (strokes.length == 0) ? null : strokes[0];
        if (!options.isStroked) {
            if (stroke) {
                node.removeChild(stroke);
            }
        } else {
            if (!stroke) {
                stroke = this.createNode('olv:stroke', node.id + "_stroke");
                node.appendChild(stroke);
            }
            stroke.setAttribute("opacity", style.strokeOpacity);
            stroke.setAttribute("endcap", !style.strokeLinecap || style.strokeLinecap == 'butt' ? 'flat' : style.strokeLinecap);
            stroke.setAttribute("dashstyle", this.dashStyle(style));
        }
        if (style.cursor != "inherit" && style.cursor != null) {
            node.style.cursor = style.cursor;
        }
        return node;
    },
    graphicRotate: function (node, xOffset, yOffset) {
        var style = style || node._style;
        var options = node._options;
        var aspectRatio, size;
        if (!(style.graphicWidth && style.graphicHeight)) {
            var img = new Image();
            img.onreadystatechange = OpenLayers.Function.bind(function () {
                if (img.readyState == "complete" || img.readyState == "interactive") {
                    aspectRatio = img.width / img.height;
                    size = Math.max(style.pointRadius * 2, style.graphicWidth || 0, style.graphicHeight || 0);
                    xOffset = xOffset * aspectRatio;
                    style.graphicWidth = size * aspectRatio;
                    style.graphicHeight = size;
                    this.graphicRotate(node, xOffset, yOffset);
                }
            }, this);
            img.src = style.externalGraphic;
            return;
        } else {
            size = Math.max(style.graphicWidth, style.graphicHeight);
            aspectRatio = style.graphicWidth / style.graphicHeight;
        }
        var width = Math.round(style.graphicWidth || size * aspectRatio);
        var height = Math.round(style.graphicHeight || size);
        node.style.width = width + "px";
        node.style.height = height + "px";
        var image = document.getElementById(node.id + "_image");
        if (!image) {
            image = this.createNode("olv:imagedata", node.id + "_image");
            node.appendChild(image);
        }
        image.style.width = width + "px";
        image.style.height = height + "px";
        image.src = style.externalGraphic;
        image.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(" + "src='', sizingMethod='scale')";
        var rotation = style.rotation * Math.PI / 180;
        var sintheta = Math.sin(rotation);
        var costheta = Math.cos(rotation);
        var filter = "progid:DXImageTransform.Microsoft.Matrix(M11=" + costheta + ",M12=" + (-sintheta) + ",M21=" + sintheta + ",M22=" + costheta + ",SizingMethod='auto expand')\n";
        var opacity = style.graphicOpacity || style.fillOpacity;
        if (opacity && opacity != 1) {
            filter += "progid:DXImageTransform.Microsoft.BasicImage(opacity=" + opacity + ")\n";
        }
        node.style.filter = filter;
        var centerPoint = new OpenLayers.Geometry.Point(-xOffset, -yOffset);
        var imgBox = new OpenLayers.Bounds(0, 0, width, height).toGeometry();
        imgBox.rotate(style.rotation, centerPoint);
        var imgBounds = imgBox.getBounds();
        node.style.left = Math.round(parseInt(node.style.left) + imgBounds.left) + "px";
        node.style.top = Math.round(parseInt(node.style.top) - imgBounds.bottom) + "px";
    },
    postDraw: function (node) {
        var fillColor = node._style.fillColor;
        var strokeColor = node._style.strokeColor;
        if (fillColor == "none" && node.getAttribute("fillcolor") != fillColor) {
            node.setAttribute("fillcolor", fillColor);
        }
        if (strokeColor == "none" && node.getAttribute("strokecolor") != strokeColor) {
            node.setAttribute("strokecolor", strokeColor);
        }
    },
    setNodeDimension: function (node, geometry) {
        var bbox = geometry.getBounds();
        if (bbox) {
            var resolution = this.getResolution();
            var scaledBox = new OpenLayers.Bounds((bbox.left / resolution - this.offset.x).toFixed(), (bbox.bottom / resolution - this.offset.y).toFixed(), (bbox.right / resolution - this.offset.x).toFixed(), (bbox.top / resolution - this.offset.y).toFixed());
            node.style.left = scaledBox.left + "px";
            node.style.top = scaledBox.top + "px";
            node.style.width = scaledBox.getWidth() + "px";
            node.style.height = scaledBox.getHeight() + "px";
            node.coordorigin = scaledBox.left + " " + scaledBox.top;
            node.coordsize = scaledBox.getWidth() + " " + scaledBox.getHeight();
        }
    },
    dashStyle: function (style) {
        var dash = style.strokeDashstyle;
        switch (dash) {
        case 'solid':
        case 'dot':
        case 'dash':
        case 'dashdot':
        case 'longdash':
        case 'longdashdot':
            return dash;
        default:
            var parts = dash.split(/[ ,]/);
            if (parts.length == 2) {
                if (1 * parts[0] >= 2 * parts[1]) {
                    return "longdash";
                }
                return (parts[0] == 1 || parts[1] == 1) ? "dot" : "dash";
            } else if (parts.length == 4) {
                return (1 * parts[0] >= 2 * parts[1]) ? "longdashdot" : "dashdot";
            }
            return "solid";
        }
    },
    createNode: function (type, id) {
        var node = document.createElement(type);
        if (id) {
            node.setAttribute('id', id);
        }
        node.setAttribute('unselectable', 'on', 0);
        node.onselectstart = function () {
            return (false);
        };
        return node;
    },
    nodeTypeCompare: function (node, type) {
        var subType = type;
        var splitIndex = subType.indexOf(":");
        if (splitIndex != -1) {
            subType = subType.substr(splitIndex + 1);
        }
        var nodeName = node.nodeName;
        splitIndex = nodeName.indexOf(":");
        if (splitIndex != -1) {
            nodeName = nodeName.substr(splitIndex + 1);
        }
        return (subType == nodeName);
    },
    createRenderRoot: function () {
        return this.nodeFactory(this.container.id + "_vmlRoot", "div");
    },
    createRoot: function () {
        return this.nodeFactory(this.container.id + "_root", "olv:group");
    },
    drawPoint: function (node, geometry) {
        return this.drawCircle(node, geometry, 1);
    },
    drawCircle: function (node, geometry, radius) {
        if (!isNaN(geometry.x) && !isNaN(geometry.y)) {
            var resolution = this.getResolution();
            node.style.left = ((geometry.x / resolution - this.offset.x).toFixed() - radius) + "px";
            node.style.top = ((geometry.y / resolution - this.offset.y).toFixed() - radius) + "px";
            var diameter = radius * 2;
            node.style.width = diameter + "px";
            node.style.height = diameter + "px";
            return node;
        }
        return false;
    },
    drawLineString: function (node, geometry) {
        return this.drawLine(node, geometry, false);
    },
    drawLinearRing: function (node, geometry) {
        return this.drawLine(node, geometry, true);
    },
    drawLine: function (node, geometry, closeLine) {
        this.setNodeDimension(node, geometry);
        var resolution = this.getResolution();
        var numComponents = geometry.components.length;
        var parts = new Array(numComponents);
        var comp, x, y;
        for (var i = 0; i < numComponents; i++) {
            comp = geometry.components[i];
            x = (comp.x / resolution - this.offset.x);
            y = (comp.y / resolution - this.offset.y);
            parts[i] = " " + x.toFixed() + "," + y.toFixed() + " l ";
        }
        var end = (closeLine) ? " x e" : " e";
        node.path = "m" + parts.join("") + end;
        return node;
    },
    drawPolygon: function (node, geometry) {
        this.setNodeDimension(node, geometry);
        var resolution = this.getResolution();
        var path = [];
        var linearRing, i, j, len, ilen, comp, x, y;
        for (j = 0, len = geometry.components.length; j < len; j++) {
            linearRing = geometry.components[j];
            path.push("m");
            for (i = 0, ilen = linearRing.components.length; i < ilen; i++) {
                comp = linearRing.components[i];
                x = comp.x / resolution - this.offset.x;
                y = comp.y / resolution - this.offset.y;
                path.push(" " + x.toFixed() + "," + y.toFixed());
                if (i == 0) {
                    path.push(" l");
                }
            }
            path.push(" x ");
        }
        path.push("e");
        node.path = path.join("");
        return node;
    },
    drawRectangle: function (node, geometry) {
        var resolution = this.getResolution();
        node.style.left = (geometry.x / resolution - this.offset.x) + "px";
        node.style.top = (geometry.y / resolution - this.offset.y) + "px";
        node.style.width = geometry.width / resolution + "px";
        node.style.height = geometry.height / resolution + "px";
        return node;
    },
    drawSurface: function (node, geometry) {
        this.setNodeDimension(node, geometry);
        var resolution = this.getResolution();
        var path = [];
        var comp, x, y;
        for (var i = 0, len = geometry.components.length; i < len; i++) {
            comp = geometry.components[i];
            x = comp.x / resolution - this.offset.x;
            y = comp.y / resolution - this.offset.y;
            if ((i % 3) == 0 && (i / 3) == 0) {
                path.push("m");
            } else if ((i % 3) == 1) {
                path.push(" c");
            }
            path.push(" " + x + "," + y);
        }
        path.push(" x e");
        node.path = path.join("");
        return node;
    },
    importSymbol: function (graphicName) {
        var id = this.container.id + "-" + graphicName;
        var cache = this.symbolCache[id];
        if (cache) {
            return cache;
        }
        var symbol = OpenLayers.Renderer.symbol[graphicName];
        if (!symbol) {
            throw new Error(graphicName + ' is not a valid symbol name');
            return;
        }
        var symbolExtent = new OpenLayers.Bounds(Number.MAX_VALUE, Number.MAX_VALUE, 0, 0);
        var pathitems = ["m"];
        for (var i = 0; i < symbol.length; i = i + 2) {
            x = symbol[i];
            y = symbol[i + 1];
            symbolExtent.left = Math.min(symbolExtent.left, x);
            symbolExtent.bottom = Math.min(symbolExtent.bottom, y);
            symbolExtent.right = Math.max(symbolExtent.right, x);
            symbolExtent.top = Math.max(symbolExtent.top, y);
            pathitems.push(x);
            pathitems.push(y);
            if (i == 0) {
                pathitems.push("l");
            }
        }
        pathitems.push("x e");
        var path = pathitems.join(" ");
        cache = {
            path: path,
            extent: symbolExtent
        };
        this.symbolCache[id] = cache;
        return cache;
    },
    CLASS_NAME: "OpenLayers.Renderer.VML"
});
OpenLayers.Layer.Vector = OpenLayers.Class(OpenLayers.Layer, {
    EVENT_TYPES: ["beforefeatureadded", "beforefeaturesadded", "featureadded", "featuresadded", "beforefeatureremoved", "featureremoved", "featuresremoved", "beforefeatureselected", "featureselected", "featureunselected", "beforefeaturemodified", "featuremodified", "afterfeaturemodified", "refresh"],
    isBaseLayer: false,
    isFixed: false,
    isVector: true,
    features: null,
    selectedFeatures: null,
    unrenderedFeatures: null,
    reportError: true,
    style: null,
    styleMap: null,
    strategies: null,
    protocol: null,
    renderers: ['SVG', 'VML', 'Canvas'],
    renderer: null,
    rendererOptions: null,
    geometryType: null,
    drawn: false,
    initialize: function (name, options) {
        this.EVENT_TYPES = OpenLayers.Layer.Vector.prototype.EVENT_TYPES.concat(OpenLayers.Layer.prototype.EVENT_TYPES);
        OpenLayers.Layer.prototype.initialize.apply(this, arguments);
        if (!this.renderer || !this.renderer.supported()) {
            this.assignRenderer();
        }
        if (!this.renderer || !this.renderer.supported()) {
            this.renderer = null;
            this.displayError();
        }
        if (!this.styleMap) {
            this.styleMap = new OpenLayers.StyleMap();
        }
        this.features = [];
        this.selectedFeatures = [];
        this.unrenderedFeatures = {};
        if (this.strategies) {
            for (var i = 0, len = this.strategies.length; i < len; i++) {
                this.strategies[i].setLayer(this);
            }
        }
    },
    destroy: function () {
        if (this.strategies) {
            var strategy, i, len;
            for (i = 0, len = this.strategies.length; i < len; i++) {
                strategy = this.strategies[i];
                if (strategy.autoDestroy) {
                    strategy.destroy();
                }
            }
            this.strategies = null;
        }
        if (this.protocol) {
            if (this.protocol.autoDestroy) {
                this.protocol.destroy();
            }
            this.protocol = null;
        }
        this.destroyFeatures();
        this.features = null;
        this.selectedFeatures = null;
        this.unrenderedFeatures = null;
        if (this.renderer) {
            this.renderer.destroy();
        }
        this.renderer = null;
        this.geometryType = null;
        this.drawn = null;
        OpenLayers.Layer.prototype.destroy.apply(this, arguments);
    },
    refresh: function (obj) {
        if (this.inRange && this.visibility) {
            this.events.triggerEvent("refresh", obj);
        }
    },
    assignRenderer: function () {
        for (var i = 0, len = this.renderers.length; i < this.renderers.length; i++) {
            var rendererClass = OpenLayers.Renderer[this.renderers[i]];
            if (rendererClass && rendererClass.prototype.supported()) {
                this.renderer = new rendererClass(this.div, this.rendererOptions);
                break;
            }
        }
    },
    displayError: function () {
        if (this.reportError) {
            OpenLayers.Console.userError(OpenLayers.i18n("browserNotSupported", {
                'renderers': this.renderers.join("\n")
            }));
        }
    },
    setMap: function (map) {
        OpenLayers.Layer.prototype.setMap.apply(this, arguments);
        if (!this.renderer) {
            this.map.removeLayer(this);
        } else {
            this.renderer.map = this.map;
            this.renderer.setSize(this.map.getSize());
        }
        if (this.strategies) {
            var strategy, i, len;
            for (i = 0, len = this.strategies.length; i < len; i++) {
                strategy = this.strategies[i];
                if (strategy.autoActivate) {
                    strategy.activate();
                }
            }
        }
    },
    removeMap: function (map) {
        if (this.strategies) {
            var strategy, i, len;
            for (i = 0, len = this.strategies.length; i < len; i++) {
                strategy = this.strategies[i];
                if (strategy.autoActivate) {
                    strategy.deactivate();
                }
            }
        }
    },
    onMapResize: function () {
        OpenLayers.Layer.prototype.onMapResize.apply(this, arguments);
        this.renderer.setSize(this.map.getSize());
    },
    moveTo: function (bounds, zoomChanged, dragging) {
        OpenLayers.Layer.prototype.moveTo.apply(this, arguments);
        var coordSysUnchanged = true;
        if (!dragging) {
            this.renderer.root.style.visibility = "hidden";
            this.div.style.left = -parseInt(this.map.layerContainerDiv.style.left) + "px";
            this.div.style.top = -parseInt(this.map.layerContainerDiv.style.top) + "px";
            var extent = this.map.getExtent();
            coordSysUnchanged = this.renderer.setExtent(extent, zoomChanged);
            this.renderer.root.style.visibility = "visible";
            if (navigator.userAgent.toLowerCase().indexOf("gecko") != -1) {
                this.div.scrollLeft = this.div.scrollLeft;
            }
            if (!zoomChanged && coordSysUnchanged) {
                for (var i in this.unrenderedFeatures) {
                    var feature = this.unrenderedFeatures[i];
                    this.drawFeature(feature);
                }
            }
        }
        if (!this.drawn || zoomChanged || !coordSysUnchanged) {
            this.drawn = true;
            var feature;
            for (var i = 0, len = this.features.length; i < len; i++) {
                if (i != (this.features.length - 1)) {
                    this.renderer.locked = true;
                } else {
                    this.renderer.locked = false;
                }
                feature = this.features[i];
                this.drawFeature(feature);
            }
        }
    },
    addFeatures: function (features, options) {
        if (!(features instanceof Array)) {
            features = [features];
        }
        var notify = !options || !options.silent;
        if (notify) {
            var event = {
                features: features
            };
            var ret = this.events.triggerEvent("beforefeaturesadded", event);
            if (ret === false) {
                return;
            }
            features = event.features;
        }
        for (var i = 0, len = features.length; i < len; i++) {
            if (i != (features.length - 1)) {
                this.renderer.locked = true;
            } else {
                this.renderer.locked = false;
            }
            var feature = features[i];
            if (this.geometryType && !(feature.geometry instanceof this.geometryType)) {
                var throwStr = OpenLayers.i18n('componentShouldBe', {
                    'geomType': this.geometryType.prototype.CLASS_NAME
                });
                throw throwStr;
            }
            this.features.push(feature);
            feature.layer = this;
            if (!feature.style && this.style) {
                feature.style = OpenLayers.Util.extend({}, this.style);
            }
            if (notify) {
                if (this.events.triggerEvent("beforefeatureadded", {
                    feature: feature
                }) === false) {
                    continue;
                };
                this.preFeatureInsert(feature);
            }
            if (this.drawn) {
                this.drawFeature(feature);
            }
            if (notify) {
                this.events.triggerEvent("featureadded", {
                    feature: feature
                });
                this.onFeatureInsert(feature);
            }
        }
        if (notify) {
            this.events.triggerEvent("featuresadded", {
                features: features
            });
        }
    },
    removeFeatures: function (features, options) {
        if (!features || features.length === 0) {
            return;
        }
        if (!(features instanceof Array)) {
            features = [features];
        }
        var notify = !options || !options.silent;
        for (var i = features.length - 1; i >= 0; i--) {
            if (i != 0 && features[i - 1].geometry) {
                this.renderer.locked = true;
            } else {
                this.renderer.locked = false;
            }
            var feature = features[i];
            delete this.unrenderedFeatures[feature.id];
            if (notify) {
                this.events.triggerEvent("beforefeatureremoved", {
                    feature: feature
                });
            }
            this.features = OpenLayers.Util.removeItem(this.features, feature);
            feature.layer = null;
            if (feature.geometry) {
                this.renderer.eraseGeometry(feature.geometry);
            }
            if (OpenLayers.Util.indexOf(this.selectedFeatures, feature) != -1) {
                OpenLayers.Util.removeItem(this.selectedFeatures, feature);
            }
            if (notify) {
                this.events.triggerEvent("featureremoved", {
                    feature: feature
                });
            }
        }
        if (notify) {
            this.events.triggerEvent("featuresremoved", {
                features: features
            });
        }
    },
    destroyFeatures: function (features, options) {
        var all = (features == undefined);
        if (all) {
            features = this.features;
        }
        if (features) {
            this.removeFeatures(features, options);
            for (var i = features.length - 1; i >= 0; i--) {
                features[i].destroy();
            }
        }
    },
    drawFeature: function (feature, style) {
        if (typeof style != "object") {
            var renderIntent = typeof style == "string" ? style : feature.renderIntent;
            style = feature.style || this.style;
            if (!style) {
                style = this.styleMap.createSymbolizer(feature, renderIntent);
            }
        }
        if (!this.renderer.drawFeature(feature, style)) {
            this.unrenderedFeatures[feature.id] = feature;
        } else {
            delete this.unrenderedFeatures[feature.id];
        };
    },
    eraseFeatures: function (features) {
        this.renderer.eraseFeatures(features);
    },
    getFeatureFromEvent: function (evt) {
        if (!this.renderer) {
            OpenLayers.Console.error(OpenLayers.i18n("getFeatureError"));
            return null;
        }
        var featureId = this.renderer.getFeatureIdFromEvent(evt);
        return this.getFeatureById(featureId);
    },
    getFeatureById: function (featureId) {
        var feature = null;
        for (var i = 0, len = this.features.length; i < len; ++i) {
            if (this.features[i].id == featureId) {
                feature = this.features[i];
                break;
            }
        }
        return feature;
    },
    onFeatureInsert: function (feature) {},
    preFeatureInsert: function (feature) {},
    getDataExtent: function () {
        var maxExtent = null;
        if (this.features && (this.features.length > 0)) {
            var maxExtent = this.features[0].geometry.getBounds();
            for (var i = 0, len = this.features.length; i < len; i++) {
                maxExtent.extend(this.features[i].geometry.getBounds());
            }
        }
        return maxExtent;
    },
    CLASS_NAME: "OpenLayers.Layer.Vector"
});
OpenLayers.Style = OpenLayers.Class({
    name: null,
    title: null,
    description: null,
    layerName: null,
    isDefault: false,
    rules: null,
    context: null,
    defaultStyle: null,
    propertyStyles: null,
    initialize: function (style, options) {
        this.rules = [];
        this.setDefaultStyle(style || OpenLayers.Feature.Vector.style["default"]);
        OpenLayers.Util.extend(this, options);
    },
    destroy: function () {
        for (var i = 0, len = this.rules.length; i < len; i++) {
            this.rules[i].destroy();
            this.rules[i] = null;
        }
        this.rules = null;
        this.defaultStyle = null;
    },
    createSymbolizer: function (feature) {
        var style = this.createLiterals(OpenLayers.Util.extend({}, this.defaultStyle), feature);
        var rules = this.rules;
        var rule, context;
        var elseRules = [];
        var appliedRules = false;
        for (var i = 0, len = rules.length; i < len; i++) {
            rule = rules[i];
            var applies = rule.evaluate(feature);
            if (applies) {
                if (rule instanceof OpenLayers.Rule && rule.elseFilter) {
                    elseRules.push(rule);
                } else {
                    appliedRules = true;
                    this.applySymbolizer(rule, style, feature);
                }
            }
        }
        if (appliedRules == false && elseRules.length > 0) {
            appliedRules = true;
            for (var i = 0, len = elseRules.length; i < len; i++) {
                this.applySymbolizer(elseRules[i], style, feature);
            }
        }
        if (rules.length > 0 && appliedRules == false) {
            style.display = "none";
        } else {
            style.display = "";
        }
        return style;
    },
    applySymbolizer: function (rule, style, feature) {
        var symbolizerPrefix = feature.geometry ? this.getSymbolizerPrefix(feature.geometry) : OpenLayers.Style.SYMBOLIZER_PREFIXES[0];
        var symbolizer = rule.symbolizer[symbolizerPrefix] || rule.symbolizer;
        return this.createLiterals(OpenLayers.Util.extend(style, symbolizer), feature);
    },
    createLiterals: function (style, feature) {
        var context = this.context || feature.attributes || feature.data;
        for (var i in this.propertyStyles) {
            style[i] = OpenLayers.Style.createLiteral(style[i], context, feature);
        }
        return style;
    },
    findPropertyStyles: function () {
        var propertyStyles = {};
        var style = this.defaultStyle;
        this.addPropertyStyles(propertyStyles, style);
        var rules = this.rules;
        var symbolizer, value;
        for (var i = 0, len = rules.length; i < len; i++) {
            var symbolizer = rules[i].symbolizer;
            for (var key in symbolizer) {
                value = symbolizer[key];
                if (typeof value == "object") {
                    this.addPropertyStyles(propertyStyles, value);
                } else {
                    this.addPropertyStyles(propertyStyles, symbolizer);
                    break;
                }
            }
        }
        return propertyStyles;
    },
    addPropertyStyles: function (propertyStyles, symbolizer) {
        var property;
        for (var key in symbolizer) {
            property = symbolizer[key];
            if (typeof property == "string" && property.match(/\$\{\w+\}/)) {
                propertyStyles[key] = true;
            }
        }
        return propertyStyles;
    },
    addRules: function (rules) {
        this.rules = this.rules.concat(rules);
        this.propertyStyles = this.findPropertyStyles();
    },
    setDefaultStyle: function (style) {
        this.defaultStyle = style;
        this.propertyStyles = this.findPropertyStyles();
    },
    getSymbolizerPrefix: function (geometry) {
        var prefixes = OpenLayers.Style.SYMBOLIZER_PREFIXES;
        for (var i = 0, len = prefixes.length; i < len; i++) {
            if (geometry.CLASS_NAME.indexOf(prefixes[i]) != -1) {
                return prefixes[i];
            }
        }
    },
    CLASS_NAME: "OpenLayers.Style"
});
OpenLayers.Style.createLiteral = function (value, context, feature) {
    if (typeof value == "string" && value.indexOf("${") != -1) {
        value = OpenLayers.String.format(value, context, [feature]);
        value = (isNaN(value) || !value) ? value : parseFloat(value);
    }
    return value;
};
OpenLayers.Style.SYMBOLIZER_PREFIXES = ['Point', 'Line', 'Polygon', 'Text'];
OpenLayers.StyleMap = OpenLayers.Class({
    styles: null,
    extendDefault: true,
    initialize: function (style, options) {
        this.styles = {
            "default": new OpenLayers.Style(OpenLayers.Feature.Vector.style["default"]),
            "select": new OpenLayers.Style(OpenLayers.Feature.Vector.style["select"]),
            "temporary": new OpenLayers.Style(OpenLayers.Feature.Vector.style["temporary"])
        };
        if (style instanceof OpenLayers.Style) {
            this.styles["default"] = style;
            this.styles["select"] = style;
            this.styles["temporary"] = style;
        } else if (typeof style == "object") {
            for (var key in style) {
                if (style[key] instanceof OpenLayers.Style) {
                    this.styles[key] = style[key];
                } else if (typeof style[key] == "object") {
                    this.styles[key] = new OpenLayers.Style(style[key]);
                } else {
                    this.styles["default"] = new OpenLayers.Style(style);
                    this.styles["select"] = new OpenLayers.Style(style);
                    this.styles["temporary"] = new OpenLayers.Style(style);
                    break;
                }
            }
        }
        OpenLayers.Util.extend(this, options);
    },
    destroy: function () {
        for (var key in this.styles) {
            this.styles[key].destroy();
        }
        this.styles = null;
    },
    createSymbolizer: function (feature, intent) {
        if (!feature) {
            feature = new OpenLayers.Feature.Vector();
        }
        if (!this.styles[intent]) {
            intent = "default";
        }
        feature.renderIntent = intent;
        var defaultSymbolizer = {};
        if (this.extendDefault && intent != "default") {
            defaultSymbolizer = this.styles["default"].createSymbolizer(feature);
        }
        return OpenLayers.Util.extend(defaultSymbolizer, this.styles[intent].createSymbolizer(feature));
    },
    addUniqueValueRules: function (renderIntent, property, symbolizers, context) {
        var rules = [];
        for (var value in symbolizers) {
            rules.push(new OpenLayers.Rule({
                symbolizer: symbolizers[value],
                context: context,
                filter: new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.EQUAL_TO,
                    property: property,
                    value: value
                })
            }));
        }
        this.styles[renderIntent].addRules(rules);
    },
    CLASS_NAME: "OpenLayers.StyleMap"
});
OpenLayers.Format = OpenLayers.Class({
    options: null,
    externalProjection: null,
    internalProjection: null,
    initialize: function (options) {
        OpenLayers.Util.extend(this, options);
        this.options = options;
    },
    destroy: function () {},
    read: function (data) {
        OpenLayers.Console.userError(OpenLayers.i18n("readNotImplemented"));
    },
    write: function (object) {
        OpenLayers.Console.userError(OpenLayers.i18n("writeNotImplemented"));
    },
    CLASS_NAME: "OpenLayers.Format"
});
OpenLayers.Format.WKT = OpenLayers.Class(OpenLayers.Format, {
    initialize: function (options) {
        this.regExes = {
            'typeStr': /^\s*(\w+)\s*\(\s*(.*)\s*\)\s*$/,
            'spaces': /\s+/,
            'parenComma': /\)\s*,\s*\(/,
            'doubleParenComma': /\)\s*\)\s*,\s*\(\s*\(/,
            'trimParens': /^\s*\(?(.*?)\)?\s*$/
        };
        OpenLayers.Format.prototype.initialize.apply(this, [options]);
    },
    read: function (wkt) {
        var features, type, str;
        var matches = this.regExes.typeStr.exec(wkt);
        if (matches) {
            type = matches[1].toLowerCase();
            str = matches[2];
            if (this.parse[type]) {
                features = this.parse[type].apply(this, [str]);
            }
            if (this.internalProjection && this.externalProjection) {
                if (features && features.CLASS_NAME == "OpenLayers.Feature.Vector") {
                    features.geometry.transform(this.externalProjection, this.internalProjection);
                } else if (features && type != "geometrycollection" && typeof features == "object") {
                    for (var i = 0, len = features.length; i < len; i++) {
                        var component = features[i];
                        component.geometry.transform(this.externalProjection, this.internalProjection);
                    }
                }
            }
        }
        return features;
    },
    write: function (features) {
        var collection, geometry, type, data, isCollection;
        if (features.constructor == Array) {
            collection = features;
            isCollection = true;
        } else {
            collection = [features];
            isCollection = false;
        }
        var pieces = [];
        if (isCollection) {
            pieces.push('GEOMETRYCOLLECTION(');
        }
        for (var i = 0, len = collection.length; i < len; ++i) {
            if (isCollection && i > 0) {
                pieces.push(',');
            }
            geometry = collection[i].geometry;
            type = geometry.CLASS_NAME.split('.')[2].toLowerCase();
            if (!this.extract[type]) {
                return null;
            }
            if (this.internalProjection && this.externalProjection) {
                geometry = geometry.clone();
                geometry.transform(this.internalProjection, this.externalProjection);
            }
            data = this.extract[type].apply(this, [geometry]);
            pieces.push(type.toUpperCase() + '(' + data + ')');
        }
        if (isCollection) {
            pieces.push(')');
        }
        return pieces.join('');
    },
    extract: {
        'point': function (point) {
            return point.x + ' ' + point.y;
        },
        'multipoint': function (multipoint) {
            var array = [];
            for (var i = 0, len = multipoint.components.length; i < len; ++i) {
                array.push(this.extract.point.apply(this, [multipoint.components[i]]));
            }
            return array.join(',');
        },
        'linestring': function (linestring) {
            var array = [];
            for (var i = 0, len = linestring.components.length; i < len; ++i) {
                array.push(this.extract.point.apply(this, [linestring.components[i]]));
            }
            return array.join(',');
        },
        'multilinestring': function (multilinestring) {
            var array = [];
            for (var i = 0, len = multilinestring.components.length; i < len; ++i) {
                array.push('(' + this.extract.linestring.apply(this, [multilinestring.components[i]]) + ')');
            }
            return array.join(',');
        },
        'polygon': function (polygon) {
            var array = [];
            for (var i = 0, len = polygon.components.length; i < len; ++i) {
                array.push('(' + this.extract.linestring.apply(this, [polygon.components[i]]) + ')');
            }
            return array.join(',');
        },
        'multipolygon': function (multipolygon) {
            var array = [];
            for (var i = 0, len = multipolygon.components.length; i < len; ++i) {
                array.push('(' + this.extract.polygon.apply(this, [multipolygon.components[i]]) + ')');
            }
            return array.join(',');
        }
    },
    parse: {
        'point': function (str) {
            var coords = OpenLayers.String.trim(str).split(this.regExes.spaces);
            return new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(coords[0], coords[1]));
        },
        'multipoint': function (str) {
            var points = OpenLayers.String.trim(str).split(',');
            var components = [];
            for (var i = 0, len = points.length; i < len; ++i) {
                components.push(this.parse.point.apply(this, [points[i]]).geometry);
            }
            return new OpenLayers.Feature.Vector(new OpenLayers.Geometry.MultiPoint(components));
        },
        'linestring': function (str) {
            var points = OpenLayers.String.trim(str).split(',');
            var components = [];
            for (var i = 0, len = points.length; i < len; ++i) {
                components.push(this.parse.point.apply(this, [points[i]]).geometry);
            }
            return new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LineString(components));
        },
        'multilinestring': function (str) {
            var line;
            var lines = OpenLayers.String.trim(str).split(this.regExes.parenComma);
            var components = [];
            for (var i = 0, len = lines.length; i < len; ++i) {
                line = lines[i].replace(this.regExes.trimParens, '$1');
                components.push(this.parse.linestring.apply(this, [line]).geometry);
            }
            return new OpenLayers.Feature.Vector(new OpenLayers.Geometry.MultiLineString(components));
        },
        'polygon': function (str) {
            var ring, linestring, linearring;
            var rings = OpenLayers.String.trim(str).split(this.regExes.parenComma);
            var components = [];
            for (var i = 0, len = rings.length; i < len; ++i) {
                ring = rings[i].replace(this.regExes.trimParens, '$1');
                linestring = this.parse.linestring.apply(this, [ring]).geometry;
                linearring = new OpenLayers.Geometry.LinearRing(linestring.components);
                components.push(linearring);
            }
            return new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Polygon(components));
        },
        'multipolygon': function (str) {
            var polygon;
            var polygons = OpenLayers.String.trim(str).split(this.regExes.doubleParenComma);
            var components = [];
            for (var i = 0, len = polygons.length; i < len; ++i) {
                polygon = polygons[i].replace(this.regExes.trimParens, '$1');
                components.push(this.parse.polygon.apply(this, [polygon]).geometry);
            }
            return new OpenLayers.Feature.Vector(new OpenLayers.Geometry.MultiPolygon(components));
        },
        'geometrycollection': function (str) {
            str = str.replace(/,\s*([A-Za-z])/g, '|$1');
            var wktArray = OpenLayers.String.trim(str).split('|');
            var components = [];
            for (var i = 0, len = wktArray.length; i < len; ++i) {
                components.push(OpenLayers.Format.WKT.prototype.read.apply(this, [wktArray[i]]));
            }
            return components;
        }
    },
    CLASS_NAME: "OpenLayers.Format.WKT"
});
OpenLayers.Lang = {
    code: null,
    defaultCode: "en",
    getCode: function () {
        if (!OpenLayers.Lang.code) {
            OpenLayers.Lang.setCode();
        }
        return OpenLayers.Lang.code;
    },
    setCode: function (code) {
        var lang;
        if (!code) {
            code = (OpenLayers.Util.getBrowserName() == "msie") ? navigator.userLanguage : navigator.language;
        }
        var parts = code.split('-');
        parts[0] = parts[0].toLowerCase();
        if (typeof OpenLayers.Lang[parts[0]] == "object") {
            lang = parts[0];
        }
        if (parts[1]) {
            var testLang = parts[0] + '-' + parts[1].toUpperCase();
            if (typeof OpenLayers.Lang[testLang] == "object") {
                lang = testLang;
            }
        }
        if (!lang) {
            OpenLayers.Console.warn('Failed to find OpenLayers.Lang.' + parts.join("-") + ' dictionary, falling back to default language');
            lang = OpenLayers.Lang.defaultCode;
        }
        OpenLayers.Lang.code = lang;
    },
    translate: function (key, context) {
        var dictionary = OpenLayers.Lang[OpenLayers.Lang.getCode()];
        var message = dictionary[key];
        if (!message) {
            message = key;
        }
        if (context) {
            message = OpenLayers.String.format(message, context);
        }
        return message;
    }
};
OpenLayers.i18n = OpenLayers.Lang.translate;
OpenLayers.Lang.en = {
    'unhandledRequest': "Unhandled request return ${statusText}",
    'permalink': "Permalink",
    'overlays': "Overlays",
    'baseLayer': "Base Layer",
    'sameProjection': "The overview map only works when it is in the same projection as the main map",
    'readNotImplemented': "Read not implemented.",
    'writeNotImplemented': "Write not implemented.",
    'noFID': "Can't update a feature for which there is no FID.",
    'errorLoadingGML': "Error in loading GML file ${url}",
    'browserNotSupported': "Your browser does not support vector rendering. Currently supported renderers are:\n${renderers}",
    'componentShouldBe': "addFeatures : component should be an ${geomType}",
    'getFeatureError': "getFeatureFromEvent called on layer with no renderer. This usually means you " + "destroyed a layer, but not some handler which is associated with it.",
    'minZoomLevelError': "The minZoomLevel property is only intended for use " + "with the FixedZoomLevels-descendent layers. That this " + "wfs layer checks for minZoomLevel is a relic of the" + "past. We cannot, however, remove it without possibly " + "breaking OL based applications that may depend on it." + " Therefore we are deprecating it -- the minZoomLevel " + "check below will be removed at 3.0. Please instead " + "use min/max resolution setting as described here: " + "http://trac.openlayers.org/wiki/SettingZoomLevels",
    'commitSuccess': "WFS Transaction: SUCCESS ${response}",
    'commitFailed': "WFS Transaction: FAILED ${response}",
    'googleWarning': "The Google Layer was unable to load correctly.<br><br>" + "To get rid of this message, select a new BaseLayer " + "in the layer switcher in the upper-right corner.<br><br>" + "Most likely, this is because the Google Maps library " + "script was either not included, or does not contain the " + "correct API key for your site.<br><br>" + "Developers: For help getting this working correctly, " + "<a href='http://trac.openlayers.org/wiki/Google' " + "target='_blank'>click here</a>",
    'getLayerWarning': "The ${layerType} Layer was unable to load correctly.<br><br>" + "To get rid of this message, select a new BaseLayer " + "in the layer switcher in the upper-right corner.<br><br>" + "Most likely, this is because the ${layerLib} library " + "script was not correctly included.<br><br>" + "Developers: For help getting this working correctly, " + "<a href='http://trac.openlayers.org/wiki/${layerLib}' " + "target='_blank'>click here</a>",
    'scale': "Scale = 1 : ${scaleDenom}",
    'layerAlreadyAdded': "You tried to add the layer: ${layerName} to the map, but it has already been added",
    'reprojectDeprecated': "You are using the 'reproject' option " + "on the ${layerName} layer. This option is deprecated: " + "its use was designed to support displaying data over commercial " + "basemaps, but that functionality should now be achieved by using " + "Spherical Mercator support. More information is available from " + "http://trac.openlayers.org/wiki/SphericalMercator.",
    'methodDeprecated': "This method has been deprecated and will be removed in 3.0. " + "Please use ${newMethod} instead.",
    'boundsAddError': "You must pass both x and y values to the add function.",
    'lonlatAddError': "You must pass both lon and lat values to the add function.",
    'pixelAddError': "You must pass both x and y values to the add function.",
    'unsupportedGeometryType': "Unsupported geometry type: ${geomType}",
    'pagePositionFailed': "OpenLayers.Util.pagePosition failed: element with id ${elemId} may be misplaced.",
    'end': '',
    'filterEvaluateNotImplemented': "evaluate is not implemented for this filter type."
};
SAPO.Maps.Control = {};
SAPO.Maps.Popup = {};
SAPO.Maps.Markers = {};
SAPO.Maps.Marker = {};
SAPO.Maps.Handler = {};
SAPO.Maps.Overlay = {};
SAPO.Maps.Directions = {};
SAPO.Maps.Map = OpenLayers.Class(OpenLayers.Map, {
    baseLayers: {
        NORMAL_MAP: null,
        SATELLITE_MAP: null,
        HYBRID_MAP: null,
        TERRAIN_MAP: null
    },
    draggingenabled: true,
    zoomWheelEnabled: true,
    borders: null,
    markers: null,
    vectorLayer: null,
    dragControl: null,
    featureEventHandler: null,
    rightClicksControl: null,
    sapoSelectedBaseLayer: null,
    initialize: function (container, opts) {
        if (opts && opts.borders) {
            this.borders = opts.borders;
        } else {
            this.borders = {
                left: 0,
                top: 0,
                bottom: 0,
                right: 0
            };
        }
        OpenLayers.Map.prototype.initialize.apply(this, [container,
        {
            tileSize: SAPO.Maps.Config.TILE_SIZE,
            controls: [new OpenLayers.Control.Navigation({
                handleRightClicks: true,
                borders: this.borders
            })],
            theme: null
        }]);
        var __SAPO_Layer_Opts = {
            maxExtent: SAPO.Maps.Config.MAX_EXTENT,
            minResolution: SAPO.Maps.Config.MIN_RESOLUTION,
            maxResolution: SAPO.Maps.Config.MAX_RESOLUTION,
            resolutions: SAPO.Maps.Config.RESOLUTIONS,
            units: SAPO.Maps.Config.UNITS,
            numZoomLevels: SAPO.Maps.Config.NUMZOOMLEVELS,
            projection: SAPO.Maps.Config.PROJECTION
        };
        var __SAPO_Layer_Jpeg_Opts = OpenLayers.Util.extend({}, __SAPO_Layer_Opts);
        __SAPO_Layer_Jpeg_Opts.format = 'image/jpeg';
        var __SAPO_TerrainLayer_Opts = {
            maxExtent: SAPO.Maps.Config.MAX_EXTENT,
            minResolution: SAPO.Maps.Config.MIN_RESOLUTION_TERRAIN,
            maxResolution: SAPO.Maps.Config.MAX_RESOLUTION,
            resolutions: SAPO.Maps.Config.RESOLUTIONS_TERRAIN,
            units: SAPO.Maps.Config.UNITS,
            numZoomLevels: SAPO.Maps.Config.NUMZOOMLEVELS_TERRAIN,
            projection: SAPO.Maps.Config.PROJECTION
        };
        this.baseLayers = {};
        this.baseLayers.NORMAL_MAP = new OpenLayers.Layer.TileCache('Map', SAPO.Maps.Config.WEB_SERVERS, 'map', __SAPO_Layer_Opts);
        this.baseLayers.SATELLITE_MAP = new OpenLayers.Layer.TileCache('Satellite', SAPO.Maps.Config.WEB_SERVERS, 'satellite', __SAPO_Layer_Jpeg_Opts);
        this.baseLayers.HYBRID_MAP = {
            baseLayer: this.baseLayers.SATELLITE_MAP,
            labels: new OpenLayers.Layer.TileCache('Hybrid', SAPO.Maps.Config.WEB_SERVERS, 'hybrid', __SAPO_Layer_Opts)
        };
        this.baseLayers.HYBRID_MAP.labels.transparent = true;
        this.baseLayers.HYBRID_MAP.labels.isBaseLayer = false;
        this.baseLayers.TERRAIN_MAP = new OpenLayers.Layer.TileCache('Terrain', SAPO.Maps.Config.WEB_SERVERS, 'terrain', __SAPO_TerrainLayer_Opts);
        this.addLayer(this.baseLayers.NORMAL_MAP);
        this.addLayer(this.baseLayers.SATELLITE_MAP);
        this.addLayer(this.baseLayers.HYBRID_MAP.labels);
        this.addLayer(this.baseLayers.TERRAIN_MAP);
        this.setBaseLayer(this.baseLayers.NORMAL_MAP);
        this.setCenter(new OpenLayers.LonLat(-904709.086279709, 4823097.824952432), 4);
        OpenLayers.Map.prototype.addControl.apply(this, [new SAPO.Maps.Control.Scale()]);
        OpenLayers.Map.prototype.addControl.apply(this, [new SAPO.Maps.Control.PermanentLink()]);
        this.addListenersControls();
        if (opts) {
            if (opts.isDraggable === false) {
                this.disableDragging();
            }
            if (opts.isWheelEnabled === false) {
                this.disableScrollWheelZoom();
            }
        }
    },
    addListenersControls: function () {
        this.dragControl = new SAPO.Maps.Control.DragFeature();
        this.featureEventHandler = new SAPO.Maps.Control.FeatureEventHandlers();
        this.addControl(this.dragControl);
        this.addControl(this.featureEventHandler);
        this.dragControl.activate();
        this.featureEventHandler.activate();
        this.events.addEventType('singlerightclick');
        this.rightClicksControl = new SAPO.Maps.Control.RightClicks({
            singlerightclick: {
                func: this.events.triggerEvent,
                context: this.events,
                params: ['singlerightclick']
            },
            dblrightclick: {
                func: this.events.triggerEvent,
                context: this.events,
                params: ['dblrightclick']
            }
        });
        this.addControl(this.rightClicksControl);
    },
    isValidZoomLevel: function (zoomLevel) {
        var valid = OpenLayers.Map.prototype.isValidZoomLevel.apply(this, [zoomLevel]);
        return (zoomLevel >= SAPO.Maps.Config.MIN_ZOOM) && valid;
    },
    checkIsADefinedBaseLayer: function (layer) {
        for (var l in this.baseLayers) {
            if (this.baseLayers[l] == layer) {
                return true;
            }
        }
        return false;
    },
    setBaseLayer: function (newBaseLayer) {
        if (this.sapoSelectedBaseLayer) {
            if (this.sapoSelectedBaseLayer.labels) {
                OpenLayers.Map.prototype.removeLayer.apply(this, [this.sapoSelectedBaseLayer.labels]);
            }
        }
        this.sapoSelectedBaseLayer = null;
        var layer = newBaseLayer;
        if (this.checkIsADefinedBaseLayer(newBaseLayer) === true && newBaseLayer.baseLayer) {
            layer = newBaseLayer.baseLayer;
            if (newBaseLayer.labels) {
                this.sapoSelectedBaseLayer = newBaseLayer;
                this.addLayer(newBaseLayer.labels);
            }
        }
        OpenLayers.Map.prototype.setBaseLayer.apply(this, [layer]);
    },
    getBaseLayers: function () {
        return this.baseLayers;
    },
    enableDragging: function () {
        this.draggingenabled = true;
        var controls = this.getControlsByClass('OpenLayers.Control.Navigation');
        for (var i = 0; i < controls.length; ++i) {
            controls[i].activate();
        }
    },
    disableDragging: function () {
        this.draggingenabled = false;
        var controls = this.getControlsByClass('OpenLayers.Control.Navigation');
        for (var i = 0; i < controls.length; ++i) {
            controls[i].deactivate();
        }
    },
    draggingEnabled: function () {
        return this.draggingenabled;
    },
    enableScrollWheelZoom: function () {
        this.zoomWheelEnabled = true;
        var controls = this.getControlsByClass('OpenLayers.Control.Navigation');
        for (var i = 0; i < controls.length; ++i) {
            controls[i].enableZoomWheel();
        }
    },
    disableScrollWheelZoom: function () {
        this.zoomWheelEnabled = false;
        var controls = this.getControlsByClass('OpenLayers.Control.Navigation');
        for (var i = 0; i < controls.length; ++i) {
            controls[i].disableZoomWheel();
        }
    },
    scrollWheelZoomEnabled: function () {
        return this.zoomWheelEnabled;
    },
    addLayer: function (layer) {
        var _newlayer = layer;
        if (this.checkIsADefinedBaseLayer(layer) === true && layer.baselayer) {
            _newlayer = layer.baselayer;
        }
        OpenLayers.Map.prototype.addLayer.apply(this, [_newlayer]);
    },
    removeLayer: function (layer, setNewBaseLayer) {
        if (this.checkIsADefinedBaseLayer(layer) === true && layer.baselayer) {
            if (layer.labels) {
                OpenLayers.Map.prototype.removeLayer.apply(this, [layer.labels, setNewBaseLayer]);
            }
            OpenLayers.Map.prototype.removeLayer.apply(this, [layer.baselayer, setNewBaseLayer]);
            return;
        }
        OpenLayers.Map.prototype.removeLayer.apply(this, arguments);
    },
    addMarkers: function (markers) {
        this.addLayer(markers.layer);
        markers.setMap(this);
    },
    addOverlay: function (overlay) {
        if (!this.vectorLayer) {
            this.vectorLayer = new OpenLayers.Layer.Vector('SAPO.Maps.Overlays.Layer');
            this.addLayer(this.vectorLayer);
        }
        var feature = overlay.getFeature();
        feature.overlay = overlay;
        this.vectorLayer.addFeatures([feature]);
        overlay.setLayer(this.vectorLayer);
    },
    removeOverlay: function (overlay) {
        var feature = overlay.getFeature();
        this.vectorLayer.removeFeatures([feature]);
        overlay.removed();
    },
    removeMarkers: function (markers) {
        markers.unloadLayer();
        this.removeLayer(markers.layer);
    },
    convertFormat: function (format) {
        format.externalProjection = new OpenLayers.Projection("EPSG:4326");
        format.internalProjection = new OpenLayers.Projection("EPSG:900913");
        return format;
    },
    getLonLatFromContainerPixel: function (px) {
        var lonlat = OpenLayers.Map.prototype.getLonLatFromPixel.apply(this, [px]);
        return lonlat.transform(new OpenLayers.Projection("EPSG:900913"), new OpenLayers.Projection("EPSG:4326"));
    },
    getContainerPixelFromLonLat: function (lonlat) {
        var coords = lonlat.clone().transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
        return OpenLayers.Map.prototype.getViewPortPxFromLonLat.apply(this, [coords]);
    },
    getBounds: function () {
        var size = this.getSize();
        var topLeft = this.getLonLatFromContainerPixel(new OpenLayers.Pixel(0, 0));
        var bottomRight = this.getLonLatFromContainerPixel(new OpenLayers.Pixel(size.w, size.h));
        return new OpenLayers.Bounds(topLeft.lon, bottomRight.lat, bottomRight.lon, topLeft.lat);
    },
    setBounds: function (bounds, closest) {
        var bbox = bounds.clone().transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
        closest = closest ? closest : false;
        this.zoomToExtent(bbox, closest);
    },
    getMapCenter: function () {
        var center = OpenLayers.Map.prototype.getCenter.apply(this, arguments);
        if (center) {
            var lonlat = center.clone();
            return lonlat.transform(new OpenLayers.Projection("EPSG:900913"), new OpenLayers.Projection("EPSG:4326"));
        }
        return null;
    },
    setMapCenter: function (lonlat, zoom) {
        if (zoom && zoom < 4) {
            zoom = 4;
        }
        var coords = lonlat.clone();
        coords.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
        OpenLayers.Map.prototype.setCenter.apply(this, [coords, zoom]);
    },
    CLASS_NAME: 'SAPO.Maps.Map'
});
SAPO.Maps.Config = {
    WEB_SERVERS: ['http://map1.mapas.sapo.pt/images', 'http://map2.mapas.sapo.pt/images', 'http://map3.mapas.sapo.pt/images', 'http://map4.mapas.sapo.pt/images', 'http://map5.mapas.sapo.pt/images', 'http://map6.mapas.sapo.pt/images', 'http://map7.mapas.sapo.pt/images', 'http://map8.mapas.sapo.pt/images'],
    MAX_EXTENT: new OpenLayers.Bounds(-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892),
    MIN_RESOLUTION: 0.29858214168548586,
    MIN_RESOLUTION_TERRAIN: 19.109257067871095,
    MAX_RESOLUTION: 9783.9396187500006,
    RESOLUTIONS: [156543.03390000001, 78271.516950000005, 39135.758475000002, 19567.879237500001, 9783.9396187500006, 4891.9698093750003, 2445.9849046875001, 1222.9924523437501, 611.49622617187504, 305.74811308593752, 152.87405654296876, 76.43702827148438, 38.21851413574219, 19.109257067871095, 9.5546285339355475, 4.7773142669677737, 2.3886571334838869, 1.1943285667419434, 0.59716428337097172, 0.29858214168548586],
    RESOLUTIONS_TERRAIN: [156543.03390000001, 78271.516950000005, 39135.758475000002, 19567.879237500001, 9783.9396187500006, 4891.9698093750003, 2445.9849046875001, 1222.9924523437501, 611.49622617187504, 305.74811308593752, 152.87405654296876, 76.43702827148438, 38.21851413574219, 19.109257067871095, 9.5546285339355475],
    UNITS: 'm',
    NUMZOOMLEVELS: 16,
    NUMZOOMLEVELS_TERRAIN: 11,
    MIN_ZOOM: 4,
    PROJECTION: new OpenLayers.Projection("EPSG:900913"),
    TILE_SIZE: new OpenLayers.Size(256, 256)
};
SAPO.Maps.Lang = {
    pt: {
        map: 'Mapa',
        satellite: 'Sat&eacute;lite',
        hybrid: 'H&iacute;brido',
        terrain: 'Terreno',
        directions_first_step_description: 'Siga por ',
        directions_step_forward: 'Continue',
        directions_step_forward_description: 'Continue para ',
        directions_step_left: 'Vire &agrave; esquerda',
        directions_step_left_description: 'Vire &agrave; esquerda para ',
        directions_step_right: 'Vire &agrave; direita',
        directions_step_right_description: 'Vire &agrave; direita para '
    },
    en: {
        map: 'Map',
        satellite: 'Satellite',
        hybrid: 'Hybrid',
        terrain: 'Terrain',
        directions_first_step_description: 'Go through ',
        directions_step_forward: 'Continue',
        directions_step_forward_description: 'Continue to ',
        directions_step_left: 'Turn left',
        directions_step_left_description: 'Turn left to ',
        directions_step_right: 'Turn right',
        directions_step_right_description: 'Turn right to '
    }
};
SAPO.Maps.Handler.Feature = OpenLayers.Class(OpenLayers.Handler, {
    EVENTMAP: {
        'click': {
            'in': 'click',
            'out': 'clickout'
        },
        'mousemove': {
            'in': 'over',
            'out': 'out'
        },
        'dblclick': {
            'in': 'dblclick',
            'out': null
        },
        'mousedown': {
            'in': null,
            'out': null
        },
        'mouseup': {
            'in': null,
            'out': null
        }
    },
    feature: null,
    lastFeature: null,
    lastMouseMoveEvent: null,
    ignoreInterval: null,
    periodicInterval: null,
    down: null,
    up: null,
    clickoutTolerance: 4,
    geometryTypes: null,
    stopClick: true,
    stopDown: true,
    stopUp: false,
    initialize: function (control, callbacks, options) {
        OpenLayers.Handler.prototype.initialize.apply(this, [control, callbacks, options]);
        this.lastMouseMoveEvent = {};
        this.numExecutors = 0;
    },
    mousedown: function (evt) {
        this.down = evt.xy;
        return this.handle(evt) ? !this.stopDown : true;
    },
    mouseup: function (evt) {
        this.up = evt.xy;
        return this.handle(evt) ? !this.stopUp : true;
    },
    click: function (evt) {
        return this.handle(evt) ? !this.stopClick : true;
    },
    mousemove: function (evt) {
        if (!this.callbacks.over && !this.callbacks.out) {
            return true;
        }
        this.myevt = {
            type: evt.type,
            xy: evt.xy
        };
        window.clearTimeout(this.ignoreInterval);
        this.ignoreInterval = window.setTimeout(function () {
            this.dealMousemove();
        }.bindObj(this), 100);
        if (!this.periodicInterval) {
            this.periodicInterval = window.setTimeout(function () {
                this.dealMousemove();
            }.bindObj(this), 50);
        }
    },
    dealMousemove: function () {
        if (this.myevt.type == "mousemove") {
            OpenLayers.Util.extend(this.lastMouseMoveEvent, this.myevt);
        }
        this.handle(this.myevt);
        window.clearTimeout(this.periodicInterval);
        this.periodicInterval = null;
        return true;
    },
    dblclick: function (evt) {
        return !this.handle(evt);
    },
    geometryTypeMatches: function (feature) {
        return !this.geometryTypes || OpenLayers.Util.indexOf(this.geometryTypes, feature.geometry.CLASS_NAME) > -1;
    },
    handle: function (evt) {
        var type = evt.type;
        var handled = false;
        var previouslyIn = !! (this.feature);
        var click = (type == "click" || type == "dblclick");
        this.feature = this.getFeatureFromEvent(evt);
        if (this.feature) {
            var inNew = (this.feature != this.lastFeature);
            if (this.geometryTypeMatches(this.feature)) {
                if (previouslyIn && inNew) {
                    this.triggerCallback(type, 'out', [this.lastFeature]);
                    this.triggerCallback(type, 'in', [this.feature]);
                } else if (!previouslyIn || click) {
                    this.triggerCallback(type, 'in', [this.feature]);
                }
                this.lastFeature = this.feature;
                handled = true;
            } else {
                if (previouslyIn && inNew || (click && this.lastFeature)) {
                    this.triggerCallback(type, 'out', [this.lastFeature]);
                }
                this.feature = null;
            }
        } else {
            if (previouslyIn || (click && this.lastFeature)) {
                this.triggerCallback(type, 'out', [this.lastFeature]);
            }
        }
        return handled;
    },
    getFeatureFromEvent: function (evt) {
        var features = this.control.features;
        if (!features) {
            return null;
        }
        var featureToReturn = [];
        var feature;
        var point;
        var latlon;
        for (var i = features.length - 1; i >= 0; --i) {
            feature = features[i];
            if (this.control.CLASS_NAME == "SAPO.Maps.Control.FeatureEventHandlers") {
                if (evt.type == "mousedown" || evt.type == "mouseup" || evt.type == "click") {
                    if (!feature._events.click && !feature._events.dblclick) {
                        continue;
                    }
                }
                if (evt.type == "mousemove") {
                    if (!feature._events.mouseover && !feature._events.mouseout) {
                        continue;
                    }
                }
            }
            if (feature.geometry.CLASS_NAME == "OpenLayers.Geometry.Point") {
                if (this.intersectsPoint(evt.xy, feature)) {
                    featureToReturn.push(feature);
                    if (evt.type == "mousemove") {
                        break;
                    }
                }
            } else {
                if (feature.geometry.CLASS_NAME == "OpenLayers.Geometry.LineString") {
                    if (this.intersectsLine(evt.xy, feature)) {
                        featureToReturn.push(feature);
                        if (evt.type == "mousemove") {
                            break;
                        }
                    }
                } else {
                    lonlat = feature.layer.getLonLatFromViewPortPx(evt.xy);
                    point = new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat);
                    if (!point) {
                        continue;
                    }
                    if (feature.geometry.intersects(point)) {
                        featureToReturn.push(feature);
                        if (evt.type == "mousemove") {
                            break;
                        }
                    }
                }
            }
        }
        if (featureToReturn.length === 0) {
            return null;
        }
        if (featureToReturn.length === 1) {
            return featureToReturn[0];
        }
        var upperFeature = featureToReturn[0];
        for (var j = 1; j < featureToReturn.length; ++j) {
            if (Number(featureToReturn[j].layer.getZIndex()) > Number(upperFeature.layer.getZIndex())) {
                upperFeature = featureToReturn[j];
            }
        }
        return upperFeature;
    },
    intersectsPoint: function (point, feature) {
        if (!point.x || !point.y) {
            return false;
        }
        var xy = feature.layer.getViewPortPxFromLonLat(new OpenLayers.LonLat(feature.geometry.x, feature.geometry.y));
        if (feature.style && feature.style.graphicWidth && feature.style.graphicHeight) {
            var width = feature.style.graphicWidth;
            var height = feature.style.graphicHeight;
            xy.x += feature.style.graphicXOffset ? feature.style.graphicXOffset + width / 2 : width / 2;
            xy.y += feature.style.graphicYOffset ? feature.style.graphicYOffset + height / 2 : height / 2;
            var edges = {
                top: xy.y + height / 2,
                right: xy.x + width / 2,
                bottom: xy.y - height / 2,
                left: xy.x - width / 2
            };
            if (point.x <= edges.right && point.x >= edges.left && point.y <= edges.top && point.y >= edges.bottom) {
                return true;
            }
        } else {
            if (feature.style && feature.style.graphicXOffset && feature.style.graphicYOffset) {
                xy.x += feature.style.graphicXOffset ? feature.style.graphicXOffset / 2 : 0;
                xy.y += feature.style.graphicYOffset ? feature.style.graphicYOffset / 2 : 0;
            }
            var radius = null;
            if (feature.style) {
                radius = feature.style.pointRadius ? feature.style.pointRadius : OpenLayers.Feature.Vector.style['default'].pointRadius;
            } else {
                radius = OpenLayers.Feature.Vector.style['default'].pointRadius;
            }
            if (Math.abs(point.x - xy.x) <= radius && Math.abs(point.y - xy.y) <= radius) {
                return true;
            }
        }
    },
    intersectsLine: function (point, feature) {
        if (!point.x || !point.y) {
            return false;
        }
        var segments = feature.geometry.getSortedSegments();
        var x1, y1, x2, y2;
        var px = point.x;
        var py = point.y;
        var xy;
        var distance = -1;
        var strokeWidth = null;
        for (i in segments) {
            xy = feature.layer.getViewPortPxFromLonLat(new OpenLayers.LonLat(segments[i].x1, segments[i].y1));
            x1 = xy.x;
            y1 = xy.y;
            xy = feature.layer.getViewPortPxFromLonLat(new OpenLayers.LonLat(segments[i].x2, segments[i].y2));
            x2 = xy.x;
            y2 = xy.y;
            distance = this.distanceBetweenLineAndPoint(x1, y1, x2, y2, px, py, feature.style.strokeWidth / 2);
            if (feature.style) {
                strokeWidth = feature.style.strokeWidth ? feature.style.strokeWidth : OpenLayers.Feature.Vector.style['default'].strokeWidth;
            } else {
                strokeWidth = OpenLayers.Feature.Vector.style['default'].strokeWidth;
            }
            if (distance != -1 && distance < strokeWidth / 2) {
                return true;
            }
        }
        return false;
    },
    distanceBetweenLineAndPoint: function (x1, y1, x2, y2, px, py, offset) {
        if (px < (Math.min(x1, x2) - offset)) {
            return -1;
        }
        if (px > (Math.max(x1, x2) + offset)) {
            return -1;
        }
        if (py < (Math.min(y1, y2) - offset)) {
            return -1;
        }
        if (py > (Math.max(y1, y2) + offset)) {
            return -1;
        }
        var u = (px - x1) * (x2 - x1) + (py - y1) * (y2 - y1);
        u /= Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2);
        var px_ = x1 + u * (x2 - x1);
        var py_ = y1 + u * (y2 - y1);
        var distance = Math.sqrt(Math.pow(px_ - px, 2) + Math.pow(py_ - py, 2));
        return distance;
    },
    triggerCallback: function (type, mode, args) {
        if (!this.EVENTMAP[type]) {
            return;
        }
        var key = this.EVENTMAP[type][mode];
        if (key) {
            if (type == 'click' && mode == 'out' && this.up && this.down) {
                var dpx = Math.sqrt(Math.pow(this.up.x - this.down.x, 2) + Math.pow(this.up.y - this.down.y, 2));
                if (dpx <= this.clickoutTolerance) {
                    this.callback(key, args);
                }
            } else {
                this.callback(key, args);
            }
        }
    },
    regenerateMouseMoveEvent: function (evt) {
        if (this.lastMouseMoveEvent.xy) {
            this.mousemove(this.lastMouseMoveEvent);
            return true;
        }
    },
    activate: function (byControl) {
        var activated = false;
        if (OpenLayers.Handler.prototype.activate.apply(this, arguments)) {
            this.moveLayerToTop();
            this.map.events.on({
                "removelayer": this.handleMapEvents,
                "changelayer": this.handleMapEvents,
                scope: this
            });
            activated = true;
        }
        if (!this.registeredEvent) {
            this.map.events.register("zoomend", this, this.regenerateMouseMoveEvent);
            this.registeredEvent = true;
        }
        return activated;
    },
    deactivate: function (byControl) {
        var deactivated = false;
        if (OpenLayers.Handler.prototype.deactivate.apply(this, arguments)) {
            this.moveLayerBack();
            this.down = null;
            this.up = null;
            this.map.events.un({
                "removelayer": this.handleMapEvents,
                "changelayer": this.handleMapEvents,
                scope: this
            });
            deactivated = true;
        }
        return deactivated;
    },
    handleMapEvents: function (evt) {
        if (!evt.property || evt.property == "order") {
            this.moveLayerToTop();
        }
    },
    moveLayerToTop: function () {},
    moveLayerBack: function () {},
    CLASS_NAME: "SAPO.Maps.Handler.Feature"
});
SAPO.Maps.Control.MapType = OpenLayers.Class(OpenLayers.Control, {
    _controlWidth: 250,
    donotupdate: false,
    selected: null,
    pixel: null,
    language: null,
    initialize: function (language) {
        this.language = 'pt';
        if (language && SAPO.Maps.Lang[language]) {
            this.language = language;
        }
    },
    destroy: function () {
        this.map.events.unregister("changebaselayer", this, this.updateLayerBt);
        for (var i = 0; i < this.div.childNodes.length; ++i) {
            OpenLayers.Event.stopObservingElement(this.div.childNodes[i]);
        }
        OpenLayers.Control.prototype.destroy.apply(this, arguments);
    },
    draw: function (px) {
        OpenLayers.Control.prototype.draw.apply(this, arguments);
        var _this = this;
        var mapbt = document.createElement("div");
        var satellitebt = document.createElement("div");
        var hybridbt = document.createElement("div");
        mapbt.innerHTML = SAPO.Maps.Lang[this.language].map;
        satellitebt.innerHTML = SAPO.Maps.Lang[this.language].satellite;
        hybridbt.innerHTML = SAPO.Maps.Lang[this.language].hybrid;
        var layers = this.map.getBaseLayers();
        mapbt.layer = layers.NORMAL_MAP;
        satellitebt.layer = layers.SATELLITE_MAP;
        hybridbt.layer = layers.HYBRID_MAP;
        OpenLayers.Event.observe(this.div, "mousedown", function (e) {
            OpenLayers.Event.stop(e);
        });
        OpenLayers.Event.observe(this.div, "dblclick", function (e) {
            OpenLayers.Event.stop(e);
        });
        OpenLayers.Event.observe(mapbt, "click", function (e) {
            _this.changeBaseLayer(e, mapbt, _this.map.getBaseLayers().NORMAL_MAP);
        });
        OpenLayers.Event.observe(satellitebt, "click", function (e) {
            _this.changeBaseLayer(e, satellitebt, _this.map.getBaseLayers().SATELLITE_MAP);
        });
        OpenLayers.Event.observe(hybridbt, "click", function (e) {
            _this.changeBaseLayer(e, hybridbt, _this.map.getBaseLayers().HYBRID_MAP);
        });
        this.map.events.register("changebaselayer", this, this.updateLayerBt);
        if (!px) {
            this.div.style.right = "35px";
            this.div.style.top = "5px";
        } else {
            this.pixel = px;
        }
        mapbt.className = 'status_btn_smapi_MapTypeControl2';
        satellitebt.className = 'status_btn_smapi_MapTypeControl2';
        hybridbt.className = 'status_btn_smapi_MapTypeControl2';
        this.checkIE6(mapbt, false);
        this.checkIE6(satellitebt, false);
        this.checkIE6(hybridbt, false);
        this.div.appendChild(mapbt);
        this.div.appendChild(hybridbt);
        this.div.appendChild(satellitebt);
        this.updateLayerBt();
        return this.div;
    },
    changeBaseLayer: function (evt, clickedElem, layer) {
        OpenLayers.Event.stop(evt);
        if (!this.map || (this.map.baseLayer === layer || this.map.baseLayer === layer.baseLayer) && !(this.map.baseLayer === this.map.baseLayers.SATELLITE_MAP && layer.labels && !this.map.sapoSelectedBaseLayer || this.map.sapoSelectedBaseLayer && layer === this.map.baseLayers.SATELLITE_MAP)) {
            return;
        }
        this.selected.className = "status_btn_smapi_MapTypeControl2";
        this.checkIE6(this.selected, false);
        this.selected = clickedElem;
        clickedElem.className = "status_btn_smapi_MapTypeControl2 status_btn_checked_smapi_MapTypeControl2";
        this.checkIE6(this.selected, true);
        this.donotupdate = true;
        this.map.setBaseLayer(layer);
    },
    updateLayerBt: function () {
        if (this.donotupdate) {
            this.donotupdate = false;
            return;
        }
        if (this.selected) {
            this.selected.className = "status_btn_smapi_MapTypeControl2";
            this.checkIE6(this.selected, false);
        }
        var base = this.map.baseLayer;
        for (var i = 0; i < this.div.childNodes.length; ++i) {
            if (base === this.div.childNodes[i].layer || base === this.div.childNodes[i].layer.baseLayer) {
                this.selected = this.div.childNodes[i];
                this.selected.className = "status_btn_smapi_MapTypeControl2 status_btn_checked_smapi_MapTypeControl2";
                this.checkIE6(this.selected, true);
                break;
            }
        }
    },
    checkIE6: function (elem, selected) {
        if (OpenLayers.Util.getBrowserName() != 'msie') {
            return;
        }
        var ie_version = parseFloat(navigator.appVersion.split("MSIE")[1]);
        if (ie_version >= 7) {
            return;
        }
        elem.className += ' status_btn_smapi_MapTypeControl2_if_ie6';
        if (selected) {
            elem.className += ' status_btn_checked_smapi_MapTypeControl2_if_ie6';
        }
    },
    CLASS_NAME: "SAPO.Maps.Control.MapType"
});
SAPO.Maps.Control.MapTypeTerrain = OpenLayers.Class(OpenLayers.Control, {
    _controlWidth: 250,
    donotupdate: false,
    selected: null,
    pixel: null,
    language: null,
    initialize: function (language) {
        this.language = 'pt';
        if (language && SAPO.Maps.Lang[language]) {
            this.language = language;
        }
    },
    destroy: function () {
        this.map.events.unregister("changebaselayer", this, this.updateLayerBt);
        for (var i = 0; i < this.div.childNodes.length; ++i) {
            OpenLayers.Event.stopObservingElement(this.div.childNodes[i]);
        }
        OpenLayers.Control.prototype.destroy.apply(this, arguments);
    },
    draw: function (px) {
        OpenLayers.Control.prototype.draw.apply(this, arguments);
        var _this = this;
        var mapbt = document.createElement("div");
        var satellitebt = document.createElement("div");
        var hybridbt = document.createElement("div");
        var terrainbt = document.createElement("div");
        mapbt.innerHTML = SAPO.Maps.Lang[this.language].map;
        satellitebt.innerHTML = SAPO.Maps.Lang[this.language].satellite;
        hybridbt.innerHTML = SAPO.Maps.Lang[this.language].hybrid;
        terrainbt.innerHTML = SAPO.Maps.Lang[this.language].terrain;
        var layers = this.map.getBaseLayers();
        mapbt.layer = layers.NORMAL_MAP;
        satellitebt.layer = layers.SATELLITE_MAP;
        hybridbt.layer = layers.HYBRID_MAP;
        terrainbt.layer = layers.TERRAIN_MAP;
        OpenLayers.Event.observe(this.div, "mousedown", function (e) {
            OpenLayers.Event.stop(e);
        });
        OpenLayers.Event.observe(this.div, "dblclick", function (e) {
            OpenLayers.Event.stop(e);
        });
        OpenLayers.Event.observe(mapbt, "click", function (e) {
            _this.changeBaseLayer(e, mapbt, _this.map.getBaseLayers().NORMAL_MAP);
        });
        OpenLayers.Event.observe(satellitebt, "click", function (e) {
            _this.changeBaseLayer(e, satellitebt, _this.map.getBaseLayers().SATELLITE_MAP);
        });
        OpenLayers.Event.observe(hybridbt, "click", function (e) {
            _this.changeBaseLayer(e, hybridbt, _this.map.getBaseLayers().HYBRID_MAP);
        });
        OpenLayers.Event.observe(terrainbt, "click", function (e) {
            _this.changeBaseLayer(e, terrainbt, _this.map.getBaseLayers().TERRAIN_MAP);
        });
        this.map.events.register("changebaselayer", this, this.updateLayerBt);
        if (!px) {
            this.div.style.right = "35px";
            this.div.style.top = "5px";
        } else {
            this.pixel = px;
        }
        mapbt.className = 'status_btn_smapi_MapTypeControl2';
        satellitebt.className = 'status_btn_smapi_MapTypeControl2';
        hybridbt.className = 'status_btn_smapi_MapTypeControl2';
        terrainbt.className = 'status_btn_smapi_MapTypeControl2';
        this.checkIE6(mapbt, false);
        this.checkIE6(satellitebt, false);
        this.checkIE6(hybridbt, false);
        this.checkIE6(terrainbt, false);
        this.div.appendChild(mapbt);
        this.div.appendChild(hybridbt);
        this.div.appendChild(satellitebt);
        this.div.appendChild(terrainbt);
        this.updateLayerBt();
        return this.div;
    },
    changeBaseLayer: function (evt, clickedElem, layer) {
        OpenLayers.Event.stop(evt);
        if (!this.map || (this.map.baseLayer === layer || this.map.baseLayer === layer.baseLayer) && !(this.map.baseLayer === this.map.baseLayers.SATELLITE_MAP && layer.labels && !this.map.sapoSelectedBaseLayer || this.map.sapoSelectedBaseLayer && layer === this.map.baseLayers.SATELLITE_MAP)) {
            return;
        }
        this.selected.className = "status_btn_smapi_MapTypeControl2";
        this.checkIE6(this.selected, false);
        this.selected = clickedElem;
        clickedElem.className = "status_btn_smapi_MapTypeControl2 status_btn_checked_smapi_MapTypeControl2";
        this.checkIE6(this.selected, true);
        this.donotupdate = true;
        this.map.setBaseLayer(layer);
    },
    updateLayerBt: function () {
        if (this.donotupdate) {
            this.donotupdate = false;
            return;
        }
        if (this.selected) {
            this.selected.className = "status_btn_smapi_MapTypeControl2";
            this.checkIE6(this.selected, false);
        }
        var base = this.map.baseLayer;
        for (var i = 0; i < this.div.childNodes.length; ++i) {
            if (base === this.div.childNodes[i].layer || base === this.div.childNodes[i].layer.baseLayer) {
                this.selected = this.div.childNodes[i];
                this.selected.className = "status_btn_smapi_MapTypeControl2 status_btn_checked_smapi_MapTypeControl2";
                this.checkIE6(this.selected, true);
                break;
            }
        }
    },
    checkIE6: function (elem, selected) {
        if (OpenLayers.Util.getBrowserName() != 'msie') {
            return;
        }
        var ie_version = parseFloat(navigator.appVersion.split("MSIE")[1]);
        if (ie_version >= 7) {
            return;
        }
        elem.className += ' status_btn_smapi_MapTypeControl2_if_ie6';
        if (selected) {
            elem.className += ' status_btn_checked_smapi_MapTypeControl2_if_ie6';
        }
    },
    CLASS_NAME: "SAPO.Maps.Control.MapType"
});
SAPO.Maps.Control.PermanentLink = OpenLayers.Class(OpenLayers.Control, {
    _link: "http://mapas.sapo.pt",
    _images: ["http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/PermanentLinkControl/sapo_black.png", "http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/PermanentLinkControl/sapo_white.png"],
    _controlWidth: 100,
    _controlHeight: 23,
    initialize: function (options) {
        OpenLayers.Control.prototype.initialize.apply(this, [options]);
    },
    draw: function (px) {
        OpenLayers.Control.prototype.draw.apply(this, arguments);
        var div_img = document.createElement("div");
        var img = document.createElement("img");
        var imgSrc = this.map.baseLayer === this.map.getBaseLayers().NORMAL_MAP ? this._images[0] : this._images[1];
        img.src = imgSrc;
        div_img.style.width = this._controlWidth + "px";
        div_img.style.height = this._controlHeight + "px";
        div_img.onclick = function (e) {
            window.open(this._link);
            if (!e) {
                e = window.event;
            }
            OpenLayers.Event.stop(e);
        }.bindObj(this);
        div_img.style.cursor = "pointer";
        this.div.style.right = "5px";
        this.div.style.bottom = "5px";
        div_img.appendChild(img);
        this.div.appendChild(div_img);
        this.map.events.register("changebaselayer", this, function (e) {
            var imgSrc = this.map.baseLayer === this.map.getBaseLayers().NORMAL_MAP ? this._images[0] : this._images[1];
            img.src = imgSrc;
        });
        return this.div;
    },
    CLASS_NAME: "SAPO.Maps.Control.PermanentLink"
});
SAPO.Maps.Control.Scale = OpenLayers.Class(OpenLayers.Control, {
    _controlHeight: 20,
    _scaleBarWidth: 81,
    _boundsIP: null,
    _boundsMadeira: null,
    _images: ["http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/ScaleControl/mapas_escala.gif", "http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/ScaleControl/mapas_escalaw.gif"],
    initialize: function (options) {
        OpenLayers.Control.prototype.initialize.apply(this, [options]);
        this._boundsIP = [new OpenLayers.Bounds(-8.7110358, 41.3772515, -8.5400064, 41.7372256), new OpenLayers.Bounds(-8.85, 40.3868612, -8.5104144, 41.3767354), new OpenLayers.Bounds(-8.5124119, 40.2975049, -8.1335597, 40.6575257), new OpenLayers.Bounds(-8.9094, 40.2059518, -8.6973301, 40.3859), new OpenLayers.Bounds(-9.5146903, 38.40109, -9.0657679, 39.6749520), new OpenLayers.Bounds(-9.0359352, 39.0346679, -8.7802692, 39.1237121), new OpenLayers.Bounds(-9.0878811, 38.7644567, -8.7778166, 39.0334726), new OpenLayers.Bounds(-9.0843785, 38.4040238, -8.7974915, 38.7632771)];
        this._boundsMadeira = [new OpenLayers.Bounds(-16.412055, 32.993953, -16.257602, 33.128362), new OpenLayers.Bounds(-17.326109, 32.399939, -16.381284, 32.886769)];
    },
    draw: function (px) {
        OpenLayers.Control.prototype.draw.apply(this, arguments);
        this.div.className += " Sapo_Control_ScaleControl_div";
        var span_leftnr = document.createElement("span");
        span_leftnr.className = "Sapo_Control_ScaleControl_leftnr";
        var span_rightnr = document.createElement("span");
        span_rightnr.className = "Sapo_Control_ScaleControl_rightnr";
        var span_credits = document.createElement("span");
        span_credits.className = "Sapo_Control_ScaleControl_credits";
        var img_bar = document.createElement("img");
        var distance = this._getDistance();
        span_leftnr.innerHTML = "0";
        span_rightnr.innerHTML = distance > 1.0 ? (distance.toFixed(0)) + "km" : ((distance * 1000)).toFixed(0) + "m";
        img_bar.src = this.map.baseLayer === this.map.getBaseLayers().NORMAL_MAP ? this._images[0] : this._images[1];
        span_credits.innerHTML = this.getCredits();
        this.div.style.left = "5px";
        this.div.style.bottom = "5px";
        this.div.appendChild(span_leftnr);
        this.div.appendChild(img_bar);
        this.div.appendChild(span_rightnr);
        this.div.appendChild(span_credits);
        this.map.events.register("changebaselayer", this, function (e) {
            if (this.map.baseLayer === this.map.getBaseLayers().NORMAL_MAP) {
                this.div.style.color = "black";
                img_bar.src = this._images[0];
            } else {
                this.div.style.color = "white";
                img_bar.src = this._images[1];
            }
        });
        this.map.events.register("moveend", this, function (e) {
            var distance = this._getDistance();
            span_rightnr.innerHTML = distance > 1.0 ? (distance.toFixed(0)) + "km" : ((distance * 1000)).toFixed(0) + "m";
            span_credits.innerHTML = this.getCredits();
        });
        return this.div;
    },
    _getDistance: function (start, end) {
        var center_x = Math.round(this.map.getSize().w / 2);
        var center_y = Math.round(this.map.getSize().h / 2);
        var startPointPx = new OpenLayers.Pixel(center_x, center_y);
        var endPointPx = startPointPx.add(this._scaleBarWidth, 0);
        var startPoint = this.map.getLonLatFromContainerPixel(startPointPx);
        var endPoint = this.map.getLonLatFromContainerPixel(endPointPx);
        var distance = OpenLayers.Util.distVincenty(startPoint, endPoint);
        return distance;
    },
    getCredits: function () {
        var date = new Date();
        var start = date.getTime();
        var year = "&copy;" + (new Date()).getFullYear();
        var igp_ip = year + " Infoportugal, IGP/DGRF";
        var nasa = year + " NASA ";
        var ip = year + " Infoportugal";
        var intersectiveBounds = [];
        if (this.map.baseLayer == this.map.getBaseLayers().NORMAL_MAP) {
            if (this.map.getZoom() < 7) {
                return year + " SAPO";
            } else {
                return year + " SAPO" + " - Dados do mapa " + year + " Infoportugal";
            }
        } else {
            if (this.map.getZoom() < 12) {
                if (this.map.baseLayer == this.map.getBaseLayers().SATELLITE_MAP && this.map.sapoSelectedBaseLayer) {
                    if (this.map.getZoom() < 7) {
                        return year + " SAPO" + " - Imagens " + year + " NASA";
                    } else {
                        return year + " SAPO" + " - Dados do mapa " + year + " Infoportugal; Imagens " + year + " NASA";
                    }
                } else {
                    return year + " SAPO" + " - Imagens " + year + " NASA";
                }
            }
            var mapBounds = this.map.getBounds();
            for (var i = 0; i < this._boundsIP.length; ++i) {
                if (mapBounds.intersectsBounds(this._boundsIP[i])) {
                    intersectiveBounds.push(this._boundsIP[i]);
                }
            }
            if (intersectiveBounds.length > 0) {
                var area = 0,
                    tmpBounds = new OpenLayers.Bounds(0, 0, 0, 0);
                for (var j = 0; j < intersectiveBounds.length; ++j) {
                    if (intersectiveBounds[j].containsBounds(mapBounds)) {
                        if (this.map.baseLayer == this.map.getBaseLayers().SATELLITE_MAP && this.map.sapoSelectedBaseLayer) {
                            return year + " SAPO" + " - Dados do mapa " + year + " Infoportugal; Imagens " + year + " Infoportugal";
                        } else {
                            return year + " SAPO" + " - Imagens " + year + " Infoportugal";
                        }
                    }
                    tmpBounds.left = intersectiveBounds[j].left < mapBounds.left ? mapBounds.left : intersectiveBounds[j].left;
                    tmpBounds.top = intersectiveBounds[j].top > mapBounds.top ? mapBounds.top : intersectiveBounds[j].top;
                    tmpBounds.bottom = intersectiveBounds[j].bottom < mapBounds.bottom ? mapBounds.bottom : intersectiveBounds[j].bottom;
                    tmpBounds.right = intersectiveBounds[j].right > mapBounds.right ? mapBounds.right : intersectiveBounds[j].right;
                    area += tmpBounds.toGeometry().getArea();
                }
                if (area >= mapBounds.toGeometry().getArea()) {
                    if (this.map.baseLayer == this.map.getBaseLayers().SATELLITE_MAP && this.map.sapoSelectedBaseLayer) {
                        return year + " SAPO" + " - Dados do mapa " + year + " Infoportugal; Imagens " + year + " Infoportugal";
                    } else {
                        return year + " SAPO" + " - Imagens " + year + " Infoportugal";
                    }
                } else {
                    if (this.map.baseLayer == this.map.getBaseLayers().SATELLITE_MAP && this.map.sapoSelectedBaseLayer) {
                        return year + " SAPO" + " - Dados do mapa " + year + " Infoportugal; Imagens " + year + " Infoportugal, IGP/DGRF";
                    } else {
                        return year + " SAPO" + " - Imagens " + year + " Infoportugal, IGP/DGRF";
                    }
                }
            } else {
                var madeiraInBounds = false;
                for (var k = 0; k < this._boundsMadeira.length; ++k) {
                    if (mapBounds.intersectsBounds(this._boundsMadeira[k])) {
                        madeiraInBounds = true;
                        break;
                    }
                }
                var provider = madeiraInBounds ? " IRIG Madeira" : " IGP/DGRF";
                if (this.map.baseLayer == this.map.getBaseLayers().SATELLITE_MAP && this.map.sapoSelectedBaseLayer) {
                    return year + " SAPO" + " - Dados do mapa " + year + " Infoportugal; Imagens " + year + provider;
                } else {
                    return year + " SAPO" + " - Imagens " + year + provider;
                }
            }
        }
    },
    CLASS_NAME: "SAPO.Maps.Control.Scale"
});
SAPO.Maps.Control.MiniMap = OpenLayers.Class(OpenLayers.Control, {
    element: null,
    ovmap: null,
    size: new OpenLayers.Size(127, 102),
    layers: null,
    minRectSize: 15,
    minRectDisplayClass: "RectReplacement",
    minRatio: 15,
    maxRatio: 15,
    mapOptions: null,
    autoPan: true,
    handlers: null,
    resolutionFactor: 1,
    listeners: null,
    opening: false,
    isMinimized: true,
    initialize: function (options) {
        this.layers = [];
        this.handlers = {};
        OpenLayers.Control.prototype.initialize.apply(this, [options]);
    },
    destroy: function () {
        if (!this.mapDiv) {
            return;
        }
        this.handlers.click.destroy();
        this.mapDiv.removeChild(this.extentRectangle);
        this.extentRectangle = null;
        this.rectEvents.destroy();
        this.rectEvents = null;
        this.ovmap.destroy();
        this.ovmap = null;
        this.holderMapDiv.removeChild(this.mapDiv);
        this.mapDiv = null;
        this.element.removeChild(this.holderMapDiv);
        this.holderMapDiv = null;
        this.div.removeChild(this.element);
        this.element = null;
        if (this.maximizeDiv) {
            OpenLayers.Event.stopObservingElement(this.maximizeDiv);
            this.div.removeChild(this.maximizeDiv);
            this.maximizeDiv = null;
        }
        if (this.minimizeDiv) {
            OpenLayers.Event.stopObservingElement(this.minimizeDiv);
            this.div.removeChild(this.minimizeDiv);
            this.minimizeDiv = null;
        }
        this.map.events.un({
            "moveend": this.update,
            "changebaselayer": this.baseLayerDraw,
            scope: this
        });
        this.map.events.unregister("changebaselayer", this, this.changeLayer);
        this.map.events.unregister("addlayer", this, this.addLayer);
        this.map.events.unregister("removelayer", this, this.removeLayer);
        OpenLayers.Control.prototype.destroy.apply(this, arguments);
    },
    changeLayer: function () {
        var newLayer = this.map.baseLayer.clone();
        this.ovmap.addLayer(newLayer);
        this.ovmap.setBaseLayer(newLayer);
        var layerToRemove = this.ovmap.layers[0];
        this.ovmap.removeLayer(layerToRemove, false);
        layerToRemove.map = this.ovmap;
    },
    addLayer: function (evt) {
        if (this.map.sapoSelectedBaseLayer && this.map.sapoSelectedBaseLayer.labels === evt.layer) {
            var newLayer = evt.layer.clone();
            this.ovmap.addLayer(newLayer);
        }
    },
    removeLayer: function (evt) {
        if (this.map.sapoSelectedBaseLayer && this.map.sapoSelectedBaseLayer.labels === evt.layer) {
            var layerToRemove = null;
            for (var i = 0; i < this.ovmap.layers.length; ++i) {
                if (this.ovmap.layers[i].layername === 'hybrid') {
                    layerToRemove = this.ovmap.layers[i];
                }
            }
            if (layerToRemove) {
                this.ovmap.removeLayer(layerToRemove);
            }
        }
    },
    draw: function () {
        OpenLayers.Control.prototype.draw.apply(this, arguments);
        this.map.events.register("changebaselayer", this, this.changeLayer);
        this.map.events.register("addlayer", this, this.addLayer);
        this.map.events.register("removelayer", this, this.removeLayer);
        if (!(this.layers.length > 0)) {
            if (this.map.baseLayer) {
                var layer = this.map.baseLayer.clone();
                layer.loadTilesTimer = null;
                this.layers = [layer];
                if (this.map.sapoSelectedBaseLayer) {
                    this.layers.push(this.map.sapoSelectedBaseLayer.labels.clone());
                }
            } else {
                this.map.events.register("changebaselayer", this, this.baseLayerDraw);
                return this.div;
            }
        }
        this.element = document.createElement('div');
        this.element.className = this.displayClass + 'Element';
        var ie_version = parseFloat(navigator.appVersion.split("MSIE")[1]);
        if (ie_version < 7) {
            this.element.className = this.displayClass + 'Element_ie6';
        }
        this.element.style.display = 'none';
        this.mapDiv = document.createElement('div');
        this.mapDiv.style.width = this.size.w + 'px';
        this.mapDiv.style.height = this.size.h + 'px';
        this.mapDiv.style.position = 'relative';
        this.mapDiv.style.overflow = 'hidden';
        this.mapDiv.id = OpenLayers.Util.createUniqueID('overviewMap');
        this.holderMapDiv = document.createElement('div');
        this.holderMapDiv.style.overflow = 'hidden';
        this.holderMapDiv.style.position = 'relative';
        this.holderMapDiv.appendChild(this.mapDiv);
        this.extentRectangle = document.createElement('div');
        this.extentRectangle.style.zIndex = 1000;
        this.extentRectangle.className = this.displayClass + 'ExtentRectangle';
        this.mapDiv.appendChild(this.extentRectangle);
        this.element.appendChild(this.holderMapDiv);
        this.div.appendChild(this.element);
        if (!this.outsideViewport) {
            this.div.className += " " + this.displayClass + 'Container';
            var imgLocation = OpenLayers.Util.getImagesLocation();
            var img = 'http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/MiniMap/mini_map_off.png';
            this.maximizeDiv = OpenLayers.Util.createAlphaImageDiv(this.displayClass + 'MaximizeButton', null, new OpenLayers.Size(32, 32), img, 'absolute');
            this.maximizeDiv.style.display = 'none';
            this.maximizeDiv.className = this.displayClass + 'MaximizeButton';
            OpenLayers.Event.observe(this.maximizeDiv, 'mouseup', OpenLayers.Function.bindAsEventListener(this.maximizeControl, this));
            this.div.appendChild(this.maximizeDiv);
            img = 'http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/MiniMap/mini_map_on.png';
            this.minimizeDiv = OpenLayers.Util.createAlphaImageDiv('OpenLayers_Control_minimizeDiv', null, new OpenLayers.Size(32, 32), img, 'absolute');
            this.minimizeDiv.style.display = 'none';
            this.minimizeDiv.className = this.displayClass + 'MinimizeButton';
            OpenLayers.Event.observe(this.minimizeDiv, 'mouseup', OpenLayers.Function.bindAsEventListener(this.minimizeControl, this));
            this.div.appendChild(this.minimizeDiv);
            var eventsToStop = ['dblclick', 'mousedown'];
            for (var i = 0, len = eventsToStop.length; i < len; i++) {
                OpenLayers.Event.observe(this.maximizeDiv, eventsToStop[i], OpenLayers.Event.stop);
                OpenLayers.Event.observe(this.minimizeDiv, eventsToStop[i], OpenLayers.Event.stop);
            }
            if (!this.isMinimized) {
                this.showToggle(false, false);
            } else {
                this.maximizeDiv.style.display = '';
            }
        } else {
            this.element.style.display = '';
        }
        if (this.map.getExtent()) {
            this.update();
            this.ovmap.viewPortDiv.style.position = "static";
        }
        this.map.events.register('moveend', this, this.update);
        return this.div;
    },
    baseLayerDraw: function () {
        this.draw();
        this.map.events.unregister("changebaselayer", this, this.baseLayerDraw);
    },
    rectDrag: function (px) {
        var deltaX = this.handlers.drag.last.x - px.x;
        var deltaY = this.handlers.drag.last.y - px.y;
        if (deltaX !== 0 || deltaY !== 0) {
            var rectTop = this.rectPxBounds.top;
            var rectLeft = this.rectPxBounds.left;
            var rectHeight = Math.abs(this.rectPxBounds.getHeight());
            var rectWidth = this.rectPxBounds.getWidth();
            var newTop = Math.max(0, (rectTop - deltaY));
            newTop = Math.min(newTop, this.ovmap.size.h - this.hComp - rectHeight);
            var newLeft = Math.max(0, (rectLeft - deltaX));
            newLeft = Math.min(newLeft, this.ovmap.size.w - this.wComp - rectWidth);
            this.setRectPxBounds(new OpenLayers.Bounds(newLeft, newTop + rectHeight, newLeft + rectWidth, newTop));
        }
    },
    mapDivClick: function (evt) {
        var pxCenter = this.rectPxBounds.getCenterPixel();
        var deltaX = evt.xy.x - pxCenter.x;
        var deltaY = evt.xy.y - pxCenter.y;
        var top = this.rectPxBounds.top;
        var left = this.rectPxBounds.left;
        var height = Math.abs(this.rectPxBounds.getHeight());
        var width = this.rectPxBounds.getWidth();
        var newTop = Math.max(0, (top + deltaY));
        newTop = Math.min(newTop, this.ovmap.size.h - height);
        var newLeft = Math.max(0, (left + deltaX));
        newLeft = Math.min(newLeft, this.ovmap.size.w - width);
        this.setRectPxBounds(new OpenLayers.Bounds(newLeft, newTop + height, newLeft + width, newTop));
        this.updateMapToRect();
    },
    maximizeControl: function (e) {
        this.showToggle(false, true);
        if (e !== null) {
            OpenLayers.Event.stop(e);
        }
    },
    minimizeControl: function (e) {
        this.showToggle(true, true);
        if (e) {
            OpenLayers.Event.stop(e);
        }
    },
    isOpened: function () {
        return !this.isMinimized;
    },
    showToggle: function (minimize, animation) {
        this.isMinimized = minimize;
        if (!minimize) {
            this.update();
        }
        if (!this.opening && !animation) {
            this.maximizeDiv.style.display = minimize ? '' : 'none';
            this.minimizeDiv.style.display = minimize ? 'none' : '';
            this.element.style.display = minimize ? 'none' : '';
            return;
        }
        if (this.opening) {
            return;
        }
        if (!this.ovmap) {
            this.element.style.display = minimize ? 'none' : '';
            this.maximizeDiv.style.display = minimize ? '' : 'none';
            this.minimizeDiv.style.display = minimize ? 'none' : '';
            return;
        }
        var nrSteps = 3;
        var w = 0,
            h = 0;
        var delta_w = 0,
            delta_h = 0;
        if (!minimize) {
            this.element.style.display = 'block';
        }
        w = this.ovmap.div.offsetWidth;
        h = this.ovmap.div.offsetHeight;
        delta_w = Math.ceil(w / nrSteps);
        delta_h = Math.ceil(h / nrSteps);
        if (minimize) {
            delta_w *= -1;
            delta_h *= -1;
        } else {
            this.holderMapDiv.style.width = "0px";
            this.holderMapDiv.style.height = "0px";
        }
        var curr_w = minimize ? w : 0;
        var curr_h = minimize ? h : 0;
        var _this = this;
        this.opening = true;
        var interval = setInterval(function () {
            curr_w += delta_w;
            curr_h += delta_h;
            if (!minimize && (curr_w > w || curr_h > h) || minimize && (curr_w < 0 || curr_h < 0)) {
                _this.holderMapDiv.style.width = w + "px";
                _this.holderMapDiv.style.height = h + "px";
                _this.element.style.display = minimize ? 'none' : '';
                _this.maximizeDiv.style.display = minimize ? '' : 'none';
                _this.minimizeDiv.style.display = minimize ? 'none' : '';
                w = minimize ? 0 : w;
                h = minimize ? 0 : h;
                _this.notifyOpenAndCloseListeners(new OpenLayers.Pixel(w, h));
                _this.opening = false;
                clearInterval(interval);
                return;
            }
            _this.holderMapDiv.style.width = curr_w + "px";
            _this.holderMapDiv.style.height = curr_h + "px";
            _this.notifyOpenAndCloseListeners(new OpenLayers.Pixel(curr_w, curr_h));
        }, 5);
    },
    update: function () {
        if (this.ovmap && !this.isOpened()) {
            return;
        }
        if (!this.ovmap) {
            this.createMap();
        }
        if (!this.isSuitableOverview() || this.autoPan) {
            this.updateOverview();
        }
        this.updateRectToMap();
    },
    isSuitableOverview: function () {
        var mapExtent = this.map.getExtent();
        var maxExtent = this.map.maxExtent;
        var testExtent = new OpenLayers.Bounds(Math.max(mapExtent.left, maxExtent.left), Math.max(mapExtent.bottom, maxExtent.bottom), Math.min(mapExtent.right, maxExtent.right), Math.min(mapExtent.top, maxExtent.top));
        if (this.ovmap.getProjection() !== this.map.getProjection()) {
            testExtent = testExtent.transform(this.map.getProjectionObject(), this.ovmap.getProjectionObject());
        }
        var resRatio = this.ovmap.getResolution() / this.map.getResolution();
        return ((resRatio > this.minRatio) && (resRatio <= this.maxRatio) && (this.ovmap.getExtent().containsBounds(testExtent)));
    },
    updateOverview: function () {
        var mapRes = this.map.getResolution();
        var targetRes = this.ovmap.getResolution();
        var resRatio = targetRes / mapRes;
        if (resRatio > this.maxRatio) {
            targetRes = this.minRatio * mapRes;
        } else if (resRatio <= this.minRatio) {
            targetRes = this.maxRatio * mapRes;
        }
        var center;
        if (this.ovmap.getProjection() !== this.map.getProjection()) {
            center = this.map.center.clone();
            center.transform(this.map.getProjectionObject(), this.ovmap.getProjectionObject());
        } else {
            center = this.map.center;
        }
        this.ovmap.setCenter(center, this.ovmap.getZoomForResolution(targetRes * this.resolutionFactor));
        this.updateRectToMap();
    },
    createMap: function () {
        var options = OpenLayers.Util.extend({
            controls: [],
            maxResolution: 'auto',
            fallThrough: false,
            theme: null
        }, this.mapOptions);
        this.ovmap = new OpenLayers.Map(this.mapDiv, options);
        OpenLayers.Event.stopObserving(window, 'unload', this.ovmap.unloadDestroy);
        this.ovmap.addLayers(this.layers);
        this.ovmap.zoomToMaxExtent();
        this.wComp = Number(OpenLayers.Element.getStyle(this.extentRectangle, 'border-left-width')) + Number(OpenLayers.Element.getStyle(this.extentRectangle, 'border-right-width'));
        this.wComp = (this.wComp) ? this.wComp : 2;
        this.hComp = Number(OpenLayers.Element.getStyle(this.extentRectangle, 'border-top-width')) + Number(OpenLayers.Element.getStyle(this.extentRectangle, 'border-bottom-width'));
        this.hComp = (this.hComp) ? this.hComp : 2;
        this.handlers.drag = new OpenLayers.Handler.Drag(this, {
            move: this.rectDrag,
            done: this.updateMapToRect
        }, {
            map: this.ovmap
        });
        this.handlers.click = new OpenLayers.Handler.Click(this, {
            "click": this.mapDivClick
        }, {
            "single": true,
            "double": false,
            "stopSingle": true,
            "stopDouble": true,
            "pixelTolerance": 1,
            map: this.ovmap
        });
        this.handlers.click.activate();
        this.rectEvents = new OpenLayers.Events(this, this.extentRectangle, null, true);
        this.rectEvents.register("mouseover", this, function (e) {
            if (!this.handlers.drag.active && !this.map.dragging) {
                this.handlers.drag.activate();
            }
        });
        this.rectEvents.register("mouseout", this, function (e) {
            if (!this.handlers.drag.dragging) {
                this.handlers.drag.deactivate();
            }
        });
        if (this.ovmap.getProjection() !== this.map.getProjection()) {
            var sourceUnits = this.map.getProjectionObject().getUnits() || this.map.units || this.map.baseLayer.units;
            var targetUnits = this.ovmap.getProjectionObject().getUnits() || this.ovmap.units || this.ovmap.baseLayer.units;
            this.resolutionFactor = sourceUnits && targetUnits ? OpenLayers.INCHES_PER_UNIT[sourceUnits] / OpenLayers.INCHES_PER_UNIT[targetUnits] : 1;
        }
    },
    updateRectToMap: function () {
        var bounds;
        if (this.ovmap.getProjection() !== this.map.getProjection()) {
            bounds = this.map.getExtent().transform(this.map.getProjectionObject(), this.ovmap.getProjectionObject());
        } else {
            bounds = this.map.getExtent();
        }
        var pxBounds = this.getRectBoundsFromMapBounds(bounds);
        if (pxBounds) {
            this.setRectPxBounds(pxBounds);
        }
    },
    updateMapToRect: function () {
        var lonLatBounds = this.getMapBoundsFromRectBounds(this.rectPxBounds);
        if (this.ovmap.getProjection() !== this.map.getProjection()) {
            lonLatBounds = lonLatBounds.transform(this.ovmap.getProjectionObject(), this.map.getProjectionObject());
        }
        this.map.panTo(lonLatBounds.getCenterLonLat());
    },
    setRectPxBounds: function (pxBounds) {
        var top = Math.max(pxBounds.top, 0);
        var left = Math.max(pxBounds.left, 0);
        var bottom = Math.min(pxBounds.top + Math.abs(pxBounds.getHeight()), this.ovmap.size.h - this.hComp);
        var right = Math.min(pxBounds.left + pxBounds.getWidth(), this.ovmap.size.w - this.wComp);
        var width = Math.max(right - left, 0);
        var height = Math.max(bottom - top, 0);
        if (width < this.minRectSize || height < this.minRectSize) {
            this.extentRectangle.className = this.displayClass + this.minRectDisplayClass;
            var rLeft = left + (width / 2) - (this.minRectSize / 2);
            var rTop = top + (height / 2) - (this.minRectSize / 2);
            this.extentRectangle.style.top = Math.round(rTop) + 'px';
            this.extentRectangle.style.left = Math.round(rLeft) + 'px';
            this.extentRectangle.style.height = this.minRectSize + 'px';
            this.extentRectangle.style.width = this.minRectSize + 'px';
        } else {
            this.extentRectangle.className = this.displayClass + 'ExtentRectangle';
            this.extentRectangle.style.top = Math.round(top) + 'px';
            this.extentRectangle.style.left = Math.round(left) + 'px';
            this.extentRectangle.style.height = Math.round(height) + 'px';
            this.extentRectangle.style.width = Math.round(width) + 'px';
        }
        this.rectPxBounds = new OpenLayers.Bounds(Math.round(left), Math.round(bottom), Math.round(right), Math.round(top));
    },
    getRectBoundsFromMapBounds: function (lonLatBounds) {
        var leftBottomLonLat = new OpenLayers.LonLat(lonLatBounds.left, lonLatBounds.bottom);
        var rightTopLonLat = new OpenLayers.LonLat(lonLatBounds.right, lonLatBounds.top);
        var leftBottomPx = this.getOverviewPxFromLonLat(leftBottomLonLat);
        var rightTopPx = this.getOverviewPxFromLonLat(rightTopLonLat);
        var bounds = null;
        if (leftBottomPx && rightTopPx) {
            bounds = new OpenLayers.Bounds(leftBottomPx.x, leftBottomPx.y, rightTopPx.x, rightTopPx.y);
        }
        return bounds;
    },
    getMapBoundsFromRectBounds: function (pxBounds) {
        var leftBottomPx = new OpenLayers.Pixel(pxBounds.left, pxBounds.bottom);
        var rightTopPx = new OpenLayers.Pixel(pxBounds.right, pxBounds.top);
        var leftBottomLonLat = this.getLonLatFromOverviewPx(leftBottomPx);
        var rightTopLonLat = this.getLonLatFromOverviewPx(rightTopPx);
        return new OpenLayers.Bounds(leftBottomLonLat.lon, leftBottomLonLat.lat, rightTopLonLat.lon, rightTopLonLat.lat);
    },
    getLonLatFromOverviewPx: function (overviewMapPx) {
        var size = this.ovmap.size;
        var res = this.ovmap.getResolution();
        var center = this.ovmap.getExtent().getCenterLonLat();
        var delta_x = overviewMapPx.x - (size.w / 2);
        var delta_y = overviewMapPx.y - (size.h / 2);
        return new OpenLayers.LonLat(center.lon + delta_x * res, center.lat - delta_y * res);
    },
    getOverviewPxFromLonLat: function (lonlat) {
        var res = this.ovmap.getResolution();
        var extent = this.ovmap.getExtent();
        var px = null;
        if (extent) {
            px = new OpenLayers.Pixel(Math.round(1 / res * (lonlat.lon - extent.left)), Math.round(1 / res * (extent.top - lonlat.lat)));
        }
        return px;
    },
    OpenAndCloseListener: function (func, context) {
        if (!this.listeners) {
            this.listeners = [];
        }
        var obj = {
            'func': func,
            'context': context
        };
        this.listeners.push(obj);
    },
    OpenAndCloseStopListening: function (func, context) {
        if (!this.listeners) {
            return false;
        }
        var obj = false;
        for (var i = 0; i < this.listeners.length; ++i) {
            obj = this.listeners[i];
            if (obj.func == func && obj.context == context) {
                this.listeners.splice(i, 1);
                return true;
            }
        }
        return false;
    },
    notifyOpenAndCloseListeners: function (px) {
        if (!this.listeners) {
            return;
        }
        for (var i = 0; i < this.listeners.length; ++i) {
            this.listeners[i].func.apply(this.listeners[i].context, [px]);
        }
    },
    CLASS_NAME: 'SAPO.Maps.Control.MiniMap'
});
SAPO.Maps.Control.Navigation = OpenLayers.Class(OpenLayers.Control, {
    pixel: null,
    _panValue: null,
    _numZoomLevels: null,
    _maxZoomLevel: null,
    _minZoomLevel: null,
    borders: null,
    initialize: function (options) {
        this.borders = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        };
        OpenLayers.Control.prototype.initialize.apply(this, [options]);
        this._panValue = 100;
    },
    setMap: function (map) {
        OpenLayers.Control.prototype.setMap.apply(this, arguments);
        this.pixel = new OpenLayers.Pixel(5, 5);
    },
    adjustSizeToBaseLayer: function (e) {
        var numZoomLevels = e.layer.numZoomLevels - SAPO.Maps.Config.MIN_ZOOM;
        var minZoomLevel = SAPO.Maps.Config.MIN_ZOOM;
        var maxZoomLevel = (numZoomLevels + minZoomLevel) - 1;
        if (numZoomLevels !== this._numZoomLevels || maxZoomLevel !== this._maxZoomLevel || minZoomLevel !== this._minZoomLevel) {
            this.redraw();
        }
    },
    draw: function (px) {
        OpenLayers.Control.prototype.draw.apply(this, arguments);
        this._numZoomLevels = this.map.baseLayer.numZoomLevels - SAPO.Maps.Config.MIN_ZOOM;
        this._minZoomLevel = SAPO.Maps.Config.MIN_ZOOM;
        this._maxZoomLevel = (this._numZoomLevels + this._minZoomLevel) - 1;
        while (this.div.hasChildNodes()) {
            this.div.removeChild(this.div.childNodes[0]);
        }
        var controlHTML = this.buildControl();
        this.div.appendChild(controlHTML);
        if (px) {
            this.pixel.x = px.x;
            this.pixel.y = px.y;
        }
        this.div.style.top = this.pixel.y + "px";
        this.div.style.left = this.pixel.x + "px";
        var zoom = this.map.getZoom();
        if (zoom < this._minZoomLevel) {
            this.wheelChange(this._minZoomLevel - zoom);
        }
        if (zoom > this._maxZoomLevel) {
            this.wheelChange(this._maxZoomLevel - zoom);
        }
        return this.div;
    },
    redraw: function () {
        this._numZoomLevels = this.map.baseLayer.numZoomLevels - SAPO.Maps.Config.MIN_ZOOM;
        this._minZoomLevel = SAPO.Maps.Config.MIN_ZOOM;
        this._maxZoomLevel = (this._numZoomLevels + this._minZoomLevel) - 1;
        while (this.div.hasChildNodes()) {
            this.div.removeChild(this.div.childNodes[0]);
        }
        var controlHTML = this.buildControl();
        this.div.appendChild(controlHTML);
        var zoom = this.map.getZoom();
        if (zoom < this._minZoomLevel) {
            this.wheelChange(zoom - this._minZoomLevel);
        }
        if (zoom > this._maxZoomLevel) {
            this.wheelChange(zoom - this._minZoomLevel);
        }
    },
    buildControl: function () {
        var div_navigation_sys_smapi = document.createElement("div");
        div_navigation_sys_smapi.className = "navigation_sys_smapi";
        var div_nav_circle_smapi = document.createElement("div");
        div_nav_circle_smapi.className = "nav_circle_smapi";
        var div_nav_up_smapi = document.createElement("div");
        div_nav_up_smapi.className = "nav_up_smapi";
        var div_nav_middle_smapi = document.createElement("div");
        div_nav_middle_smapi.className = "nav_middle_smapi";
        var div_nav_left_smapi = document.createElement("div");
        div_nav_left_smapi.className = "nav_left_smapi";
        var div_nav_center_smapi = document.createElement("div");
        div_nav_center_smapi.className = "nav_center_smapi";
        var div_nav_right_smapi = document.createElement("div");
        div_nav_right_smapi.className = "nav_right_smapi";
        var div_nav_down_smapi = document.createElement("div");
        div_nav_down_smapi.className = "nav_down_smapi";
        var div_zoom_smapi = document.createElement("div");
        div_zoom_smapi.className = "zoom_smapi";
        var div_zoom_in_smapi = document.createElement("div");
        div_zoom_in_smapi.className = "zoom_in_smapi";
        var div_zoom_slide_smapi = document.createElement("div");
        div_zoom_slide_smapi.className = "zoom_slide_smapi";
        var div_zoom_out_smapi = document.createElement("div");
        div_zoom_out_smapi.className = "zoom_out_smapi";
        if (OpenLayers.Util.getBrowserName() === 'msie') {
            var ie_version = parseFloat(navigator.appVersion.split("MSIE")[1]);
            if (ie_version < 7) {
                div_zoom_smapi.className += " zoom_smapi_ie6";
                div_zoom_slide_smapi.className += " zoom_slide_smapi_ie6";
                div_zoom_in_smapi.className += " zoom_in_smapi_ie6";
                div_zoom_out_smapi.className += " zoom_out_smapi_ie6";
                div_nav_circle_smapi.className += " nav_circle_smapi_ie6";
                div_nav_center_smapi.className += " nav_center_smapi_ie6";
            }
        }
        var img_arrow_up = document.createElement("img");
        img_arrow_up.src = "http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/NavigationControl/arrow_up.gif";
        img_arrow_up.width = 17;
        img_arrow_up.height = 17;
        var img_arrow_left = document.createElement("img");
        img_arrow_left.src = "http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/NavigationControl/arrow_left.gif";
        img_arrow_left.width = 17;
        img_arrow_left.height = 17;
        var img_arrow_center = document.createElement("img");
        img_arrow_center.src = "http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/NavigationControl/arrow_center.gif";
        img_arrow_center.width = 17;
        img_arrow_center.height = 17;
        var img_arrow_right = document.createElement("img");
        img_arrow_right.src = "http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/NavigationControl/arrow_right.gif";
        img_arrow_right.width = 18;
        img_arrow_right.height = 17;
        var img_arrow_down = document.createElement("img");
        img_arrow_down.src = "http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/NavigationControl/arrow_down.gif";
        img_arrow_down.width = 17;
        img_arrow_down.height = 18;
        var img_plus = document.createElement("img");
        img_plus.src = "http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/NavigationControl/plus.gif";
        img_plus.width = 12;
        img_plus.height = 11;
        var div_plus = document.createElement("div");
        div_plus.appendChild(img_plus);
        var img_minus = document.createElement("img");
        img_minus.src = "http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/NavigationControl/minus.gif";
        img_minus.width = 12;
        img_minus.height = 4;
        var div_zoom, img_zoom;
        for (var i = this._numZoomLevels - 1; i >= 0; --i) {
            div_zoom = document.createElement("div");
            img_zoom = document.createElement("img");
            div_zoom.className = "zoom_point_wraper_smapi";
            img_zoom.src = "http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/NavigationControl/zoom_point.gif";
            img_zoom.width = 4;
            img_zoom.height = 2;
            div_zoom.appendChild(img_zoom);
            div_zoom_slide_smapi.appendChild(div_zoom);
            div_zoom._zoomLevel = i + this._minZoomLevel;
            OpenLayers.Event.observe(div_zoom, "click", function (e) {
                var newZoom = this._zoomLevel ? this._zoomLevel : e.srcElement._zoomLevel;
                _this.wheelChange(newZoom - _this.map.getZoom());
                OpenLayers.Event.stop(e);
            }, true);
        }
        this.div_zoom_slide_smapi = div_zoom_slide_smapi;
        this.img_zoom_select = document.createElement("img");
        this.img_zoom_select.src = "http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/NavigationControl/zoom_select.gif";
        this.img_zoom_select.width = 12;
        this.img_zoom_select.height = 12;
        this.img_zoom_select.style.position = "absolute";
        this.img_zoom_select.basePosition = 78 + ((this._numZoomLevels - 1) * 10);
        this.img_zoom_select.style.top = this.img_zoom_select.basePosition + "px";
        this.img_zoom_select.style.left = "19px";
        div_zoom_slide_smapi.appendChild(this.img_zoom_select);
        div_nav_left_smapi.appendChild(img_arrow_left);
        div_nav_center_smapi.appendChild(img_arrow_center);
        div_nav_right_smapi.appendChild(img_arrow_right);
        div_nav_middle_smapi.appendChild(div_nav_left_smapi);
        div_nav_middle_smapi.appendChild(div_nav_center_smapi);
        div_nav_middle_smapi.appendChild(div_nav_right_smapi);
        div_nav_up_smapi.appendChild(img_arrow_up);
        div_nav_down_smapi.appendChild(img_arrow_down);
        div_nav_circle_smapi.appendChild(div_nav_up_smapi);
        div_nav_circle_smapi.appendChild(div_nav_middle_smapi);
        div_nav_circle_smapi.appendChild(div_nav_down_smapi);
        div_zoom_in_smapi.appendChild(img_plus);
        div_zoom_out_smapi.appendChild(img_minus);
        div_zoom_smapi.appendChild(div_zoom_in_smapi);
        div_zoom_smapi.appendChild(div_zoom_slide_smapi);
        div_zoom_smapi.appendChild(div_zoom_out_smapi);
        div_navigation_sys_smapi.appendChild(div_nav_circle_smapi);
        div_navigation_sys_smapi.appendChild(div_zoom_smapi);
        var initialZoom = this.map.getZoom();
        this.img_zoom_select.style.top = (this.img_zoom_select.basePosition - ((initialZoom - this._minZoomLevel) * 10)) + "px";
        var _this = this;
        OpenLayers.Event.observe(this.div, "mousedown", function (e) {
            var target = e.srcElement ? e.srcElement : e.target;
            if (target !== _this.img_zoom_select && target.className !== "zoom_point_wraper_smapi") {
                OpenLayers.Event.stop(e);
            }
        }, true);
        OpenLayers.Event.observe(this.div, "dblclick", function (e) {
            OpenLayers.Event.stop(e);
        }, true);
        OpenLayers.Event.observe(this.div, "mousedown", OpenLayers.Event.stop);
        OpenLayers.Event.observe(this.div, "click", OpenLayers.Event.stop, true);
        this.map.events.register("zoomend", this, function (e) {
            var newZoom = this.map.getZoom();
            _this.img_zoom_select.style.top = (_this.img_zoom_select.basePosition - ((newZoom - this._minZoomLevel) * 10)) + "px";
        });
        var funcToZoomIn = OpenLayers.Function.bindAsEventListener(this.zoomInClicked, this);
        var funcToZoomOut = OpenLayers.Function.bindAsEventListener(this.zoomOutClicked, this);
        OpenLayers.Event.observe(div_zoom_in_smapi, "click", funcToZoomIn, true);
        OpenLayers.Event.observe(div_zoom_out_smapi, "click", funcToZoomOut, true);
        this.map.events.unregister("changebaselayer", this, this.adjustSizeToBaseLayer);
        this.map.events.register("changebaselayer", this, this.adjustSizeToBaseLayer);
        OpenLayers.Event.observe(img_arrow_up, "click", function (e) {
            _this.map.pan(0, -_this._panValue);
        });
        OpenLayers.Event.observe(img_arrow_left, "click", function (e) {
            _this.map.pan(-_this._panValue, 0);
        });
        OpenLayers.Event.observe(img_arrow_down, "click", function (e) {
            _this.map.pan(0, _this._panValue);
        });
        OpenLayers.Event.observe(img_arrow_right, "click", function (e) {
            _this.map.pan(_this._panValue, 0);
        });
        OpenLayers.Event.observe(img_arrow_center, "click", function (e) {
            var center = new OpenLayers.LonLat(-904709.086279709, 4823097.824952432);
            if (_this.map.getZoom() - this._minZoomLevel === 0) {
                _this.map.panTo(center);
            } else {
                _this.wheelChange(_this._minZoomLevel - _this.map.getZoom());
            }
        });
        OpenLayers.Event.observe(this.img_zoom_select, "mousedown", function (e) {
            _this._offset = e.layerY ? e.layerY : e.offsetY;
            document.getElementsByTagName("body")[0]._this = _this;
            OpenLayers.Event.observe(document.getElementsByTagName("body")[0], "mousemove", _this.moveSlider, true);
            OpenLayers.Event.observe(document.getElementsByTagName("body")[0], "mouseup", _this.endMoveSlider);
            OpenLayers.Event.stop(e);
        }, true);
        return div_navigation_sys_smapi;
    },
    zoomInClicked: function (evt) {
        this.wheelChange(1);
        OpenLayers.Event.stop(evt);
    },
    zoomOutClicked: function (evt) {
        this.wheelChange(-1);
        OpenLayers.Event.stop(evt);
    },
    wheelChange: function (deltaZ) {
        var newZoom = this.map.getZoom() + deltaZ;
        if (!this.map.isValidZoomLevel(newZoom)) {
            return;
        }
        var size = this.map.getSize();
        var right = size.w - this.borders.right;
        var bottom = size.h - this.borders.bottom;
        var pixel_center_x = Math.floor((right - this.borders.left) / 2) + this.borders.left;
        var pixel_center_y = Math.floor((bottom - this.borders.top) / 2) + this.borders.top;
        var mapCenterConsideringBorders = new OpenLayers.Pixel(pixel_center_x, pixel_center_y);
        var deltaX = size.w / 2 - pixel_center_x;
        var deltaY = pixel_center_y - size.h / 2;
        var newRes = this.map.baseLayer.getResolutionForZoom(newZoom);
        var zoomPoint = this.map.getLonLatFromPixel(mapCenterConsideringBorders);
        var newCenter = new OpenLayers.LonLat(zoomPoint.lon + deltaX * newRes, zoomPoint.lat + deltaY * newRes);
        this.map.setCenter(newCenter, newZoom);
    },
    moveSlider: function (e) {
        if (!e.pageY) {
            e.pageY = e.clientY;
        }
        var _this = document.getElementsByTagName("body")[0]._this;
        var offset = e.layerY ? 0 : 2;
        var topDistance = 0;
        var element = _this.div;
        while (element) {
            topDistance += element.offsetTop;
            element = element.offsetParent;
        }
        if (e.pageY < (topDistance + _this.div_zoom_slide_smapi.offsetTop + offset) || e.pageY > (topDistance + _this.div_zoom_slide_smapi.offsetTop + offset + _this.div_zoom_slide_smapi.clientHeight)) {
            return;
        }
        _this.img_zoom_select.style.top = (e.pageY - topDistance - offset - _this._offset) + "px";
        OpenLayers.Event.stop(e);
    },
    endMoveSlider: function (e) {
        var _this = document.getElementsByTagName("body")[0]._this;
        var sliderPx = _this.img_zoom_select.offsetTop - _this.div_zoom_slide_smapi.offsetTop;
        sliderPx = _this.img_zoom_select.offsetTop - _this.div_zoom_slide_smapi.offsetTop > (_this._numZoomLevels * 10) ? (_this._numZoomLevels * 10) : _this.img_zoom_select.offsetTop - _this.div_zoom_slide_smapi.offsetTop;
        sliderPx = _this.img_zoom_select.offsetTop - _this.div_zoom_slide_smapi.offsetTop < 0 ? 0 : _this.img_zoom_select.offsetTop - _this.div_zoom_slide_smapi.offsetTop;
        var zoom = Math.abs(Math.floor(sliderPx / 10) - _this._numZoomLevels - _this._minZoomLevel + 1);
        if (zoom === _this.map.getZoom()) {
            _this.img_zoom_select.style.top = (_this.img_zoom_select.basePosition - ((zoom - _this._minZoomLevel) * 10)) + "px";
        } else {
            _this.wheelChange(zoom - _this.map.getZoom());
        }
        OpenLayers.Event.stopObserving(document.getElementsByTagName("body")[0], "mousemove", _this.moveSlider, true);
        OpenLayers.Event.stopObserving(document.getElementsByTagName("body")[0], "mouseup", _this.endMoveSlider);
    },
    CLASS_NAME: "SAPO.Maps.Control.Navigation"
});
SAPO.Maps.Control.DragFeature = OpenLayers.Class(OpenLayers.Control, {
    geometryTypes: null,
    feature: null,
    features: null,
    isDragging: false,
    dragCallbacks: {},
    featureCallbacks: {},
    lastPixel: null,
    initialize: function (features, listeners, options) {
        this.features = [];
        OpenLayers.Control.prototype.initialize.apply(this, [options]);
        this.handlers = {
            drag: new OpenLayers.Handler.Drag(this, OpenLayers.Util.extend({
                down: this.downFeature,
                move: this.moveFeature,
                up: this.upFeature,
                out: this.cancel,
                done: this.doneDragging
            }, this.dragCallbacks)),
            feature: new SAPO.Maps.Handler.Feature(this, OpenLayers.Util.extend({
                over: this.overFeature,
                out: this.outFeature
            }, this.featureCallbacks), {
                geometryTypes: this.geometryTypes
            })
        };
    },
    destroy: function () {
        OpenLayers.Control.prototype.destroy.apply(this, []);
    },
    activate: function () {
        return (this.handlers.feature.activate(true) && OpenLayers.Control.prototype.activate.apply(this, arguments));
    },
    deactivate: function () {
        this.handlers.drag.deactivate();
        this.handlers.feature.deactivate(true);
        this.feature = null;
        this.dragging = false;
        this.lastPixel = null;
        return OpenLayers.Control.prototype.deactivate.apply(this, arguments);
    },
    overFeature: function (feature) {
        if (!this.handlers.drag.dragging) {
            this.feature = feature;
            this.handlers.drag.activate();
            this.over = true;
            this.map.div.style.cursor = "url(\"http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/openhand.cur\"), move";
        } else {
            if (this.feature.id === feature.id) {
                this.over = true;
            } else {
                this.over = false;
            }
        }
    },
    downFeature: function (pixel) {
        this.lastPixel = pixel;
    },
    moveFeature: function (pixel) {
        if (this.isDragging === false && this.lastPixel.equals(pixel) === false) {
            this.isDragging = true;
            this.onStart(this.feature, pixel);
        }
        var res = this.map.getResolution();
        this.feature.geometry.move(res * (pixel.x - this.lastPixel.x), res * (this.lastPixel.y - pixel.y));
        this.feature.layer.drawFeature(this.feature);
        this.lastPixel = pixel;
        this.onDrag(this.feature, pixel);
    },
    upFeature: function (pixel) {
        if (!this.over) {
            this.handlers.drag.deactivate();
            this.map.div.style.cursor = "url(\"http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/openhand.cur\"), pointer";
        } else {
            this.map.div.style.cursor = "url(\"http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/closedhand.cur\"), move";
        }
    },
    doneDragging: function (pixel) {
        this.onComplete(this.feature, pixel);
    },
    outFeature: function (feature) {
        if (!this.handlers.drag.dragging) {
            this.over = false;
            this.handlers.drag.deactivate();
            this.map.div.style.cursor = "url(\"http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/openhand.cur\"), pointer";
            this.feature = null;
        } else {
            if (this.feature.id === feature.id) {
                this.over = false;
            }
        }
    },
    onStart: function (feature, pixel) {
        this.notifyListeners(feature, 'dragstart', [feature]);
    },
    onDrag: function (feature, pixel) {
        this.notifyListeners(feature, 'drag', [feature]);
    },
    onComplete: function (feature, pixel) {
        this.isDragging = false;
        this.notifyListeners(feature, 'dragend', [feature]);
    },
    supportEvent: function (evtType) {
        if (evtType === "drag" || evtType === "dragstart" || evtType === "dragend") {
            return true;
        }
        return false;
    },
    registerEvent: function (feature, eventType, context, func, params) {
        if (!feature._eventsDrag) {
            feature._eventsDrag = {};
        }
        if (!feature._eventsDrag[eventType]) {
            feature._eventsDrag[eventType] = [];
        }
        feature._eventsDrag[eventType].push({
            context: context,
            func: func,
            params: params
        });
    },
    unRegisterEvent: function (feature, eventType, context, func) {
        if (!feature._eventsDrag) {
            return false;
        }
        if (!feature._eventsDrag[eventType]) {
            return false;
        }
        var length = feature._eventsDrag[eventType].length;
        for (var i = 0; i < feature._eventsDrag[eventType].length; ++i) {
            if (feature._eventsDrag[eventType][i].context === context && feature._eventsDrag[eventType][i].func === func) {
                feature._eventsDrag[eventType].splice(i, 1);
            }
        }
        if (length === feature._eventsDrag[eventType].length) {
            return false;
        }
        if (feature._eventsDrag[eventType].length === 0) {
            delete feature._eventsDrag[eventType];
        }
        var hasProperties = false;
        for (var e in feature._eventsDrag) {
            hasProperties = true;
            break;
        }
        if (!hasProperties) {
            delete feature._eventsDrag;
        }
        return true;
    },
    notifyListeners: function (feature, eventType, args) {
        if (!feature._eventsDrag) {
            return;
        }
        if (!feature._eventsDrag[eventType]) {
            return;
        }
        var evts = feature._eventsDrag[eventType];
        var func, context, params;
        for (var i = 0; i < evts.length; ++i) {
            func = evts[i].func;
            context = evts[i].context;
            params = evts[i].params;
            params.push(args[0]);
            func.apply(context, params);
        }
    },
    addFeature: function (feature) {
        this.features.push(feature);
    },
    removeFeature: function (feature) {
        var index = -1;
        for (i = 0; i < this.features.length; ++i) {
            if (feature === this.features[i]) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            this.features.splice(index, 1);
        }
    },
    cancel: function () {
        this.handlers.drag.deactivate();
        this.over = false;
    },
    setMap: function (map) {
        this.handlers.drag.setMap(map);
        this.handlers.feature.setMap(map);
        OpenLayers.Control.prototype.setMap.apply(this, arguments);
        this.map.events.register("movestart", this, function () {
            this.deactivate();
        });
        this.map.events.register("moveend", this, function () {
            this.activate();
        });
    },
    CLASS_NAME: "SAPO.Maps.Control.DragFeature"
});
SAPO.Maps.Control.FeatureEventHandlers = OpenLayers.Class(OpenLayers.Control, {
    features: null,
    callbacks: null,
    handlers: null,
    initialize: function (options) {
        OpenLayers.Control.prototype.initialize.apply(this, [options]);
        this.features = [];
        var callbacks = {
            click: this.clickFeature,
            over: this.overFeature,
            out: this.outFeature,
            dblclick: this.dblclickFeature
        };
        this.callbacks = OpenLayers.Util.extend(callbacks, this.callbacks);
        this.handlers = {
            feature: new SAPO.Maps.Handler.Feature(this, this.callbacks)
        };
    },
    activate: function () {
        this.handlers.feature.activate(true);
        return OpenLayers.Control.prototype.activate.apply(this, arguments);
    },
    deactivate: function () {
        this.handlers.feature.deactivate(true);
        return OpenLayers.Control.prototype.deactivate.apply(this, arguments);
    },
    clickFeature: function (feature) {
        this.notifyListeners(feature, 'click', [feature]);
    },
    overFeature: function (feature) {
        this.notifyListeners(feature, 'mouseover', [feature]);
    },
    outFeature: function (feature) {
        this.notifyListeners(feature, 'mouseout', [feature]);
    },
    dblclickFeature: function (feature) {
        this.notifyListeners(feature, 'dblclick', [feature]);
    },
    supportEvent: function (evtType) {
        if (evtType === "click" || evtType === "dblclick" || evtType === "mouseover" || evtType === "mouseout") {
            return true;
        }
        return false;
    },
    registerEvent: function (feature, eventType, context, func, params) {
        if (!feature._events) {
            feature._events = {};
            this.features.push(feature);
        }
        if (!feature._events[eventType]) {
            feature._events[eventType] = [];
        }
        feature._events[eventType].push({
            context: context,
            func: func,
            params: params
        });
    },
    unRegisterEvent: function (feature, eventType, context, func) {
        if (!feature._events) {
            return false;
        }
        if (!feature._events[eventType]) {
            return false;
        }
        var length = feature._events[eventType].length;
        for (var i = 0; i < feature._events[eventType].length; ++i) {
            if (feature._events[eventType][i].context === context && feature._events[eventType][i].func === func) {
                feature._events[eventType].splice(i, 1);
            }
        }
        if (length === feature._events[eventType].length) {
            return false;
        }
        if (feature._events[eventType].length === 0) {
            delete feature._events[eventType];
        }
        var hasProperties = false;
        for (var e in feature._events) {
            hasProperties = true;
            break;
        }
        if (!hasProperties) {
            delete feature._events;
            for (var j = 0; j < this.features.length; ++j) {
                if (this.features[j] === feature) {
                    this.features.splice(j, 1);
                }
            }
        }
        return true;
    },
    notifyListeners: function (feature, eventType, args) {
        if (!feature._events) {
            return;
        }
        if (!feature._events[eventType]) {
            return;
        }
        var evts = feature._events[eventType];
        var func, context, params;
        for (var i = 0; i < evts.length; ++i) {
            func = evts[i].func;
            context = evts[i].context;
            params = evts[i].params;
            params.push(args[0]);
            func.apply(context, params);
        }
    },
    setMap: function (map) {
        this.handlers.feature.setMap(map);
        OpenLayers.Control.prototype.setMap.apply(this, arguments);
        this.map.events.register("movestart", this, function () {
            this.deactivate();
        });
        this.map.events.register("moveend", this, function () {
            this.activate();
        });
    },
    CLASS_NAME: "SAPO.Maps.Control.FeatureEventHandlers"
});
SAPO.Maps.Control.RightClicks = OpenLayers.Class(OpenLayers.Control, {
    click: null,
    callbacks: null,
    handleRightClicks: true,
    initialize: function (callbacks) {
        OpenLayers.Control.prototype.initialize.apply(this, arguments);
        this.callbacks = callbacks;
    },
    destroy: function () {
        OpenLayers.Control.prototype.destroy.apply(this, arguments);
    },
    draw: function () {
        OpenLayers.Control.prototype.draw.apply(this, arguments);
        var clickCallbacks = {
            'rightclick': this.singleRightClick,
            'dblrightclick': this.dblRightClick
        };
        var clickOptions = {
            'double': true,
            'stopDouble': false
        };
        this.click = new OpenLayers.Handler.Click(this, clickCallbacks, clickOptions);
        this.click.activate();
    },
    singleRightClick: function (evt) {
        if (this.callbacks && this.callbacks.singlerightclick) {
            var func = this.callbacks.singlerightclick.func;
            var params = this.callbacks.singlerightclick.params ? this.callbacks.singlerightclick.params : [];
            var context = this.callbacks.singlerightclick.context;
            var args = params.slice();
            args.push(evt);
            func.apply(context, args);
        }
    },
    dblRightClick: function (evt) {
        if (this.callbacks && this.callbacks.dblrightclick) {
            var func = this.callbacks.dblrightclick.func;
            var params = this.callbacks.dblrightclick.params ? this.callbacks.dblrightclick.params : [];
            var context = this.callbacks.dblrightclick.context;
            var args = params.slice();
            args.push(evt);
            func.apply(context, args);
        }
    },
    CLASS_NAME: 'RIGHT_CLICKS_CONTROL'
});
SAPO.Maps.Control.ContextMenu = OpenLayers.Class(OpenLayers.Control, {
    contextMenuHtml: null,
    contextMenuOptions: null,
    showContextMenu: null,
    hideContextMenu: null,
    isOnTheMap: false,
    lonlat: null,
    px: null,
    borders: null,
    selectedItem: null,
    search: null,
    initialize: function (contextMenu, options) {
        this.borders = {
            left: 0,
            right: 0,
            bottom: 0,
            top: 0
        };
        OpenLayers.Control.prototype.initialize.apply(this, [options]);
        var clickOpt = OpenLayers.Function.bind(this.clickOption, this);
        this.contextMenuOptions = [
            [{
                text: 'Centrar o mapa aqui',
                callback: clickOpt
            }, {
                text: 'Zoom in',
                callback: clickOpt
            }, {
                text: 'Zoom out',
                callback: clickOpt
            }],
            [{
                text: 'Copiar coordenadas',
                callback: clickOpt
            }]
        ];
        if (!contextMenu) {
            return;
        }
        var opts = false;
        var array = false;
        for (var i = 0; i < contextMenu.length; ++i) {
            opts = contextMenu[i];
            if (!opts.section || opts.section >= this.contextMenuOptions.length) {
                array = [];
                this.contextMenuOptions.push(array);
            } else if (opts.section == -1) {
                array = [];
                this.contextMenuOptions.unshift(array);
            } else {
                array = this.contextMenuOptions[opts.section];
            }
            for (var j = 0; j < opts.options.length; ++j) {
                array.push(opts.options[j]);
            }
        }
    },
    draw: function (px) {
        OpenLayers.Control.prototype.draw.apply(this, arguments);
        var contextMenu = document.createElement('div');
        var click_top = document.createElement('div');
        var optionsContainer = document.createElement('div');
        var click_bottom = document.createElement('div');
        var options_list = document.createElement('ul');
        contextMenu.className = 'right_click';
        click_top.className = 'click_top';
        optionsContainer.className = 'click_middle';
        click_bottom.className = 'click_bottom';
        if (SAPO.Maps.Utils.checkIE6()) {
            contextMenu.className += ' right_click_ie6';
            click_top.className += ' click_top_ie6';
            optionsContainer.className += ' click_middle_ie6';
            click_bottom.className += ' click_bottom_ie6';
        }
        var _this = this;
        var section = false;
        var option = false;
        var li = false;
        var mouseover_handler = false;
        var mouseout_handler = false;
        for (var i = 0; i < this.contextMenuOptions.length; ++i) {
            if (i !== 0) {
                li = document.createElement('li');
                li.className = 'separator';
                options_list.appendChild(li);
            }
            section = this.contextMenuOptions[i];
            for (var j = 0; j < section.length; ++j) {
                option = section[j];
                li = document.createElement('li');
                li.appendChild(document.createTextNode(option.text));
                li.text = option.text;
                li.idx = j;
                li.section = i;
                li.callback = option.callback;
                li.className = '';
                li.style.position = "relative";
                li.onmouseup = function (e) {
                    if (this.callback) {
                        this.callback(this.section, this.idx, this.text, _this.lonlat);
                    }
                    _this.hide();
                };
                mouseover_handler = OpenLayers.Function.bind(this.selectItem, this, li);
                mouseout_hanlder = OpenLayers.Function.bind(this.unselectCurrentItem, this);
                OpenLayers.Event.observe(li, 'mouseover', mouseover_handler);
                OpenLayers.Event.observe(li, 'mouseout', mouseout_hanlder);
                options_list.appendChild(li);
            }
        }
        contextMenu.appendChild(click_top);
        contextMenu.appendChild(optionsContainer);
        contextMenu.appendChild(click_bottom);
        optionsContainer.appendChild(options_list);
        this.contextMenuHtml = contextMenu;
        OpenLayers.Event.observe(contextMenu, "click", function (e) {
            OpenLayers.Event.stop(e);
        });
        OpenLayers.Event.observe(contextMenu, "dbclick", function (e) {
            OpenLayers.Event.stop(e);
        });
        OpenLayers.Event.observe(contextMenu, "mousedown", function (e) {
            OpenLayers.Event.stop(e);
        });
        return this.div;
    },
    activate: function () {
        OpenLayers.Control.prototype.activate.apply(this, arguments);
        this.showContextMenu = OpenLayers.Function.bindAsEventListener(this.show, this);
        this.hideContextMenu = OpenLayers.Function.bindAsEventListener(this.hide, this);
        this.map.events.register('singlerightclick', this, this.showContextMenu);
        this.map.events.register('mouseup', this, this.hideContextMenu);
        OpenLayers.Event.observe(document.body, 'click', this.hideContextMenu, false);
    },
    deactivate: function () {
        OpenLayers.Control.prototype.deactivate.apply(this, arguments);
        this.map.events.unregister('singlerightclick', this, this.showContextMenu);
        this.map.events.unregister('click', this, this.hideContextMenu);
    },
    destroy: function () {
        OpenLayers.Control.prototype.destroy.apply(this, arguments);
    },
    isOnMap: function () {
        return this.isOnTheMap;
    },
    show: function (evt) {
        this.px = evt.xy;
        this.lonlat = this.map.getLonLatFromContainerPixel(this.px);
        if (!this.isOnTheMap) {
            this.contextMenuHtml.style.visibility = "hidden";
            this.div.appendChild(this.contextMenuHtml);
            this.isOnTheMap = true;
        }
        this.adjustPosition();
        this.setCopy2ClipBoard();
        this.contextMenuHtml.style.visibility = "visible";
    },
    adjustPosition: function () {
        var mapSize = this.map.getSize();
        if (SAPO.Maps.Utils.checkIE6()) {
            this.contextMenuHtml.childNodes[0].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/ContextMenuControl/right_click_top_left.png',sizingMethod='crop')";
            this.contextMenuHtml.childNodes[2].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/ContextMenuControl/right_click_bottom_clean.png',sizingMethod='crop')";
        } else {
            this.contextMenuHtml.childNodes[0].style.background = "transparent url(http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/ContextMenuControl/right_click_top_left.png) no-repeat";
            this.contextMenuHtml.childNodes[2].style.background = "transparent url(http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/ContextMenuControl/right_click_bottom_clean.png) no-repeat";
        }
        this.div.style.left = (this.px.x + 1) + 'px';
        this.div.style.top = (this.px.y + 1) + 'px';
        if ((this.px.x + this.contextMenuHtml.clientWidth) > mapSize.w && (this.px.y + this.contextMenuHtml.clientHeight) < mapSize.h) {
            if (SAPO.Maps.Utils.checkIE6()) {
                this.contextMenuHtml.childNodes[0].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/ContextMenuControl/right_click_top_right.png',sizingMethod='crop')";
                this.contextMenuHtml.childNodes[2].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/ContextMenuControl/right_click_bottom_clean.png',sizingMethod='crop')";
            } else {
                this.contextMenuHtml.childNodes[0].style.background = "transparent url(http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/ContextMenuControl/right_click_top_right.png) no-repeat";
                this.contextMenuHtml.childNodes[2].style.background = "transparent url(http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/ContextMenuControl/right_click_bottom_clean.png) no-repeat";
            }
            this.div.style.left = (this.px.x - this.contextMenuHtml.clientWidth - 1) + 'px';
            this.div.style.top = (this.px.y + 1) + 'px';
        }
        if ((this.px.x + this.contextMenuHtml.clientWidth) > mapSize.w && (this.px.y + this.contextMenuHtml.clientHeight) > mapSize.h) {
            if (SAPO.Maps.Utils.checkIE6()) {
                this.contextMenuHtml.childNodes[0].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/ContextMenuControl/right_click_top_clean.png',sizingMethod='crop')";
                this.contextMenuHtml.childNodes[2].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/ContextMenuControl/right_click_bottom_right.png',sizingMethod='crop')";
            } else {
                this.contextMenuHtml.childNodes[0].style.background = "transparent url(http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/ContextMenuControl/right_click_top_clean.png) no-repeat 0 bottom";
                this.contextMenuHtml.childNodes[2].style.background = "transparent url(http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/ContextMenuControl/right_click_bottom_right.png) no-repeat";
            }
            this.div.style.left = (this.px.x - this.contextMenuHtml.clientWidth - 1) + 'px';
            this.div.style.top = (this.px.y - this.contextMenuHtml.clientHeight - 1) + 'px';
        }
        if ((this.px.x + this.contextMenuHtml.clientWidth) < mapSize.w && (this.px.y + this.contextMenuHtml.clientHeight) > mapSize.h) {
            if (SAPO.Maps.Utils.checkIE6()) {
                this.contextMenuHtml.childNodes[0].style.height = "17px";
                this.contextMenuHtml.childNodes[0].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/ContextMenuControl/right_click_top_clean.png',sizingMethod='crop')";
                this.contextMenuHtml.childNodes[2].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/ContextMenuControl/right_click_bottom_left.png',sizingMethod='crop')";
            } else {
                this.contextMenuHtml.childNodes[0].style.background = "transparent url(http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/ContextMenuControl/right_click_top_clean.png) no-repeat 0 bottom";
                this.contextMenuHtml.childNodes[2].style.background = "transparent url(http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/ContextMenuControl/right_click_bottom_left.png) no-repeat";
            }
            this.div.style.left = (this.px.x + 1) + 'px';
            this.div.style.top = (this.px.y - this.contextMenuHtml.clientHeight - 1) + 'px';
        }
    },
    hide: function (evt) {
        if (!this.isOnTheMap) {
            return;
        }
        if (evt && evt.type === 'mousedown' && !OpenLayers.Event.isLeftClick(evt)) {
            return true;
        }
        this.isOnTheMap = false;
        this.lonlat = null;
        this.px = null;
        this.unselectCurrentItem();
        this.div.removeChild(this.contextMenuHtml);
        if (this.copier) {
            this.copier.destroy();
        }
        return true;
    },
    clickOption: function (sectionIdx, selectedIdx, text) {
        if (!this.map) {
            return;
        }
        switch (text) {
        case 'Centrar o mapa aqui':
            var size = this.map.getSize();
            var x_min = this.borders.left;
            var y_min = this.borders.top;
            var x_max = size.w - this.borders.right;
            var y_max = size.h - this.borders.bottom;
            var center_x = x_min + Math.floor((x_max - x_min) / 2);
            var center_y = y_min + Math.floor((y_max - y_min) / 2);
            var dx = this.px.x - center_x;
            var dy = this.px.y - center_y;
            this.map.pan(dx, dy);
            if (SAPO.Maps.Utils.checkUrl()) {
                SapoMapsApp.Analytics.track("Funcionalidades", "contextMenu", "CentrarMapa");
            }
            break;
        case 'Zoom in':
            this.wheelChange(1);
            break;
        case 'Zoom out':
            this.wheelChange(-1);
            break;
        case 'Copiar coordenadas':
            var lat = this.lonlat.lat.toFixed(6);
            var lon = this.lonlat.lon.toFixed(6);
            SAPO.Maps.Utils.copy2Clipboard(lat + "," + lon);
            if (SAPO.Maps.Utils.checkUrl()) {
                SapoMapsApp.Analytics.track("Funcionalidades", "contextMenu", "CopiarClipboard");
            }
            break;
        }
    },
    selectItem: function (item) {
        if (this.selectedItem) {
            this.unselectCurrentItem();
        }
        SAPO.Maps.Utils.addClassName(item, 'li_selected_item');
        this.selectedItem = item;
    },
    unselectCurrentItem: function () {
        if (!this.selectedItem) {
            return;
        }
        SAPO.Maps.Utils.removeClassName(this.selectedItem, 'li_selected_item');
        this.selectedItem = null;
    },
    wheelChange: function (deltaZ) {
        var newZoom = this.map.getZoom() + deltaZ;
        if (!this.map.isValidZoomLevel(newZoom)) {
            return;
        }
        var size = this.map.getSize();
        var deltaX = size.w / 2 - this.px.x;
        var deltaY = this.px.y - size.h / 2;
        var newRes = this.map.baseLayer.getResolutionForZoom(newZoom);
        var zoomPoint = this.map.getLonLatFromPixel(this.px);
        var newCenter = new OpenLayers.LonLat(zoomPoint.lon + deltaX * newRes, zoomPoint.lat + deltaY * newRes);
        this.map.setCenter(newCenter, newZoom);
    },
    setCopy2ClipBoard: function () {
        var lis = this.div.childNodes[0].childNodes[1].childNodes[0];
        var elem = null;
        for (var i = 0; i < lis.childNodes.length; ++i) {
            if (lis.childNodes[i].innerHTML === "Copiar coordenadas") {
                elem = lis.childNodes[i];
            }
        }
        if (!elem) {
            return;
        }
        this.copier = SAPO.Maps.Utils.copy2ClipboardWhenClick(elem, function () {
            var lat = this.lonlat.lat.toFixed(6);
            var lon = this.lonlat.lon.toFixed(6);
            return lat + "," + lon;
        }.bindObj(this));
        if (this.copier.zeroClipboard) {
            this.copier.zeroClipboard.addEventListener('mouseOver', function () {
                this.selectItem(elem);
            }.bindObj(this));
        }
    },
    CLASS_NAME: 'SAPO.Maps.Control.ContextMenu'
});
SAPO.Maps.Control.MousePosition = OpenLayers.Class(OpenLayers.Control, {
    element: null,
    prefix: '',
    separator: ', ',
    suffix: '',
    numDigits: 6,
    granularity: 10,
    lastXy: null,
    displayProjection: null,
    isMinimized: true,
    minRightPosition: -125,
    nrSteps: 5,
    initialize: function (options) {
        this.displayProjection = new OpenLayers.Projection('EPSG:4326');
        OpenLayers.Control.prototype.initialize.apply(this, arguments);
    },
    toggle: function (minimize, animation) {
        if (this.isMinimized === minimize) {
            return;
        }
        this.isMinimized = minimize;
        if (!animation) {
            this.div.style.right = (minimize ? this.minRightPosition : 0) + 'px';
        } else {
            var current_x = minimize ? 0 : this.minRightPosition;
            var dx = this.minRightPosition / this.nrSteps;
            if (!minimize) {
                dx *= -1;
            }
            var _this = this;
            var interval = window.setInterval(function () {
                current_x += dx;
                if ((minimize && current_x <= _this.minRightPosition) || (!minimize && current_x >= 0)) {
                    _this.div.style.right = (minimize ? _this.minRightPosition : 0) + 'px';
                    clearInterval(interval);
                } else {
                    _this.div.style.right = current_x + 'px';
                }
            }, 5);
        }
        if (minimize) {
            this.unregisterListeners();
        } else {
            this.registerListeners();
        }
    },
    isOpened: function () {
        return !this.isMinimized;
    },
    destroy: function () {
        if (this.map) {
            this.unregisterListeners();
        }
        OpenLayers.Control.prototype.destroy.apply(this, arguments);
    },
    draw: function (px) {
        OpenLayers.Control.prototype.draw.apply(this, arguments);
        var holder = document.createElement('div');
        this.element = document.createElement('p');
        OpenLayers.Event.observe(holder, 'click', OpenLayers.Function.bindAsEventListener(this.toggleControl, this));
        OpenLayers.Event.observe(this.element, 'click', OpenLayers.Function.bindAsEventListener(this.stopBublingEvent, this));
        holder.className = 'coordinates';
        if (SAPO.Maps.Utils.checkIE6()) {
            holder.className += ' coordinates_ie6';
        }
        holder.appendChild(this.element);
        this.div.appendChild(holder);
        this.redraw();
        if (!px) {
            this.div.style.right = (this.isMinimized ? this.minRightPosition : 0) + 'px';
            this.div.style.bottom = '30px';
        } else {
            this.div.style.right = (this.isMinimized ? this.minRightPosition : 0) + 'px';
            this.div.style.top = px.y + 'px';
        }
        return this.div;
    },
    toggleControl: function () {
        this.toggle(!this.isMinimized, true);
    },
    stopBublingEvent: function (evt) {
        OpenLayers.Event.stop(evt);
    },
    redraw: function (evt) {
        var lonLat;
        if (!evt) {
            lonLat = this.map.getMapCenter();
        } else {
            if (this.lastXy === null || Math.abs(evt.xy.x - this.lastXy.x) > this.granularity || Math.abs(evt.xy.y - this.lastXy.y) > this.granularity) {
                this.lastXy = evt.xy;
                return;
            }
            lonLat = this.map.getLonLatFromPixel(evt.xy);
            if (!lonLat) {
                return;
            }
            if (this.displayProjection) {
                lonLat.transform(this.map.getProjectionObject(), this.displayProjection);
            }
            this.lastXy = evt.xy;
        }
        var newHtml = this.formatOutput(lonLat);
        if (newHtml != this.element.innerHTML) {
            this.element.innerHTML = newHtml;
        }
    },
    startMapDrag: function () {
        this.map.events.unregister('mousemove', this, this.redraw);
    },
    endMapDrag: function () {
        this.map.events.register('mousemove', this, this.redraw);
    },
    formatOutput: function (lonLat) {
        var digits = parseInt(this.numDigits, 10);
        var newHtml = this.prefix + lonLat.lat.toFixed(digits) + this.separator + lonLat.lon.toFixed(digits) + this.suffix;
        return newHtml;
    },
    setMap: function () {
        OpenLayers.Control.prototype.setMap.apply(this, arguments);
        if (!this.isMinimized) {
            this.registerListeners();
        }
    },
    registerListeners: function () {
        this.map.events.register('mousemove', this, this.redraw);
        this.map.events.register('movestart', this, this.startMapDrag);
        this.map.events.register('moveend', this, this.endMapDrag);
    },
    unregisterListeners: function () {
        this.map.events.unregister('mousemove', this, this.redraw);
        this.map.events.unregister('movestart', this, this.startMapDrag);
        this.map.events.unregister('moveend', this, this.endMapDrag);
    },
    CLASS_NAME: "SAPO.Maps.Control.MousePosition"
});
SAPO.Maps.Popup.SapoPopup = OpenLayers.Class(OpenLayers.Popup, {
    displayClass: null,
    contentDisplayClass: null,
    _closeBox: false,
    _closeBoxCallback: null,
    _popupAnchor: null,
    _popupSize: null,
    _borders: null,
    _pan: null,
    initialize: function (id, lonlat, contentSize, contentHTML, closeBox, closeBoxCallback, popupAnchor, borders, pan) {
        OpenLayers.Popup.prototype.initialize.apply(this, arguments);
        this._closeBox = closeBox || this._closeBox;
        this._closeBoxCallback = closeBoxCallback;
        this._popupAnchor = popupAnchor;
        if (borders && borders.left !== null && borders.bottom !== null && borders.right !== null && borders.top !== null) {
            this._borders = borders;
        } else {
            this._borders = {
                left: 62,
                bottom: 25,
                right: 0,
                top: 43
            };
        }
        this._pan = pan === false ? false : true;
    },
    draw: function (px) {
        if (!px) {
            if ((this.lonlat) && (this.map)) {
                px = this.map.getLayerPxFromLonLat(this.lonlat);
            }
        }
        this.px = px;
        while (this.div.hasChildNodes()) {
            this.div.removeChild(this.div.childNodes[0]);
        }
        var div_smapi_popup_wrapper = document.createElement("div");
        var div_close_btn_smapi = document.createElement("div");
        var div_smapi_popup_top_left_corner = document.createElement("div");
        var div_smapi_popup_top_center = document.createElement("div");
        var div_smapi_popup_top_right_corner = document.createElement("div");
        var div_smapi_popup_middle_left = document.createElement("div");
        var div_smapi_popup_middle_center = document.createElement("div");
        var div_smapi_popup_content = document.createElement("div");
        var div_smapi_popup_bgi = document.createElement("div");
        var div_smapi_popup_middle_right = document.createElement("div");
        var div_smapi_popup_bottom_left_corner = document.createElement("div");
        var div_smapi_popup_bottom_center = document.createElement("div");
        var div_smapi_popup_bottom_right_corner = document.createElement("div");
        var img_sprite = document.createElement("img");
        div_smapi_popup_wrapper.className = "smapi_popup_wrapper";
        div_close_btn_smapi.className = "close_btn_smapi";
        div_smapi_popup_top_left_corner.className = "smapi_popup_top_left_corner";
        div_smapi_popup_top_center.className = "smapi_popup_top_center";
        div_smapi_popup_top_right_corner.className = "smapi_popup_top_right_corner";
        div_smapi_popup_middle_left.className = "smapi_popup_middle_left";
        div_smapi_popup_middle_center.className = "smapi_popup_middle_center";
        div_smapi_popup_content.className = "smapi_popup_content";
        div_smapi_popup_bgi.className = "smapi_popup_bgi";
        div_smapi_popup_middle_right.className = "smapi_popup_middle_right";
        div_smapi_popup_bottom_left_corner.className = "smapi_popup_bottom_left_corner";
        div_smapi_popup_bottom_center.className = "smapi_popup_bottom_center";
        div_smapi_popup_bottom_right_corner.className = "smapi_popup_bottom_right_corner";
        img_sprite.width = "1000";
        img_sprite.height = "1009";
        img_sprite.src = "http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/Popup/sprite2.png";
        if (OpenLayers.Util.getBrowserName() === 'msie') {
            var ie_version = parseFloat(navigator.appVersion.split("MSIE")[1]);
            if (ie_version < 7) {
                img_sprite.src = "http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/Popup/sprite2.gif";
                div_smapi_popup_middle_center.className += " smapi_popup_middle_center_ie6";
                div_smapi_popup_bgi.className += " smapi_popup_bgi_ie6";
                div_smapi_popup_top_center.className += " popup_ie6_width";
                div_smapi_popup_middle_left.className += " popup_ie6_height";
                div_smapi_popup_bgi.className += " popup_ie6_width popup_ie6_height";
                div_smapi_popup_middle_right.className += " popup_ie6_height";
            }
        }
        div_smapi_popup_top_left_corner.appendChild(img_sprite);
        div_smapi_popup_top_center.appendChild(img_sprite.cloneNode(false));
        div_smapi_popup_top_right_corner.appendChild(img_sprite.cloneNode(false));
        div_smapi_popup_middle_left.appendChild(img_sprite.cloneNode(false));
        div_smapi_popup_bgi.appendChild(img_sprite.cloneNode(false));
        div_smapi_popup_middle_right.appendChild(img_sprite.cloneNode(false));
        div_smapi_popup_bottom_left_corner.appendChild(img_sprite.cloneNode(false));
        div_smapi_popup_bottom_center.appendChild(img_sprite.cloneNode(false));
        div_smapi_popup_bottom_right_corner.appendChild(img_sprite.cloneNode(false));
        div_smapi_popup_middle_center.appendChild(div_smapi_popup_content);
        if (this._closeBox) {
            this.closeDiv = div_close_btn_smapi;
            div_smapi_popup_wrapper.appendChild(div_close_btn_smapi);
            var closePopup = this._closeBoxCallback ||
            function (e) {
                this.hide();
                OpenLayers.Event.stop(e);
            };
            OpenLayers.Event.observe(this.closeDiv, "click", OpenLayers.Function.bindAsEventListener(closePopup, this));
        }
        div_smapi_popup_wrapper.appendChild(div_smapi_popup_top_left_corner);
        div_smapi_popup_wrapper.appendChild(div_smapi_popup_top_center);
        div_smapi_popup_wrapper.appendChild(div_smapi_popup_top_right_corner);
        div_smapi_popup_wrapper.appendChild(div_smapi_popup_middle_left);
        div_smapi_popup_wrapper.appendChild(div_smapi_popup_middle_center);
        div_smapi_popup_wrapper.appendChild(div_smapi_popup_bgi);
        div_smapi_popup_wrapper.appendChild(div_smapi_popup_middle_right);
        div_smapi_popup_wrapper.appendChild(div_smapi_popup_bottom_left_corner);
        div_smapi_popup_wrapper.appendChild(div_smapi_popup_bottom_center);
        div_smapi_popup_wrapper.appendChild(div_smapi_popup_bottom_right_corner);
        this.div.appendChild(div_smapi_popup_wrapper);
        this.contentDiv = div_smapi_popup_content;
        this.setContentHTML();
        this.updateSize();
        this.moveTo(px, this._pan);
        return this.div;
    },
    setContentHTML: function (contentHTML) {
        if (typeof (this.contentHTML) === 'string') {
            this.contentDiv.innerHTML = this.contentHTML;
        } else {
            this.contentDiv.appendChild(this.contentHTML);
        }
        this.registerImageListeners();
    },
    setSize: function (contentSize) {
        this.div.style.width = contentSize.w + "px";
        this.div.style.height = contentSize.h + "px";
        if (OpenLayers.Util.getBrowserName() === 'msie') {
            var ie_version = parseFloat(navigator.appVersion.split("MSIE")[1]);
            if (ie_version < 7) {
                this.div.getElementsByClassName = function (cl) {
                    var retnode = [];
                    var myclass = new RegExp('\\b' + cl + '\\b');
                    var elem = this.getElementsByTagName('*');
                    for (var i = 0; i < elem.length; i++) {
                        var classes = elem[i].className;
                        if (myclass.test(classes)) {
                            retnode.push(elem[i]);
                        }
                    }
                    return retnode;
                };
                var elementsWidth = this.div.getElementsByClassName("popup_ie6_width");
                var elementsHeight = this.div.getElementsByClassName("popup_ie6_height");
                for (var i = 0; i < elementsWidth.length; ++i) {
                    elementsWidth[i].style.width = (contentSize.w - 34) + "px";
                }
                for (var j = 0; j < elementsHeight.length; ++j) {
                    elementsHeight[j].style.height = (contentSize.h - 46) + "px";
                }
            }
        }
    },
    updateSize: function () {
        var realSize = this.getPopupDimensions();
        this._popupSize = realSize;
        this.setSize(this._popupSize);
    },
    moveTo: function (px, pan) {
        if (this._popupAnchor) {
            px = px.add(this._popupAnchor.x, this._popupAnchor.y);
        }
        this.div.style.top = (px.y - this._popupSize.h + 5) + "px";
        this.div.style.left = (px.x - (this._popupSize.w / 2) - 9) + "px";
        if (pan) {
            this.panIntoView(this._popupSize);
        }
    },
    contentUpdated: function () {
        this.updateSize();
        this.moveTo(this.px, this._pan);
    },
    registerImageListeners: function () {
        var onImgLoad = function () {
                this.popup.updateSize();
                if ((this.popup.lonlat) && (this.popup.map)) {
                    var px = this.popup.map.getLayerPxFromLonLat(this.popup.lonlat);
                    this.popup.moveTo(px, this.popup._pan);
                }
                OpenLayers.Event.stopObserving(this.img, "load", this.img._onImgLoad);
            };
        var images = this.contentDiv.getElementsByTagName("img");
        for (var i = 0; i < images.length; i++) {
            var img = images[i];
            var context = {
                'popup': this,
                'img': img
            };
            img._onImgLoad = OpenLayers.Function.bind(onImgLoad, context);
            OpenLayers.Event.observe(img, 'load', img._onImgLoad);
        }
    },
    panIntoView: function (size) {
        var mapSize = this.map.getSize();
        var origTL = this.map.getViewPortPxFromLayerPx(new OpenLayers.Pixel(parseInt(this.div.style.left, 10), parseInt(this.div.style.top, 10)));
        var dx = 0,
            dy = 0;
        if (origTL.x < 0 + this._borders.left) {
            dx = origTL.x - this._borders.left;
        }
        if ((origTL.x + size.w) > mapSize.w) {
            dx = this._popupSize.w - (mapSize.w - origTL.x);
        }
        if (origTL.y < 0 + this._borders.top) {
            dy = origTL.y - this._borders.top;
        }
        if ((origTL.y + size.h) > mapSize.h - this._borders.bottom) {
            dy = this._popupSize.h - (mapSize.h - origTL.y) + this._borders.bottom;
        }
        this.map.pan(dx, dy);
    },
    getRenderedDimensions: function (contentHTML) {
        var w, h;
        var container = document.createElement("div");
        container.style.overflow = "";
        container.style.position = "absolute";
        container.style.left = "-9999px";
        var content = document.createElement("div");
        content.innerHTML = contentHTML;
        container.appendChild(content);
        document.body.appendChild(container);
        w = container.childNodes[0].childNodes[0].childNodes[0].clientWidth;
        h = container.childNodes[0].childNodes[0].childNodes[0].clientHeight;
        container.removeChild(content);
        document.body.removeChild(container);
        return new OpenLayers.Size(w, h);
    },
    getPopupDimensions: function () {
        if (OpenLayers.Util.getBrowserName() !== 'msie') {
            var images = this.contentDiv.getElementsByTagName("img");
            var image = null;
            for (var i = 0; i < images.length; ++i) {
                image = images[i];
                if (image.width === 0 && image.height === 0) {
                    image.width = image.naturalWidth ? image.naturalWidth : image.width;
                    image.height = image.naturalHeight ? image.naturalHeight : image.height;
                }
            }
        }
        var copy = this.div.childNodes[0].cloneNode(true);
        copy.style.position = "absolute";
        copy.style.left = "-9999px";
        if (this.map && this.map.div) {
            this.map.div.appendChild(copy);
        } else {
            document.body.appendChild(copy);
        }
        var size = new OpenLayers.Size(copy.clientWidth, copy.clientHeight);
        if (this.map && this.map.div) {
            this.map.div.removeChild(copy);
        } else {
            document.body.removeChild(copy);
        }
        return size;
    },
    CLASS_NAME: "SAPO.Maps.Popup.SapoPopup"
});
SAPO.Maps.Overlay = OpenLayers.Class({
    layer: null,
    draggable: false,
    popup: null,
    events: null,
    dragRegistered: false,
    options: null,
    initialize: function (options) {
        this.options = OpenLayers.Util.extend({
            popupAnchor: new OpenLayers.Pixel(0, 0)
        }, options);
        this.events = {};
    },
    getFeature: function () {},
    removed: function () {
        if (this.popup) {
            this.layer.map.removePopup(this.popup);
        }
        var listeners = false;
        for (var e in this.events) {
            listeners = this.events[e];
            if (listeners) {
                for (var i = listeners.length - 1; i >= 0; --i) {
                    this.unRegisterFromMapHandler(e, listeners[i].context, listeners[i].func);
                }
            }
        }
        if (this.draggingEnabled()) {
            this.layer.map.dragControl.removeFeature(this.getFeature());
            if (!this.dragRegistered && this.hasOpenedPopup()) {
                this.dragRegistered = this.unRegisterFromMapHandler('dragstart', this, this.closePopup);
            }
        }
        this.layer = null;
    },
    setLayer: function (layer) {
        this.layer = layer;
        if (this.popup) {
            this.layer.map.addPopup(this.popup, false);
        }
        var listeners = false;
        for (var e in this.events) {
            listeners = this.events[e];
            if (listeners) {
                for (var i = listeners.length - 1; i >= 0; --i) {
                    this.registerOnMapHandler(e, listeners[i].context, listeners[i].func);
                }
            }
        }
        if (this.draggingEnabled()) {
            this.layer.map.dragControl.addFeature(this.getFeature());
            if (this.dragRegistered) {
                this.dragRegistered = this.registerOnMapHandler('dragstart', this, this.closePopup);
            }
        }
    },
    openPopup: function (content, options) {
        if (this.popup) {
            return;
        }
        popupAnchor = this.getPopupAnchor().transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
        if (!popupAnchor) {
            return;
        }
        var _this = this;
        this.popup = new SAPO.Maps.Popup.SapoPopup(popupAnchor.toShortString(), popupAnchor, null, content, true, function () {
            _this.closePopup.apply(_this, []);
        }, this.options.popupAnchor, options ? options.borders : null, options ? options.pan : null);
        if (this.layer) {
            this.layer.map.addPopup(this.popup, false);
            this.dragRegistered = this.registerOnMapHandler('dragstart', this, this.closePopup);
        }
        this.notifyListeners('popupopened', []);
    },
    closePopup: function () {
        if (!this.popup) {
            return;
        }
        this.popup.div.style.visibility = "hidden";
        if (this.layer) {
            this.layer.map.removePopup(this.popup);
            this.dragRegistered = this.unRegisterFromMapHandler('dragstart', this, this.closePopup);
        }
        this.popup = null;
        this.notifyListeners('popupclosed', []);
    },
    hasOpenedPopup: function () {
        if (this.popup) {
            return true;
        }
        return false;
    },
    hidePopup: function () {
        if (this.popup) {
            this.popup.hide();
        }
    },
    showPopup: function () {
        if (this.popup) {
            this.popup.show();
        }
    },
    enableDragging: function () {
        if (this.draggable) {
            return;
        }
        this.draggable = true;
        if (this.layer && this.layer.map) {
            this.layer.map.dragControl.addFeature(this.getFeature());
        }
        this.notifyListeners('enabledragging', [this]);
    },
    disableDragging: function () {
        if (!this.draggable) {
            return;
        }
        this.draggable = false;
        if (this.layer && this.layer.map) {
            this.layer.map.dragControl.removeFeature(this.getFeature());
        }
        this.notifyListeners('disabledragging', [this]);
    },
    draggingEnabled: function () {
        return this.draggable;
    },
    getPopupAnchor: function () {
        return null;
    },
    clone: function () {
        return null;
    },
    registerEvent: function (eventType, context, func) {
        this.registerOnMapHandler(eventType, context, func);
        if (!this.events[eventType]) {
            this.events[eventType] = [];
        }
        var obj = {
            func: func,
            context: context
        };
        this.events[eventType].push(obj);
    },
    unRegisterEvent: function (eventType, context, func) {
        this.unRegisterFromMapHandler(eventType, context, func);
        var evts = this.events[eventType] ? this.events[eventType] : [];
        for (var i = 0; i < evts.length; ++i) {
            if (context == evts[i].context && func == evts[i].func) {
                evts.splice(i, 1);
                return true;
            }
        }
        return false;
    },
    registerOnMapHandler: function (eventType, context, func) {
        if (this.layer && this.layer.map) {
            var map = this.layer.map;
            if (map.dragControl.supportEvent(eventType) === true) {
                map.dragControl.registerEvent(this.getFeature(), eventType, context, func, [this]);
            } else {
                if (map.featureEventHandler.supportEvent(eventType) === true) {
                    map.featureEventHandler.registerEvent(this.getFeature(), eventType, context, func, [this]);
                }
            }
            return true;
        }
        return false;
    },
    unRegisterFromMapHandler: function (eventType, context, func) {
        if (this.layer && this.layer.map) {
            var map = this.layer.map;
            if (map.dragControl.supportEvent(eventType) === true) {
                map.dragControl.unRegisterEvent(this.getFeature(), eventType, context, func, [this]);
            } else {
                if (map.featureEventHandler.supportEvent(eventType) === true) {
                    map.featureEventHandler.unRegisterEvent(this.getFeature(), eventType, context, func, [this]);
                }
            }
            return true;
        }
        return false;
    },
    notifyListeners: function (eventType, args) {
        var evts = this.events[eventType] ? this.events[eventType] : [];
        args = args ? args : [];
        var func, context;
        for (var i = 0; i < evts.length; ++i) {
            func = evts[i].func;
            context = evts[i].context;
            func.apply(context, args);
        }
    },
    updatePopupPosition: function () {
        if (!this.hasOpenedPopup()) {
            return;
        }
        var lonlat = this.getPopupAnchor();
        var px = this.layer.map.getContainerPixelFromLonLat(lonlat);
        this.popup.moveTo(px);
    },
    EVENT_TYPES: ['popupopened', 'popupclosed', 'click', 'dblclick', 'mousedown', 'mouseup', 'mouseover', 'mouseout', 'dragstart', 'drag', 'dragend', 'enabledragging', 'disabledragging'],
    CLASS_NAME: 'SAPO.Maps.Overlay'
});
SAPO.Maps.Markers = OpenLayers.Class({
    layer: null,
    map: null,
    initialize: function (markersLayerName) {
        markersLayerName = markersLayerName ? markersLayerName : "Markers Layer";
        this.layer = new OpenLayers.Layer.Vector(markersLayerName, {
            projection: new OpenLayers.Projection("EPSG:4326")
        });
    },
    addMarker: function (marker) {
        this.layer.addFeatures([marker.feature]);
        marker.feature.overlay = marker;
        if (this.map) {
            marker.setLayer(this.layer);
        }
    },
    addMarkers: function (markersArray) {
        for (var i = 0; i < markersArray.length; ++i) {
            this.addMarker(markersArray[i]);
        }
    },
    getBounds: function () {
        var markers = this.getMarkers();
        if (markers.length === 0) {
            return null;
        }
        var left = null;
        var right = null;
        var top = null;
        var bottom = null;
        var lonlat;
        for (var i = 0; i < markers.length; ++i) {
            lonlat = markers[i].getLonLat();
            if (!left && !right && !top && !bottom) {
                left = right = lonlat.lon;
                bottom = top = lonlat.lat;
            } else {
                if (lonlat.lon < left) {
                    left = lonlat.lon;
                }
                if (lonlat.lat < bottom) {
                    bottom = lonlat.lat;
                }
                if (lonlat.lon > right) {
                    right = lonlat.lon;
                }
                if (lonlat.lat > top) {
                    top = lonlat.lat;
                }
            }
        }
        return new OpenLayers.Bounds(left, bottom, right, top);
    },
    removeMarker: function (marker) {
        this.layer.removeFeatures([marker.feature]);
        marker.overlay = null;
        marker.removed();
    },
    getMarkers: function () {
        var markers = [];
        var features = this.layer.features;
        for (var i = 0; i < features.length; ++i) {
            markers.push(features[i].overlay);
        }
        return markers;
    },
    removeMarkers: function () {
        var features = this.layer.features;
        for (var i = features.length - 1; i >= 0; --i) {
            this.removeMarker(features[i].overlay);
        }
    },
    setMap: function (map) {
        this.map = map;
        var feature;
        for (var i = 0; i < this.layer.features.length; ++i) {
            feature = this.layer.features[i];
            feature.overlay.setLayer(this.layer);
        }
    },
    unloadLayer: function () {
        var feature = false;
        if (this.layer.features) {
            for (var i = 0; i < this.layer.features.length; ++i) {
                feature = this.layer.features[i];
                feature.overlay.removed();
            }
        }
    },
    CLASS_NAME: 'SAPO.Maps.Markers'
});
SAPO.Maps.Marker = OpenLayers.Class(SAPO.Maps.Overlay, {
    style: null,
    feature: null,
    ishidden: false,
    initialize: function (lonlat, options, style) {
        var pA = (options && options.popupAnchor) ? options.popupAnchor : new OpenLayers.Pixel(0, -38);
        SAPO.Maps.Overlay.prototype.initialize.apply(this, [{
            popupAnchor: pA
        }]);
        this.style = {
            markerImage: 'http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/Markers/pin.png',
            markerShadow: '',
            size: new OpenLayers.Size(23, 38),
            markerAnchor: new OpenLayers.Pixel(-11, -38),
            shadowAnchor: new OpenLayers.Pixel(0, 0),
            radius: 15,
            display: ''
        };
        OpenLayers.Util.extend(this, options);
        if (style) {
            this.style = OpenLayers.Util.extend(this.style, style);
        }
        var coords = lonlat.clone().transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
        this.feature = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(coords.lon, coords.lat), null, this._getStyle());
    },
    getFeature: function () {
        return this.feature;
    },
    getPopupAnchor: function () {
        return this.getLonLat();
    },
    clone: function () {
        var newStyle = OpenLayers.Util.extend({}, this.style);
        var m = new SAPO.Maps.Marker(this.getLonLat(), {
            draggable: this.draggingEnabled()
        }, newStyle);
        return m;
    },
    getLonLat: function () {
        var lon = this.feature.geometry.x;
        var lat = this.feature.geometry.y;
        return new OpenLayers.LonLat(lon, lat).transform(new OpenLayers.Projection("EPSG:900913"), new OpenLayers.Projection("EPSG:4326"));
    },
    setLonLat: function (lonlat) {
        var coords = lonlat.clone().transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
        var deltax = coords.lon - this.feature.geometry.x;
        var deltay = coords.lat - this.feature.geometry.y;
        this.feature.geometry.move(deltax, deltay);
        if (this.hasOpenedPopup()) {
            this.popup.lonlat = lonlat.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
            this.popup.updatePosition();
        }
        this.feature.style = this._getStyle();
        this.layer.drawFeature(this.feature);
    },
    setStyle: function (style) {
        if (!style) {
            return;
        }
        this.style = OpenLayers.Util.extend(this.style, style);
        this.feature.style = this._getStyle();
        if (this.layer) {
            this.layer.drawFeature(this.feature);
        }
    },
    getStyle: function () {
        return this.style;
    },
    show: function () {
        if (!this.isHidden()) {
            return;
        }
        this.ishidden = false;
        this.style.display = '';
        if (this.hasOpenedPopup()) {
            this.showPopup();
        }
        this.layer.drawFeature(this.feature, this._getStyle());
        this.notifyListeners('visibilitychange');
    },
    hide: function () {
        if (this.isHidden()) {
            return;
        }
        this.ishidden = true;
        this.style.display = 'none';
        if (this.hasOpenedPopup()) {
            this.hidePopup();
        }
        this.layer.drawFeature(this.feature, this._getStyle());
        this.notifyListeners('visibilitychange');
    },
    isHidden: function () {
        return this.ishidden;
    },
    _getStyle: function () {
        return {
            externalGraphic: this.style.markerImage,
            backgroundGraphic: this.style.markerShadow,
            graphicXOffset: this.style.markerAnchor.x,
            graphicYOffset: this.style.markerAnchor.y,
            backgroundXOffset: this.style.shadowAnchor.x,
            backgroundYOffset: this.style.shadowAnchor.y,
            graphicZIndex: 10,
            backgroundGraphicZIndex: 11,
            pointRadius: this.style.radius,
            graphicWidth: this.style.size.w,
            graphicHeight: this.style.size.h,
            display: this.style.display
        };
    },
    EVENT_TYPES: ['click', 'dblclick', 'mousedown', 'mouseup', 'mouseover', 'mouseout', 'popupopened', 'popupclosed', 'dragstart', 'drag', 'dragend', 'visibilitychange', 'enabledragging', 'disabledragging'],
    CLASS_NAME: 'SAPO.Maps.Marker'
});
SAPO.Maps.Polyline = OpenLayers.Class(SAPO.Maps.Overlay, {
    style: null,
    feature: null,
    ishidden: false,
    initialize: function (lonlats, style) {
        SAPO.Maps.Overlay.prototype.initialize.apply(this, []);
        this.style = {
            strokeColor: '#ee9900',
            strokeOpacity: 1,
            strokeWidth: 2,
            strokeLinecap: 'round',
            strokeDashstyle: 'solid',
            pointRadius: 6,
            cursor: '',
            display: ''
        };
        if (style) {
            this.style = OpenLayers.Util.extend(this.style, style);
        }
        var points = [];
        var lonlat;
        for (var i = 0; i < lonlats.length; ++i) {
            lonlat = lonlats[i].clone().transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
            points.push(new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat));
        }
        this.feature = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LineString(points), null, this.style);
    },
    getFeature: function () {
        return this.feature;
    },
    clone: function () {
        var newStyle = OpenLayers.Util.extend({}, this.style);
        var cloned = new SAPO.Maps.Polyline([], newStyle);
        cloned.feature = this.feature.clone();
        return cloned;
    },
    getVertexCount: function () {
        return this.feature.geometry.components.length;
    },
    getVertex: function (index) {
        if (index < 0 || index >= this.feature.geometry.components.length) {
            return null;
        }
        var point = this.feature.geometry.components[index];
        var lonlat = new OpenLayers.LonLat(point.x, point.y);
        lonlat.transform(new OpenLayers.Projection("EPSG:900913"), new OpenLayers.Projection("EPSG:4326"));
        return lonlat;
    },
    getLonLats: function () {
        var arr = [];
        var length = this.getVertexCount();
        var lonlat = false;
        for (var i = 0; i < length; ++i) {
            arr.push(this.getVertex(i));
        }
        return arr;
    },
    getLength: function () {
        return this.feature.geometry.getLength();
    },
    getBounds: function () {
        var bounds = this.feature.geometry.getBounds().clone();
        bounds.transform(new OpenLayers.Projection("EPSG:900913"), new OpenLayers.Projection("EPSG:4326"));
        return bounds;
    },
    hide: function () {
        if (this.ishidden) {
            return;
        }
        this.style.display = 'none';
        this.ishidden = true;
        if (!this.layer) {
            return;
        }
        this.layer.drawFeature(this.feature, this.style);
        this.notifyListeners('visibilitychange', [false]);
    },
    insertVertex: function (index, lonlat) {
        var coords = lonlat.clone().transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
        var point = new OpenLayers.Geometry.Point(coords.lon, coords.lat);
        this.feature.geometry.addPoint(point, index);
        if (this.layer) {
            this.layer.drawFeature(this.feature, this.style);
        }
    },
    isHidden: function () {
        return this.ishidden;
    },
    show: function () {
        if (!this.ishidden) {
            return;
        }
        this.style.display = '';
        this.ishidden = false;
        if (!this.layer) {
            return;
        }
        this.layer.drawFeature(this.feature, this.style);
        this.notifyListeners('visibilitychange', [true]);
    },
    setStyle: function (style) {
        if (!style) {
            return;
        }
        this.style = OpenLayers.Util.extend(this.style, style);
        if (this.layer) {
            this.layer.drawFeature(this.feature, this.style);
        }
    },
    getStyle: function () {
        return this.style;
    },
    EVENT_TYPES: ['click', 'dbclick', 'mousedown', 'mouseup', 'mouseover', 'mouseout', 'visibilitychange'],
    CLASS_NAME: 'SAPO.Maps.Polyline'
});
SAPO.Maps.Polygon = OpenLayers.Class(SAPO.Maps.Overlay, {
    style: null,
    ishidden: false,
    feature: null,
    initialize: function (lonlats, style) {
        SAPO.Maps.Overlay.prototype.initialize.apply(this, []);
        this.style = {
            fillColor: '#ee9900',
            fillOpacity: 0.8,
            strokeColor: '#ee9900',
            strokeOpacity: 0.8,
            strokeWidth: 2,
            strokeLinecap: 'round',
            strokeDashstyle: 'solid',
            pointRadius: 6,
            cursor: '',
            display: ''
        };
        if (style) {
            this.style = OpenLayers.Util.extend(this.style, style);
        }
        var points = [];
        var lonlat;
        for (var i = 0; i < lonlats.length; ++i) {
            lonlat = lonlats[i].clone().transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
            points.push(new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat));
        }
        var ring = new OpenLayers.Geometry.LinearRing(points);
        var polygon = new OpenLayers.Geometry.Polygon([ring]);
        this.feature = new OpenLayers.Feature.Vector(polygon, null, this.style);
    },
    getFeature: function () {
        return this.feature;
    },
    clone: function () {
        var newStyle = OpenLayers.Util.extend({}, this.style);
        var cloned = new SAPO.Maps.Polygon(this.getLonLats(), newStyle);
        return cloned;
    },
    getVertexCount: function () {
        return this.feature.geometry.components[0].components.length - 1;
    },
    getVertex: function (index) {
        if (index < 0 || index >= this.feature.geometry.components[0].components.length) {
            return null;
        }
        var point = this.feature.geometry.components[0].components[index];
        var lonlat = new OpenLayers.LonLat(point.x, point.y);
        return lonlat.transform(new OpenLayers.Projection("EPSG:900913"), new OpenLayers.Projection("EPSG:4326"));
    },
    getLonLats: function () {
        var arr = [];
        var length = this.getVertexCount();
        var lonlat = false;
        for (var i = 0; i < length; ++i) {
            arr.push(this.getVertex(i));
        }
        return arr;
    },
    getArea: function () {
        return this.feature.geometry.getArea();
    },
    getBounds: function () {
        var bounds = this.feature.geometry.getBounds().clone();
        bounds.transform(new OpenLayers.Projection("EPSG:900913"), new OpenLayers.Projection("EPSG:4326"));
        return bounds;
    },
    hide: function () {
        if (this.ishidden) {
            return;
        }
        this.style.display = 'none';
        this.ishidden = true;
        if (!this.layer) {
            return;
        }
        this.layer.drawFeature(this.feature, this.style);
        this.notifyListeners('visibilitychange', [false]);
    },
    insertVertex: function (index, lonlat) {
        var ring = this.feature.geometry.components[0];
        var coords = lonlat.clone().transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
        var point = new OpenLayers.Geometry.Point(coords.lon, coords.lat);
        ring.addComponent(point, index);
        if (this.layer) {
            this.layer.drawFeature(this.feature, this.style);
        }
    },
    isHidden: function () {
        return this.ishidden;
    },
    show: function () {
        if (!this.ishidden) {
            return;
        }
        this.style.display = '';
        this.ishidden = false;
        if (!this.layer) {
            return;
        }
        this.layer.drawFeature(this.feature, this.style);
        this.notifyListeners('visibilitychange', [true]);
    },
    setStyle: function (style) {
        if (!style) {
            return;
        }
        this.style = OpenLayers.Util.extend(this.style, style);
        if (this.layer) {
            this.layer.drawFeature(this.feature, this.style);
        }
    },
    getStyle: function () {
        return this.style;
    },
    EVENT_TYPES: ['click', 'dbclick', 'mousedown', 'mouseup', 'mouseover', 'mouseout', 'visibilitychange'],
    CLASS_NAME: 'SAPO.Maps.Polygon'
});
SAPO.Maps.Poi = OpenLayers.Class({
    POIId: null,
    Name: null,
    CountryId: null,
    Country: null,
    DistrictId: null,
    District: null,
    MunicipalityId: null,
    Municipality: null,
    ParishId: null,
    Parish: null,
    Address: null,
    Latitude: null,
    Longitude: null,
    CategoryId: null,
    Category: null,
    initialize: function (info) {
        OpenLayers.Util.extend(this, info);
    },
    loadPOI: function (namespace, GISpoi) {
        this.POIId = GISpoi[namespace + ':' + 'POIId'];
        this.Name = GISpoi[namespace + ':' + 'Name'];
        this.CountryId = GISpoi[namespace + ':' + 'CountryId'];
        this.Country = GISpoi[namespace + ':' + 'Country'];
        this.DistrictId = GISpoi[namespace + ':' + 'DistrictId'];
        this.District = GISpoi[namespace + ':' + 'DistrictId'];
        this.MunicipalityId = GISpoi[namespace + ':' + 'MunicipalityId'];
        this.Municipality = GISpoi[namespace + ':' + 'Municipality'];
        this.ParishId = GISpoi[namespace + ':' + 'ParishId'];
        this.Parish = GISpoi[namespace + ':' + 'ParishId'];
        this.Address = GISpoi[namespace + ':' + 'Address'];
        this.ZipCode = GISpoi[namespace + ':' + 'ZipCode'];
        this.Phone = GISpoi[namespace + ':' + 'Phone'];
        this.Fax = GISpoi[namespace + ':' + 'Fax'];
        this.LocalityId = GISpoi[namespace + ':' + 'LocalityId'];
        this.Locality = GISpoi[namespace + ':' + 'Locality'];
        this.StreetId = GISpoi[namespace + ':' + 'StreetId'];
        this.Street = GISpoi[namespace + ':' + 'Street'];
        this.HouseNumber = GISpoi[namespace + ':' + 'HouseNumber'];
        this.Latitude = GISpoi[namespace + ':' + 'Latitude'];
        this.Longitude = GISpoi[namespace + ':' + 'Longitude'];
        this.Distance = GISpoi[namespace + ':' + 'Distance'];
        this.CategoryId = GISpoi[namespace + ':' + 'CategoryId'];
        this.Category = GISpoi[namespace + ':' + 'Category'];
        this.MimeType = GISpoi[namespace + ':' + 'MimeType'];
        this.SourceId = GISpoi[namespace + ':' + 'SourceId'];
        this.Source = GISpoi[namespace + ':' + 'Source'];
        this.POISourceId = GISpoi[namespace + ':' + 'POISourceId'];
        this.URL = GISpoi[namespace + ':' + 'URL'];
        this.EMail = GISpoi[namespace + ':' + 'EMail'];
        this.PublicationDate = GISpoi[namespace + ':' + 'PublicationDate'];
        this.RegistrationDate = GISpoi[namespace + ':' + 'RegistrationDate'];
        this.ExpirationDate = GISpoi[namespace + ':' + 'ExpirationDate'];
        this.Description = GISpoi[namespace + ':' + 'Description'];
        this.Detail = GISpoi[namespace + ':' + 'Detail'];
        this.Tags = GISpoi[namespace + ':' + 'Tags'];
        this.MatchLevelId = GISpoi[namespace + ':' + 'MatchLevelId'];
        this.MatchLevel = GISpoi[namespace + ':' + 'MatchLevel'];
        this.TrustLevelId = GISpoi[namespace + ':' + 'TrustLevelId'];
        this.TrustLevel = GISpoi[namespace + ':' + 'TrustLevel'];
        this.LastModified = GISpoi[namespace + ':' + 'LastModified'];
        this.Revision = GISpoi[namespace + ':' + 'Revision'];
        this.DetailXml = GISpoi[namespace + ':' + 'DetailXml'];
    },
    CLASS_NAME: "SAPO.Maps.Poi"
});
var ZeroClipboard = {
    version: "1.0.4",
    clients: {},
    moviePath: 'ZeroClipboard.swf',
    nextId: 1,
    $: function (thingy) {
        if (typeof (thingy) == 'string') thingy = document.getElementById(thingy);
        if (!thingy.addClass) {
            thingy.hide = function () {
                this.style.display = 'none';
            };
            thingy.show = function () {
                this.style.display = '';
            };
            thingy.addClass = function (name) {
                this.removeClass(name);
                this.className += ' ' + name;
            };
            thingy.removeClass = function (name) {
                this.className = this.className.replace(new RegExp("\\s*" + name + "\\s*"), " ").replace(/^\s+/, '').replace(/\s+$/, '');
            };
            thingy.hasClass = function (name) {
                return !!this.className.match(new RegExp("\\s*" + name + "\\s*"));
            }
        }
        return thingy;
    },
    setMoviePath: function (path) {
        this.moviePath = path;
    },
    dispatch: function (id, eventName, args) {
        var client = this.clients[id];
        if (client) {
            client.receiveEvent(eventName, args);
        }
    },
    register: function (id, client) {
        this.clients[id] = client;
    },
    getDOMObjectPosition: function (obj) {
        var info = {
            left: 0,
            top: 0,
            width: obj.width ? obj.width : obj.offsetWidth,
            height: obj.height ? obj.height : obj.offsetHeight
        };
        while (obj) {
            info.left += obj.offsetLeft;
            info.top += obj.offsetTop;
            obj = obj.offsetParent;
        }
        return info;
    },
    Client: function (elem) {
        this.handlers = {};
        this.id = ZeroClipboard.nextId++;
        this.movieId = 'ZeroClipboardMovie_' + this.id;
        ZeroClipboard.register(this.id, this);
        if (elem) this.glue(elem);
    }
};
ZeroClipboard.Client.prototype = {
    id: 0,
    ready: false,
    movie: null,
    clipText: '',
    handCursorEnabled: true,
    cssEffects: true,
    handlers: null,
    glue: function (elem) {
        this.domElement = ZeroClipboard.$(elem);
        var zIndex = 9999999999;
        if (this.domElement.style.zIndex) {
            zIndex = parseInt(this.domElement.style.zIndex) + 1;
        }
        var box = ZeroClipboard.getDOMObjectPosition(this.domElement);
        this.div = document.createElement('div');
        var style = this.div.style;
        style.position = 'absolute';
        style.left = '' + box.left + 'px';
        style.top = '' + box.top + 'px';
        style.width = '' + box.width + 'px';
        style.height = '' + box.height + 'px';
        style.zIndex = zIndex;
        var body = document.getElementsByTagName('body')[0];
        body.appendChild(this.div);
        this.div.innerHTML = this.getHTML(box.width, box.height);
    },
    getHTML: function (width, height) {
        var html = '';
        var flashvars = 'id=' + this.id + '&width=' + width + '&height=' + height;
        if (navigator.userAgent.match(/MSIE/)) {
            var protocol = location.href.match(/^https/i) ? 'https://' : 'http://';
            html += '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="' + protocol + 'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="' + width + '" height="' + height + '" id="' + this.movieId + '" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="' + ZeroClipboard.moviePath + '" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="' + flashvars + '"/><param name="wmode" value="transparent"/></object>';
        } else {
            html += '<embed id="' + this.movieId + '" src="' + ZeroClipboard.moviePath + '" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="' + width + '" height="' + height + '" name="' + this.movieId + '" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="' + flashvars + '" wmode="transparent" />';
        }
        return html;
    },
    hide: function () {
        if (this.div) {
            this.div.style.left = '-2000px';
        }
    },
    show: function () {
        this.reposition();
    },
    destroy: function () {
        if (this.domElement && this.div) {
            this.hide();
            this.div.innerHTML = '';
            var body = document.getElementsByTagName('body')[0];
            try {
                body.removeChild(this.div);
            } catch (e) {;
            }
            this.domElement = null;
            this.div = null;
        }
    },
    reposition: function (elem) {
        if (elem) {
            this.domElement = ZeroClipboard.$(elem);
            if (!this.domElement) this.hide();
        }
        if (this.domElement && this.div) {
            var box = ZeroClipboard.getDOMObjectPosition(this.domElement);
            var style = this.div.style;
            style.left = '' + box.left + 'px';
            style.top = '' + box.top + 'px';
        }
    },
    setText: function (newText) {
        this.clipText = newText;
        if (this.ready) this.movie.setText(newText);
    },
    addEventListener: function (eventName, func) {
        eventName = eventName.toString().toLowerCase().replace(/^on/, '');
        if (!this.handlers[eventName]) this.handlers[eventName] = [];
        this.handlers[eventName].push(func);
    },
    setHandCursor: function (enabled) {
        this.handCursorEnabled = enabled;
        if (this.ready) this.movie.setHandCursor(enabled);
    },
    setCSSEffects: function (enabled) {
        this.cssEffects = !! enabled;
    },
    receiveEvent: function (eventName, args) {
        eventName = eventName.toString().toLowerCase().replace(/^on/, '');
        switch (eventName) {
        case 'load':
            this.movie = document.getElementById(this.movieId);
            if (!this.movie) {
                var self = this;
                setTimeout(function () {
                    self.receiveEvent('load', null);
                }, 1);
                return;
            }
            if (!this.ready && navigator.userAgent.match(/Firefox/) && navigator.userAgent.match(/Windows/)) {
                var self = this;
                setTimeout(function () {
                    self.receiveEvent('load', null);
                }, 100);
                this.ready = true;
                return;
            }
            this.ready = true;
            this.movie.setText(this.clipText);
            this.movie.setHandCursor(this.handCursorEnabled);
            break;
        case 'mouseover':
            if (this.domElement && this.cssEffects) {
                this.domElement.addClass('hover');
                if (this.recoverActive) this.domElement.addClass('active');
            }
            break;
        case 'mouseout':
            if (this.domElement && this.cssEffects) {
                this.recoverActive = false;
                if (this.domElement.hasClass('active')) {
                    this.domElement.removeClass('active');
                    this.recoverActive = true;
                }
                this.domElement.removeClass('hover');
            }
            break;
        case 'mousedown':
            if (this.domElement && this.cssEffects) {
                this.domElement.addClass('active');
            }
            break;
        case 'mouseup':
            if (this.domElement && this.cssEffects) {
                this.domElement.removeClass('active');
                this.recoverActive = false;
            }
            break;
        }
        if (this.handlers[eventName]) {
            for (var idx = 0, len = this.handlers[eventName].length; idx < len; idx++) {
                var func = this.handlers[eventName][idx];
                if (typeof (func) == 'function') {
                    func(this, args);
                } else if ((typeof (func) == 'object') && (func.length == 2)) {
                    func[0][func[1]](this, args);
                } else if (typeof (func) == 'string') {
                    window[func](this, args);
                }
            }
        }
    }
};
SAPO.Maps.Utils = {};
SAPO.Maps.Utils.WaitIconClassName = 'Sapo_Panels_DIV_WAIT_ICON';
SAPO.Maps.Utils.displayWaitIcon = function (panel) {
    if (!panel) {
        return;
    }
    var div = document.createElement('div');
    div.className = SAPO.Maps.Utils.WaitIconClassName;
    var img = document.createElement('img');
    img.src = 'http://js.sapo.pt/Assets/Maps/Images/bigwheel_1.gif';
    img.style.visibility = 'hidden';
    div.style.position = 'relative';
    div.appendChild(img);
    panel.appendChild(div);
    if (OpenLayers.Util.getBrowserName() === 'msie') {
        div.style.top = Math.floor((panel.offsetHeight / 2) - (img.height / 2)) + "px";
        div.style.left = Math.floor((panel.offsetWidth / 2) - (img.width / 2)) + "px";
        img.style.visibility = 'visible';
    } else {
        img.onload = function () {
            div.style.top = Math.floor((panel.offsetHeight / 2) - (img.height / 2)) + "px";
            div.style.left = Math.floor((panel.offsetWidth / 2) - (img.width / 2)) + "px";
            img.style.visibility = 'visible';
        };
    }
};
SAPO.Maps.Utils.removeWaitIcon = function (panel) {
    var elems = panel.childNodes;
    for (var i = 0; i < elems.length; ++i) {
        if (elems[i].className == SAPO.Maps.Utils.WaitIconClassName) {
            panel.removeChild(elems[i]);
        }
    }
};
SAPO.Maps.Utils.MessageType = {
    NONE: null,
    OK: 'http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/Icons/ok.png',
    ERROR: 'http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/Icons/error.png',
    WARNING: 'http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/Icons/warning.gif',
    INFORMATION: 'http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/Icons/information.gif'
};
SAPO.Maps.Utils.displayMessageText = function (panel, msg, msgType) {
    if (!panel) {
        return;
    }
    var div = document.createElement('div');
    if (msgType != SAPO.Maps.Utils.MessageType.NONE) {
        var img = document.createElement('img');
        img.src = msgType;
        img.height = "27";
        img.width = "31";
        div.appendChild(img);
        div.innerHTML += "";
    }
    var msgContent = document.createElement('div');
    var dummy = document.createElement('div');
    msgContent.appendChild(document.createTextNode(msg));
    div.appendChild(msgContent);
    div.appendChild(dummy);
    div.className = 'utils_msg_smapi';
    msgContent.className = 'utils_msg_text_smapi';
    dummy.className = 'clear';
    panel.appendChild(div);
};
SAPO.Maps.Utils.displayMessageHTML = function (panel, msg1, html, msg2, msgType) {
    if (!panel) {
        return;
    }
    var div = document.createElement('div');
    if (msgType != SAPO.Maps.Utils.MessageType.NONE) {
        var img = document.createElement('img');
        img.src = msgType;
        img.height = "27";
        img.width = "31";
        div.appendChild(img);
    }
    var msgContent = document.createElement('div');
    var dummy = document.createElement('div');
    var span = document.createElement('span');
    span.appendChild(document.createTextNode(html));
    msgContent.appendChild(document.createTextNode(msg1));
    msgContent.appendChild(span);
    msgContent.appendChild(document.createTextNode(msg2));
    div.appendChild(msgContent);
    div.appendChild(dummy);
    div.className = 'utils_msg_smapi';
    msgContent.className = 'utils_msg_text_smapi';
    dummy.className = 'clear';
    panel.appendChild(div);
};
SAPO.Maps.Utils.checkQuery = function (query) {
    if (query.length === 0) {
        return false;
    }
    var arr = query.split(',');
    if (arr.length !== 2) {
        return false;
    }
    var lat, lon;
    try {
        lat = Number(arr[0]);
        lon = Number(arr[1]);
        if (isNaN(lat) || isNaN(lon)) {
            return false;
        }
    } catch (e) {
        return false;
    }
    return {
        Latitude: lat,
        Longitude: lon
    };
};
SAPO.Maps.Utils.copy2Clipboard = function (str) {
    if (OpenLayers.Util.getBrowserName() === 'msie') {
        var copier = 'copy2clipboard';
        var copierElement = document.getElementById(copier);
        if (!copierElement) {
            copierElement = document.createElement('input');
            copierElement.type = 'text';
            copierElement.id = copier;
            copierElement.style.visibility = 'hidden';
            document.body.appendChild(copierElement);
        }
        copierElement.value = str;
        var range = copierElement.createTextRange();
        if (range) {
            range.execCommand('Copy');
        }
    } else {
        var flashcopier = 'flashcopier';
        if (!document.getElementById(flashcopier)) {
            var divholder = document.createElement('div');
            divholder.id = flashcopier;
            document.body.appendChild(divholder);
        }
        document.getElementById(flashcopier).innerHTML = '';
        var divinfo = '<embed id="fla" src="http://js.sapo.pt/Assets/Maps/_clipboard.swf" FlashVars="clipboard=' + encodeURIComponent(str) + '" width="100" height="100" type="application/x-shockwave-flash"></embed>';
        document.getElementById(flashcopier).innerHTML = divinfo;
    }
};
SAPO.Maps.Utils.copy2ClipboardWhenClick = function (element, strFn, completeFn) {
    var clip = null;
    if (OpenLayers.Util.getBrowserName() === 'msie') {
        if (!element.attachEvent) {
            element = document.getElementById(element);
        }
        if (!element) {
            return;
        }
        OpenLayers.Event.observe(element, "click", function () {
            var copier = 'copy2clipboard';
            var copierElement = document.getElementById(copier);
            if (!copierElement) {
                copierElement = document.createElement('input');
                copierElement.type = 'text';
                copierElement.id = copier;
                copierElement.style.visibility = 'hidden';
                document.body.appendChild(copierElement);
            }
            copierElement.value = strFn();
            var range = copierElement.createTextRange();
            if (range) {
                range.execCommand('Copy');
            }
            completeFn();
        });
    } else {
        ZeroClipboard.setMoviePath("http://imgs.sapo.pt/fotos_gis/ZeroClipboard.swf");
        clip = new ZeroClipboard.Client();
        clip.setCSSEffects(true);
        clip.glue(element);
        clip.addEventListener('onMouseDown', function () {
            clip.setText(strFn());
        });
        clip.addEventListener('onComplete', function () {
            completeFn();
            clip.destroy();
        });
    }
    var retObj = {
        zeroClipboard: clip,
        destroy: function () {
            if (clip) {
                clip.destroy();
            }
        }
    };
    return retObj;
};
SAPO.Maps.Utils.checkUrl = function () {
    return window.location.href.indexOf('http://mapas.sapo.pt') != -1;
};
SAPO.Maps.Utils.checkIE6 = function () {
    return parseFloat(navigator.appVersion.split("MSIE")[1]) < 7;
};
SAPO.Maps.Utils.hasProperties = function (obj) {
    if (!obj) {
        return false;
    }
    for (var p in obj) {
        return true;
    }
    return false;
};
SAPO.Maps.Utils.addClassName = function (element, className) {
    var classeNames = element.className;
    var classesArr = classeNames.split(' ');
    if (!classesArr || classesArr.length === 0) {
        element.className = className;
        return;
    }
    for (var i = 0; i < classesArr.length; ++i) {
        if (classesArr[i] === className) {
            return;
        }
    }
    element.className += ' ' + className;
};
SAPO.Maps.Utils.removeClassName = function (element, className) {
    var classeNames = element.className;
    var classesArr = classeNames.split(' ');
    var classNames2Copy = '';
    for (var i = 0; i < classesArr.length; ++i) {
        if (classesArr[i] !== className) {
            classNames2Copy += ' ' + classesArr[i];
        }
    }
    element.className = classNames2Copy;
};
SAPO.Maps.Utils.FadeColor = 155;
SAPO.Maps.Utils.Fade = function (element) {
    var background = element.style.background;
    var b = SAPO.Maps.Utils.FadeColor;

    function f() {
        element.style.background = 'rgb(255,255,' + (b += 20) + ')';
        if (b < 255) {
            setTimeout(f, 20);
        } else {
            element.style.background = background;
        }
    }
    f();
};
SAPO.Maps.Utils.AdjustBoundsConsideringBorders = function (map, bounds, borders) {
    if (!borders) {
        borders = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        };
    }
    map.setBounds(bounds, false);
    var center = bounds.getCenterLonLat();
    var size = map.getSize();
    SAPO.Maps.Utils.CenterMapConsideringBorders(map, center, borders);
    var bottom_left = new OpenLayers.Pixel(borders.left, size.h - borders.bottom);
    var top_right = new OpenLayers.Pixel(size.w - borders.right, borders.top);
    var bounds_sw = map.getContainerPixelFromLonLat(new OpenLayers.LonLat(bounds.left, bounds.bottom));
    var bounds_ne = map.getContainerPixelFromLonLat(new OpenLayers.LonLat(bounds.right, bounds.top));
    while (bounds_sw.x < bottom_left.x || bounds_ne.y < top_right.y || bounds_sw.y > bottom_left.y || bounds_ne.x > top_right.x) {
        map.zoomOut();
        SAPO.Maps.Utils.CenterMapConsideringBorders(map, center, borders);
        bounds_sw = map.getContainerPixelFromLonLat(new OpenLayers.LonLat(bounds.left, bounds.bottom));
        bounds_ne = map.getContainerPixelFromLonLat(new OpenLayers.LonLat(bounds.right, bounds.top));
    }
};
SAPO.Maps.Utils.CenterMapConsideringBorders = function (map, center, borders, zoomLevel) {
    if (!borders) {
        borders = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        };
    }
    if (zoomLevel) {
        map.zoomTo(zoomLevel);
    }
    var center_px = map.getContainerPixelFromLonLat(center);
    var size = map.getSize();
    var x_min = borders.left;
    var y_min = borders.top;
    var x_max = size.w - borders.right;
    var y_max = size.h - borders.bottom;
    var center_x = x_min + Math.floor((x_max - x_min) / 2);
    var center_y = y_min + Math.floor((y_max - y_min) / 2);
    var dx = center_px.x - center_x;
    var dy = center_px.y - center_y;
    map.pan(dx, dy, {
        animate: false
    });
};
SAPO.Maps.Utils.round = function (num, dec) {
    var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
};
SAPO.Maps.Request = OpenLayers.Class({
    requestTypes: ['XMLHttpRequest', 'Syndication'],
    initialize: function () {},
    request: function (url, objs) {},
    cancel: function (id) {},
    getRequester: function () {
        for (var i = 0; i < this.requestTypes.length; i++) {
            var requestClass = SAPO.Maps.Request[this.requestTypes[i]];
            if (requestClass && requestClass.prototype.supported()) {
                return new requestClass();
            }
        }
        return null;
    },
    supported: function () {
        return true;
    }
});
SAPO.Maps.Request.Syndication = OpenLayers.Class(SAPO.Maps.Request, {
    syndication: null,
    syndicationObjsHelper: null,
    initialize: function () {
        this.syndication = new SAPO.Communication.Syndication();
        this.syndicationObjsHelper = {};
    },
    request: function (url, objs) {
        var context = {
            canceled: false,
            objs: objs,
            id: null
        };
        var timeoutFunc = OpenLayers.Function.bind(this.timeout, this, context);
        var completeFunc = OpenLayers.Function.bind(this.complete, this);
        var id = this.syndication.push(url, {
            timeout: objs.timeout,
            onTimeout: timeoutFunc,
            onComplete: completeFunc,
            optOnComplete: context
        });
        context.id = id;
        this.syndicationObjsHelper[id] = context;
        this.syndication.run(id);
        return id;
    },
    cancel: function (id) {
        if (!id) {
            throw "Invalid Parameters. Id must be a value.";
        }
        if (this.syndicationObjsHelper[id]) {
            this.syndicationObjsHelper.canceled = true;
            this.removeSyndicationInfo(id);
            return true;
        }
        return false;
    },
    supported: function () {
        return true;
    },
    timeout: function (context) {
        if (context.canceled === true) {
            return;
        }
        context.canceled = true;
        var info = this.syndicationObjsHelper[context.id];
        if (info.objs.onTimeout) {
            info.objs.onTimeout();
        }
        this.removeSyndicationInfo(context.id);
    },
    complete: function (obj, context) {
        if (context.canceled === true) {
            return;
        }
        var info = this.syndicationObjsHelper[context.id];
        if (info.objs.onComplete) {
            info.objs.onComplete(obj, info.objs.optOnComplete);
        }
        this.removeSyndicationInfo(context.id);
    },
    removeSyndicationInfo: function (id) {
        this.syndicationObjsHelper[id].canceled = null;
        this.syndicationObjsHelper[id].objs.onTimeout = null;
        this.syndicationObjsHelper[id].objs.onComplete = null;
        this.syndicationObjsHelper[id].objs.timeout = null;
        this.syndicationObjsHelper[id].objs = null;
        this.syndicationObjsHelper[id].id = null;
        delete this.syndicationObjsHelper[id];
    }
});
SAPO.Maps.Request.XMLHttpRequest = OpenLayers.Class(SAPO.Maps.Request, {
    requestObjs: null,
    supportedHost: 'http://mapas.sapo.pt/',
    initialize: function () {
        SAPO.Maps.Request.prototype.initialize.apply(this, arguments);
        this.requestObjs = {};
    },
    request: function (url, objs) {
        var mapsUrl = this.modifyURL(url);
        var id = false;
        do {
            id = Math.round(1000000 * Math.random());
        } while (this.requestObjs[id]);
        this.requestObjs[id] = {
            xhr: this.createXHR(),
            url: mapsUrl,
            objs: objs,
            inProgress: false,
            timeoutInterval: null
        };
        var func = OpenLayers.Function.bind(this.complete, this, id);
        this.requestObjs[id].xhr.onreadystatechange = func;
        this.requestObjs[id].inProgress = true;
        this.requestObjs[id].xhr.open("GET", this.requestObjs[id].url, true);
        this.requestObjs[id].xhr.send(null);
        if (this.requestObjs[id].objs.timeout) {
            var timeoutFunc = OpenLayers.Function.bind(this.timeout, this, id);
            this.requestObjs[id].timeoutInterval = setTimeout(timeoutFunc, this.requestObjs[id].objs.timeout * 1000);
        }
        return id;
    },
    cancel: function (id) {
        if (!id) {
            throw "Invalid Parameters. Id must be a value.";
        }
        if (this.requestObjs[id]) {
            if (this.requestObjs[id].inProgress) {
                this.requestObjs[id].inProgress = false;
                this.requestObjs[id].xhr.abort();
                this.deleteXHR(id);
                return true;
            }
        }
        return false;
    },
    getRequester: function () {
        for (var i = 0; i < this.requestTypes.length; i++) {
            var requestClass = SAPO.Maps.Request[this.requestTypes[i]];
            if (requestClass && requestClass.prototype.supported()) {
                return new requestClass();
            }
        }
        return null;
    },
    supported: function () {
        if (window.location.href.indexOf(this.supportedHost) === 0) {
            return true;
        }
        return false;
    },
    complete: function (id) {
        if (!this.requestObjs[id]) {
            return;
        }
        if (this.requestObjs[id].inProgress === false) {
            return;
        }
        var xhr = this.requestObjs[id].xhr;
        if (xhr.readyState != 4) {
            return;
        }
        if (this.requestObjs[id].timeoutInterval) {
            clearInterval(this.requestObjs[id].timeoutInterval);
        }
        if (xhr.status != 200) {
            if (this.requestObjs[id].objs.onError) {
                this.requestObjs[id].objs.onError(xhr.responseText);
            }
        } else {
            if (this.requestObjs[id].objs.onComplete) {
                var response = eval('(' + xhr.responseText + ')');
                this.requestObjs[id].objs.onComplete(response, this.requestObjs[id].objs.optOnComplete);
            }
        }
        this.requestObjs[id].inProgress = false;
        this.deleteXHR(id);
    },
    timeout: function (id) {
        if (!this.requestObjs[id]) {
            return;
        }
        var timeoutListener = this.requestObjs[id].objs.onTimeout;
        this.cancel(id);
        if (timeoutListener) {
            timeoutListener();
        }
    },
    createXHR: function () {
        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        }
        return xhr;
    },
    deleteXHR: function (id) {
        this.requestObjs[id].url = null;
        this.requestObjs[id].objs = null;
        this.requestObjs[id].inProgress = null;
        this.requestObjs[id].xhr = null;
        this.requestObjs[id] = null;
        delete this.requestObjs[id];
    },
    modifyURL: function (url) {
        if (url.indexOf('http://') == -1) {
            return url;
        }
        return this.supportedHost + url.substring(7);
    }
});
SAPO.Maps.Request.Status = {
    STOP: 0,
    OK: 1,
    ERROR: 2,
    REQUESTING: 3,
    CANCELED: 4
};
SAPO.Maps.Search = OpenLayers.Class({
    markerImgs: 'http://imgs.sapo.pt/fotos_gis/mapas_api/v1.0/Markers/m',
    markerImgsExtension: '.png',
    geocoder: null,
    listeners: null,
    map: null,
    panel: null,
    markers: null,
    pois: null,
    resultsPerPage: 10,
    allowPaging: false,
    searchForPOIS: false,
    openDetailsWhenClick: true,
    numberOfPagesShown: 5,
    currentPage: 1,
    totalResults: 0,
    query: null,
    request: null,
    selectedIdx: null,
    status: null,
    pageChanged: false,
    div: null,
    pagingDiv: null,
    displaySingleResult: true,
    borders: null,
    whatsHereSearch: false,
    initialize: function (map, panel, options) {
        OpenLayers.Util.extend(this, options);
        this.geocoder = new SAPO.Maps.Geocoder();
        this.listeners = {};
        this.status = SAPO.Maps.Request.Status.STOP;
        if (map) {
            this.map = map;
            this.markers = new SAPO.Maps.Markers("searchResults");
            this.map.addMarkers(this.markers);
        }
        if (panel) {
            this.panel = typeof (panel) == 'string' ? document.getElementById(panel) : panel;
        }
        this.onComplete = OpenLayers.Function.bind(this.complete, this);
        this.onTimeout = OpenLayers.Function.bind(this.timeout, this);
    },
    search: function (query, options) {
        if (this.status == SAPO.Maps.Request.Status.REQUESTING) {
            throw 'cannot query the server while the last request is waiting';
        }
        this.prepareRequest();
        OpenLayers.Util.extend(this, options);
        this.resultsPerPage = this.resultsPerPage > 10 ? 10 : this.resultsPerPage;
        this.displaySingleResult = options ? (options.displaySingleResult === false ? false : true) : true;
        this.query = query;
        this.getResults();
    },
    searchWhatsHere: function (lonlat, zoom) {
        if (this.status == SAPO.Maps.Request.Status.REQUESTING) {
            throw 'cannot query the server while the last request is waiting';
        }
        this.allowPaging = false;
        this.prepareRequest();
        this.whatsHereSearch = true;
        this.getResults(lonlat, zoom);
    },
    cancel: function () {
        if (this.status === SAPO.Maps.Request.Status.REQUESTING || this.request) {
            this.request.cancel = true;
            this.status = SAPO.Maps.Request.Status.CANCELED;
            this.request = null;
            try {
                this.notifyListeners('canceled', [this]);
            } catch (e) {
                try {
                    this.notifyListeners('error', [this, e]);
                } catch (e1) {}
            }
        }
    },
    clear: function (silent) {
        if (this.status == SAPO.Maps.Request.Status.REQUESTING) {
            throw 'cannot clear the info until the request is pending';
        }
        if (this.selectedIdx !== null) {
            this.unselectResult(this.selectedIdx);
        }
        this.cleanMarkers();
        this.cleanPanel();
        if (!silent) {
            try {
                this.notifyListeners('cleanResults', [this]);
            } catch (e) {
                try {
                    this.notifyListeners('error', [this, e]);
                } catch (e1) {}
            }
        }
    },
    openDetails: function (resultIdx) {
        if (this.markers) {
            var markers = this.markers.getMarkers();
            var idx = markers.length - resultIdx - 1;
            markers[idx].openPopup(markers[idx].html, this.borders ? {
                borders: this.borders
            } : null);
        }
        if (this.panel) {
            var node = this.div.childNodes[resultIdx];
            node.className += ' search_selected_smapi';
        }
        this.selectedIdx = resultIdx;
    },
    selectResult: function (resultIdx, onPanel) {
        if (this.selectedIdx !== null) {
            this.unselectResult(this.selectedIdx);
        }
        if (resultIdx >= this.pois.length) {
            return;
        }
        if (this.openDetailsWhenClick) {
            this.openDetails(resultIdx);
        }
        this.selectedIdx = resultIdx;
        var evtType = onPanel ? 'selectedOnPanel' : 'selectedOnMap';
        try {
            this.notifyListeners(evtType, [this, this.pois[resultIdx], resultIdx, this.currentPage]);
            this.notifyListeners('selected', [this, this.pois[resultIdx], resultIdx, this.currentPage]);
        } catch (e) {
            try {
                this.notifyListeners('error', [this, e]);
            } catch (e1) {}
        }
    },
    unselectResult: function (resultIdx) {
        if (this.selectedIdx === null || this.selectedIdx != resultIdx) {
            return;
        }
        this.selectedIdx = null;
        if (this.markers) {
            var markers = this.markers.getMarkers();
            var idx = markers.length - resultIdx - 1;
            markers[idx].closePopup();
        }
        if (this.panel) {
            var node = this.div.childNodes[resultIdx];
            node.className = 'search_item_smapi';
        }
        try {
            this.notifyListeners('unselected', [this, this.pois[resultIdx], resultIdx, this.currentPage]);
        } catch (e) {
            try {
                this.notifyListeners('error', [this, e]);
            } catch (e4) {}
        }
    },
    getStatus: function () {
        return this.status;
    },
    getPOIS: function () {
        return this.pois;
    },
    getCurrentPage: function () {
        return this.currentPage;
    },
    getSelectedIndex: function () {
        return this.selectedIdx;
    },
    goToPage: function (page) {
        if (this.allowPaging && this.status === SAPO.Maps.Request.Status.REQUESTING) {
            throw 'Exception occurred at goToPage method: Pending request. Cancel the request first.';
        }
        if (page === this.getCurrentPage() || page <= 0) {
            return;
        }
        this.pageChanged = true;
        var numPages = Math.ceil(this.totalResults / this.resultsPerPage);
        this.currentPage = page > numPages ? numPages : page;
        this.clear(true);
        this.getResults();
    },
    getTotalResults: function () {
        if (this.status == SAPO.Maps.Request.Status.REQUESTING || this.status == SAPO.Maps.Request.Status.STOP || this.status == SAPO.Maps.Request.Status.ERROR || this.status == SAPO.Maps.Request.Status.CANCELED) {
            return 0;
        }
        return this.totalResults;
    },
    getMarker: function (idx) {
        if (this.status == SAPO.Maps.Request.Status.REQUESTING || this.status == SAPO.Maps.Request.Status.STOP || this.status == SAPO.Maps.Request.Status.ERROR || this.status == SAPO.Maps.Request.Status.CANCELED) {
            return null;
        }
        if (this.markers) {
            var markers = this.markers.getMarkers();
            if (idx >= markers.length) {
                return null;
            }
            return markers[(markers.length - 1) - idx];
        }
        return null;
    },
    getMarkers: function () {
        if (this.status == SAPO.Maps.Request.Status.REQUESTING || this.status == SAPO.Maps.Request.Status.STOP || this.status == SAPO.Maps.Request.Status.ERROR || this.status == SAPO.Maps.Request.Status.CANCELED) {
            return null;
        }
        if (this.markers) {
            return this.markers.getMarkers();
        }
        return null;
    },
    getResults: function (lonlat, zoom) {
        var isCoords = SAPO.Maps.Utils.checkQuery(this.query);
        if (isCoords) {
            this.pois = [isCoords];
            this.status = SAPO.Maps.Request.Status.OK;
            if (this.displaySingleResult) {
                this.displayResults(this.pois);
            }
            this.totalResults = this.pois.length;
            try {
                this.notifyListeners('completed', [this, this.pois, this.totalResults]);
            } catch (e3) {
                try {
                    this.notifyListeners('error', [this, e3]);
                } catch (e4) {}
            }
            return;
        }
        if (this.checkIfTheQueryMatchesWithMadeiraOrAzores_hack()) {
            return;
        }
        if (this.panel) {
            SAPO.Maps.Utils.displayWaitIcon(this.panel);
        }
        this.request = {
            cancel: false
        };
        if (this.whatsHereSearch) {
            this.geocoder.findWhatsHere(lonlat, zoom, this.onComplete, this.onTimeout, {
                context: this.request
            });
        } else {
            this.geocoder.getLocations(this.query, this.onComplete, this.onTimeout, {
                resultsPerPage: this.resultsPerPage,
                pageNumber: this.currentPage,
                bbox: this.bbox,
                context: this.request,
                searchForPOIS: this.searchForPOIS
            });
        }
    },
    checkIfTheQueryMatchesWithMadeiraOrAzores_hack: function () {
        if (this.query.toLowerCase().match(/^a\u00E7ores/) || this.query.toLowerCase().match(/^azores/)) {
            this.pois = [{
                Name: 'Açores',
                Latitude: 38.711232699162856,
                Longitude: -27.19116201562631,
                CategoryId: '213',
                Category: 'Localidades',
                zoom: 7,
                text: 'Arquipélago dos Açores',
                martelada: true
            }];
            this.status = SAPO.Maps.Request.Status.OK;
            this.displayResults(this.pois);
            this.totalResults = this.pois.length;
            try {
                this.notifyListeners('completed', [this, this.pois, this.totalResults]);
            } catch (e3) {
                try {
                    this.notifyListeners('error', [this, e3]);
                } catch (e4) {}
            }
            return true;
        }
        if (this.query.toLowerCase().match(/^madeira/)) {
            this.pois = [{
                Name: 'Madeira',
                Latitude: 32.788429,
                Longitude: -16.961517,
                CategoryId: '213',
                Category: 'Localidades',
                zoom: 10,
                text: 'Arquipélago da Madeira',
                martelada: true
            }];
            this.status = SAPO.Maps.Request.Status.OK;
            this.displayResults(this.pois);
            this.totalResults = this.pois.length;
            try {
                this.notifyListeners('completed', [this, this.pois, this.totalResults]);
            } catch (e5) {
                try {
                    this.notifyListeners('error', [this, e3]);
                } catch (e6) {}
            }
            return true;
        }
        return false;
    },
    cleanPanel: function () {
        if (this.panel && this.div) {
            this.panel.removeChild(this.div);
            if (this.pagingDiv) {
                this.panel.removeChild(this.pagingDiv);
            }
            this.div = null;
            this.pagingDiv = null;
        }
    },
    cleanMarkers: function () {
        if (this.map && this.markers) {
            this.markers.removeMarkers();
        }
    },
    prepareRequest: function () {
        this.state = SAPO.Maps.Request.Status.REQUESTING;
        this.clear(true);
        this.pois = null;
        this.selectedIdx = null;
        this.currentPage = 1;
        this.totalResults = 0;
        this.query = '';
        this.pageChanged = false;
        this.whatsHereSearch = false;
    },
    complete: function (pois, context, totalresults) {
        if (this.panel) {
            SAPO.Maps.Utils.removeWaitIcon(this.panel);
        }
        try {
            if (context.cancel) {
                return;
            }
            this.status = SAPO.Maps.Request.Status.OK;
            this.totalResults = totalresults;
            this.pois = pois;
            if ((this.totalResults > 1 || this.totalResults === 1 && this.displaySingleResult) && (this.panel || this.map)) {
                this.displayResults(pois, totalresults);
            } else {
                if (pois.length === 0 && this.panel) {
                    var elem = document.createElement('div');
                    elem.className = 'search_results_smapi';
                    if (this.whatsHereSearch) {
                        SAPO.Maps.Utils.displayMessageHTML(elem, "Lamentamos mas não encontramos nada aqui. Tente escolher outro ponto.", "", "", SAPO.Maps.Utils.MessageType.WARNING);
                    } else {
                        SAPO.Maps.Utils.displayMessageHTML(elem, "A sua pesquisa por: ", this.query, " não devolveu qualquer resultado", SAPO.Maps.Utils.MessageType.WARNING);
                    }
                    this.panel.appendChild(elem);
                    this.div = elem;
                }
            }
            var evtType = this.pageChanged === false ? 'completed' : 'pageChanged';
            var params = this.pageChanged === false ? [this, this.pois, this.totalResults] : [this, this.currentPage, this.pois];
            this.pageChanged = false;
            try {
                this.notifyListeners(evtType, params);
            } catch (e3) {
                try {
                    this.notifyListeners('error', [this, e3]);
                } catch (e4) {}
            }
        } catch (e1) {
            try {
                this.notifyListeners('error', [this, e1]);
            } catch (e2) {}
        }
    },
    timeout: function (context) {
        if (this.panel) {
            SAPO.Maps.Utils.removeWaitIcon(this.panel);
        }
        if (context.cancel) {
            return;
        }
        this.status = SAPO.Maps.Request.Status.ERROR;
        if (this.panel) {
            var elem = document.createElement('div');
            elem.className = 'search_results_smapi';
            SAPO.Maps.Utils.displayMessageText(elem, "Lamentamos mas de momento não é possível apresentar os resultados da pesquisa.", SAPO.Maps.Utils.MessageType.WARNING);
            this.panel.appendChild(elem);
        }
        try {
            this.notifyListeners('timeout', [this]);
        } catch (e5) {
            try {
                this.notifyListeners('error', [this, e5]);
            } catch (e6) {}
        }
    },
    displayResults: function (pois) {
        if (!this.panel && !this.map) {
            return;
        }
        var div = null;
        var poi = null;
        var marker = null;
        var name = null;
        var category = null;
        var local = null;
        var length = pois.length;
        var style = null;
        var imgSrc = null;
        var holder = document.createElement('div');
        var holderResult = null;
        var imgContent = null;
        var img = null;
        var detailsContent = null;
        var titleContent = null;
        var poiLocation = null;
        var strongContent = null;
        var dummy = null;
        var locality = null;
        for (var i = length - 1; i >= 0; --i) {
            poi = pois[i];
            imgSrc = this.markerImgs + (i + 1) + this.markerImgsExtension;
            if (this.map) {
                style = {
                    markerImage: imgSrc
                };
                marker = new SAPO.Maps.Marker(new OpenLayers.LonLat(Number(poi.Longitude), Number(poi.Latitude)), null, style);
                marker.html = this.getPopupHTML(poi);
                this.markers.addMarker(marker);
                marker.registerEvent('click', {
                    search: this,
                    index: i
                }, function (marker) {
                    this.search.selectResult(this.index, false);
                });
                marker.registerEvent('popupclosed', {
                    search: this,
                    index: i
                }, function (marker) {
                    this.search.unselectResult(this.index);
                });
            }
            if (this.panel) {
                holderResult = this.getPanelHTML(poi, i + 1, this.map);
                holder.insertBefore(holderResult, holder.firstChild);
                var _this = this;
                holderResult.idx = i;
                holderResult.onclick = function () {
                    _this.selectResult(this.idx, true);
                };
            }
        }
        if (this.panel) {
            holder.className = 'search_results_smapi';
            this.panel.appendChild(holder);
            this.div = holder;
        }
        if (this.map && this.markers && !this.whatsHereSearch) {
            var bounds = this.markers.getBounds();
            if (bounds) {
                var adjustedBounds = new OpenLayers.Bounds(bounds.left - 0.02199, bounds.bottom - 0.02199, bounds.right + 0.02199, bounds.top + 0.02199);
                SAPO.Maps.Utils.AdjustBoundsConsideringBorders(this.map, adjustedBounds, this.borders);
            }
            if (pois.length === 1 && pois[0].CategoryId !== '213') {
                if (pois[0].CategoryId === '214') {
                    SAPO.Maps.Utils.CenterMapConsideringBorders(this.map, new OpenLayers.LonLat(pois[0].Longitude, pois[0].Latitude), this.borders, 17);
                } else {
                    SAPO.Maps.Utils.CenterMapConsideringBorders(this.map, new OpenLayers.LonLat(pois[0].Longitude, pois[0].Latitude), this.borders, 18);
                }
            }
            if (pois.length === 1 && pois[0].zoom) {
                SAPO.Maps.Utils.CenterMapConsideringBorders(this.map, new OpenLayers.LonLat(pois[0].Longitude, pois[0].Latitude), this.borders, pois[0].zoom);
            }
        }
        if (length == 1 && this.openDetailsWhenClick) {
            this.selectResult(0, true);
        }
        if (this.allowPaging && this.totalResults > this.resultsPerPage) {
            this.pagingDiv = this.drawPaging();
            this.panel.appendChild(this.pagingDiv);
        }
    },
    drawPaging: function () {
        var pagingElement = document.createElement('div');
        var resultsInfo = document.createElement('div');
        var pages = document.createElement('div');
        pagingElement.className = 'smaps_api_search_paging';
        resultsInfo.className = 'smaps_api_search_paging_resultsInfo';
        pages.className = 'smaps_api_search_paging_pages';
        var numPages = Math.ceil(this.totalResults / this.resultsPerPage);
        var startPage = this.currentPage - Math.floor(this.numberOfPagesShown / 2);
        var endPage = this.currentPage + Math.floor(this.numberOfPagesShown / 2);
        if (endPage > numPages) {
            endPage = numPages;
        }
        if (startPage < 1) {
            startPage = 1;
        }
        if ((endPage - startPage + 1) < this.numberOfPagesShown && numPages >= this.numberOfPagesShown) {
            if (startPage <= Math.floor(this.numberOfPagesShown / 2)) {
                endPage += this.numberOfPagesShown - endPage;
            } else if (endPage >= numPages - Math.floor(this.numberOfPagesShown / 2)) {
                startPage -= this.numberOfPagesShown - (endPage - startPage + 1);
            }
        }
        var pageNumber = false;
        var _this = this;
        if (this.currentPage !== 1) {
            var preview = document.createElement('a');
            preview.className = 'previous';
            preview.onclick = function () {
                _this.goToPage(_this.currentPage - 1);
                return false;
            };
            pages.appendChild(preview);
        }
        for (var i = startPage; i <= endPage; ++i) {
            pageNumber = document.createElement('a');
            pageNumber.innerHTML = i;
            pageNumber.page = i;
            pageNumber.onclick = function () {
                _this.goToPage(this.page);
                return false;
            };
            if (i === this.currentPage) {
                pageNumber.className = 'smaps_api_search_paging_pageSelected';
            }
            pages.appendChild(pageNumber);
        }
        if (this.currentPage !== numPages) {
            var next = document.createElement('a');
            next.className = 'next';
            next.onclick = function () {
                _this.goToPage(_this.currentPage + 1);
                return false;
            };
            pages.appendChild(next);
        }
        resultsInfo.appendChild(document.createTextNode(this.totalResults + ' resultados'));
        pagingElement.appendChild(resultsInfo);
        pagingElement.appendChild(pages);
        return pagingElement;
    },
    getPanelHTML: function (poi, number, showImg) {
        var itemHolder = document.createElement('div');
        var markerHolder = document.createElement('div');
        var marker = document.createElement('img');
        var detailsHolder = document.createElement('div');
        var dummy = document.createElement('div');
        itemHolder.className = 'search_item_smapi';
        markerHolder.className = 'search_item_marker';
        detailsHolder.className = 'search_detail_smapi';
        dummy.className = 'clear';
        if (showImg) {
            marker.src = this.markerImgs + number + this.markerImgsExtension;
            markerHolder.appendChild(marker);
            itemHolder.appendChild(markerHolder);
            if (SAPO.Maps.Utils.checkIE6()) {
                markerHolder.className += ' search_item_marker_ie6';
                marker.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',src='" + this.markerImgs + number + this.markerImgsExtension + "')";
            }
        }
        itemHolder.appendChild(detailsHolder);
        itemHolder.appendChild(dummy);
        if (poi.Name) {
            if (poi.martelada) {
                detailsHolder.innerHTML = "<span class='search_title_smapi'>" + poi.Name + "</span>" + "<br/>" + "<span>" + poi.text + "</span>";
            } else {
                switch (poi.CategoryId) {
                case '213':
                    this.getLocalityPanelHTML(poi, detailsHolder, "local");
                    break;
                case '214':
                    this.getLocalityPanelHTML(poi, detailsHolder, "street");
                    break;
                default:
                    this.getCommonPanelHTML(poi, detailsHolder);
                    break;
                }
            }
        } else {
            this.getCoordsPanelHTML(poi, detailsHolder);
        }
        return itemHolder;
    },
    getLocalityPanelHTML: function (poi, holder, poiType) {
        var name = document.createElement('span');
        name.className = 'search_title_smapi';
        name.appendChild(document.createTextNode(poi.Name));
        var address = document.createElement('span');
        var municipality = document.createElement('strong');
        var district = document.createElement('strong');
        var type = document.createElement("span");
        if (poi.Municipality && poi.Municipality.length > 0) {
            address.appendChild(document.createTextNode('Concelho de '));
            municipality.appendChild(document.createTextNode(poi.Municipality));
            address.appendChild(municipality);
        }
        if (poi.District && poi.District.length > 0) {
            districtText = ', distrito de ';
            if (!poi.Municipality || poi.Municipality.length === 0) {
                districtText = 'Distrito de ';
            }
            district.appendChild(document.createTextNode(poi.District));
            address.appendChild(document.createTextNode(districtText));
            address.appendChild(district);
        }
        type.innerHTML = poiType === "local" ? "(Localidades)" : "(Ruas)";
        holder.appendChild(name);
        holder.appendChild(document.createElement('br'));
        holder.appendChild(type);
        holder.appendChild(document.createElement('br'));
        holder.appendChild(address);
    },
    getCommonPanelHTML: function (poi, holder) {
        var name = document.createElement('span');
        name.className = 'search_title_smapi';
        name.appendChild(document.createTextNode(poi.Name));
        var type = document.createElement("span");
        var address = document.createElement('span');
        if (poi.Street && poi.Street.length > 0) {
            address.appendChild(document.createTextNode(poi.Street));
            address.innerHTML += ', ';
        }
        if (poi.ZipCode && poi.ZipCode.length > 0) {
            var zc = poi.ZipCode;
            if (poi.ZipCode.length > 4) {
                zc = (poi.ZipCode.substring(0, 4) + "-" + poi.ZipCode.substring(4));
            }
            address.appendChild(document.createTextNode(zc));
        }
        if (poi.Locality && poi.Locality.length > 0) {
            address.appendChild(document.createTextNode(', ' + poi.Locality));
        } else {
            if (poi.Parish && poi.Parish.length > 0) {
                address.appendChild(document.createTextNode(', ' + poi.Parish));
            }
        }
        if (poi.Municipality && poi.Municipality.length > 0) {
            if (poi.Locality !== poi.Municipality && poi.Parish !== poi.Municipality) {
                address.appendChild(document.createTextNode(', ' + poi.Municipality));
            }
        }
        if (poi.District && poi.District.length > 0 && poi.Municipality !== poi.District) {
            address.appendChild(document.createTextNode(', ' + poi.District));
        }
        var contacts = document.createElement('span');
        if (poi.Phone && poi.Phone.length > 0) {
            contacts.appendChild(document.createTextNode(poi.Phone));
            contacts.appendChild(document.createTextNode(' '));
            contacts.appendChild(document.createElement('br'));
        }
        if (poi.URL && poi.URL.length > 0) {
            var site = document.createElement('a');
            site.className = 'search_site_link';
            site.href = poi.URL;
            site.target = 'blank';
            site.appendChild(document.createTextNode('Site'));
            contacts.appendChild(site);
        }
        type.innerHTML = "(" + poi.Category + ")";
        holder.appendChild(name);
        holder.appendChild(document.createElement('br'));
        holder.appendChild(type);
        holder.appendChild(document.createElement('br'));
        holder.appendChild(address);
        holder.appendChild(document.createElement('br'));
        holder.appendChild(contacts);
    },
    getCoordsPanelHTML: function (poi, holder) {
        var name = document.createElement('span');
        name.className = 'search_title_smapi';
        name.innerHTML = 'Coordenadas';
        var coords = document.createElement('span');
        coords.appendChild(document.createTextNode(poi.Latitude));
        coords.appendChild(document.createTextNode(', '));
        coords.appendChild(document.createTextNode(poi.Longitude));
        holder.appendChild(name);
        holder.appendChild(document.createElement('br'));
        holder.appendChild(coords);
    },
    getPopupHTML: function (poi) {
        var holder = document.createElement('div');
        var titleContent = document.createElement('div');
        var title = document.createElement('p');
        var details = document.createElement('div');
        holder.className = 'content_smapi';
        titleContent.className = 'search_pop_header_smapi';
        details.className = 'search_pop_content_smapi';
        titleContent.appendChild(title);
        holder.appendChild(titleContent);
        holder.appendChild(details);
        if (poi.Name) {
            title.appendChild(document.createTextNode(poi.Name));
            switch (poi.CategoryId) {
            case '213':
                this.getLocalityPopupHTML(poi, details);
                break;
            case '214':
                this.getStreetPopupHTML(poi, titleContent, details);
                break;
            default:
                this.getCommonPopupHTML(poi, titleContent, details);
                break;
            }
        } else {
            var coordsStr = poi.Latitude + ', ' + poi.Longitude;
            title.appendChild(document.createTextNode("Coordenadas"));
            details.appendChild(document.createTextNode(coordsStr));
        }
        if (OpenLayers.Util.getRenderedDimensions(holder.innerHTML).w > 400) {
            holder.style.width = '400px';
        }
        return holder;
    },
    getLocalityPopupHTML: function (poi, holder) {
        if (poi.Parish && poi.Parish.length > 0) {
            var parishElement = document.createElement('span');
            parishElement.className = 'search_destak_smaps';
            parishElement.innerHTML = 'Freguesia: ';
            holder.appendChild(parishElement);
            holder.appendChild(document.createTextNode(poi.Parish));
            holder.appendChild(document.createElement('br'));
        }
        if (poi.Municipality && poi.Municipality.length > 0) {
            var municipalityElement = document.createElement('span');
            municipalityElement.className = 'search_destak_smaps';
            municipalityElement.innerHTML = 'Concelho: ';
            holder.appendChild(municipalityElement);
            holder.appendChild(document.createTextNode(poi.Municipality));
            holder.appendChild(document.createElement('br'));
        }
        if (poi.District && poi.District.length > 0) {
            var districtElement = document.createElement('span');
            districtElement.className = 'search_destak_smaps';
            districtElement.innerHTML = 'Distrito: ';
            holder.appendChild(districtElement);
            holder.appendChild(document.createTextNode(poi.District));
            holder.appendChild(document.createElement('br'));
        }
    },
    getStreetPopupHTML: function (poi, titleholder, detailsholder) {
        if (poi.Category && poi.Category.length > 0) {
            var h2 = document.createElement('h2');
            var categoryStr = '(' + poi.Category + ')';
            h2.appendChild(document.createTextNode(categoryStr));
            titleholder.appendChild(h2);
        }
        if (poi.Parish && poi.Parish.length > 0) {
            var parishElement = document.createElement('span');
            parishElement.className = 'search_destak_smaps';
            parishElement.innerHTML = 'Freguesia: ';
            detailsholder.appendChild(parishElement);
            detailsholder.appendChild(document.createTextNode(poi.Parish));
            detailsholder.appendChild(document.createElement('br'));
        }
        if (poi.Municipality && poi.Municipality.length > 0) {
            var municipalityElement = document.createElement('span');
            municipalityElement.className = 'search_destak_smaps';
            municipalityElement.innerHTML = 'Concelho: ';
            detailsholder.appendChild(municipalityElement);
            detailsholder.appendChild(document.createTextNode(poi.Municipality));
            detailsholder.appendChild(document.createElement('br'));
        }
        if (poi.District && poi.District.length > 0) {
            var districtElement = document.createElement('span');
            districtElement.className = 'search_destak_smaps';
            districtElement.innerHTML = 'Distrito: ';
            detailsholder.appendChild(districtElement);
            detailsholder.appendChild(document.createTextNode(poi.District));
            detailsholder.appendChild(document.createElement('br'));
        }
        if (poi.ZipCode && poi.ZipCode.length > 0) {
            var zc = poi.ZipCode;
            if (poi.ZipCode.length > 4) {
                zc = (poi.ZipCode.substring(0, 4) + "-" + poi.ZipCode.substring(4));
            }
            var postalCodeElement = document.createElement('span');
            postalCodeElement.className = 'search_destak_smaps';
            postalCodeElement.innerHTML = 'Cód. Postal: ';
            detailsholder.appendChild(postalCodeElement);
            detailsholder.appendChild(document.createTextNode(zc));
            detailsholder.appendChild(document.createElement('br'));
        }
    },
    getCommonPopupHTML: function (poi, titleholder, detailsholder) {
        if (poi.Category && poi.Category.length > 0) {
            var h2 = document.createElement('h2');
            var categoryStr = '(' + poi.Category + ')';
            h2.appendChild(document.createTextNode(categoryStr));
            titleholder.appendChild(h2);
        }
        if (poi.Street && poi.Street.length > 0) {
            var address = document.createElement('span');
            address.className = 'search_destak_smaps';
            address.innerHTML = 'Morada: ';
            detailsholder.appendChild(address);
            detailsholder.appendChild(document.createTextNode(poi.Street));
            if (poi.Parish && poi.Parish.length > 0) {
                detailsholder.appendChild(document.createTextNode(', '));
                detailsholder.appendChild(document.createTextNode(poi.Parish));
            }
            if (poi.Municipality && poi.Municipality.length > 0 && poi.Municipality !== poi.Parish) {
                detailsholder.appendChild(document.createTextNode(', '));
                detailsholder.appendChild(document.createTextNode(poi.Municipality));
            }
            if (poi.District && poi.District.length > 0 && poi.District !== poi.Municipality) {
                detailsholder.appendChild(document.createTextNode(', '));
                detailsholder.appendChild(document.createTextNode(poi.District));
            }
            detailsholder.appendChild(document.createElement('br'));
        }
        if (poi.ZipCode && poi.ZipCode.length > 0) {
            var zc = poi.ZipCode;
            if (poi.ZipCode.length > 4) {
                zc = (poi.ZipCode.substring(0, 4) + "-" + poi.ZipCode.substring(4));
            }
            var postalCode = document.createElement('span');
            postalCode.className = 'search_destak_smaps';
            postalCode.innerHTML = 'Cód. Postal: ';
            detailsholder.appendChild(postalCode);
            detailsholder.appendChild(document.createTextNode(zc));
            detailsholder.appendChild(document.createElement('br'));
        }
        if (poi.Phone && poi.Phone.length > 0) {
            var phoneElement = document.createElement('span');
            phoneElement.className = 'search_destak_smaps';
            phoneElement.innerHTML = 'Telefone: ';
            detailsholder.appendChild(phoneElement);
            detailsholder.appendChild(document.createTextNode(poi.Phone));
            detailsholder.appendChild(document.createElement('br'));
        }
        if (poi.Fax && poi.Fax.length > 0) {
            var faxElement = document.createElement('span');
            faxElement.className = 'search_destak_smaps';
            faxElement.innerHTML = 'Fax: ';
            detailsholder.appendChild(faxElement);
            detailsholder.appendChild(document.createTextNode(poi.Fax));
            detailsholder.appendChild(document.createElement('br'));
        }
        var contacts = document.createElement('span');
        detailsholder.appendChild(contacts);
        contacts.id = 'search_site_link';
        if (poi.URL && poi.URL.length > 0) {
            var url_a = document.createElement('a');
            url_a.target = 'blank';
            url_a.href = poi.URL;
            url_a.innerHTML = 'Site';
            contacts.appendChild(url_a);
        }
        if (poi.EMail && poi.EMail.length > 0) {
            if (poi.URL && poi.URL.length > 0) {
                contacts.appendChild(document.createTextNode(' | '));
            }
            var email_a = document.createElement('a');
            email_a.target = 'blank';
            email_a.href = 'mailto:' + poi.EMail;
            email_a.innerHTML = 'Email';
            contacts.appendChild(email_a);
        }
        if (poi.Description && poi.Description.length > 0) {
            var desc_holder = document.createElement('div');
            desc_holder.className = 'search_description_holder';
            var descriptionElement = document.createElement('span');
            descriptionElement.className = 'search_destak_smaps';
            descriptionElement.innerHTML = 'Descrição: ';
            desc_holder.appendChild(descriptionElement);
            desc_holder.appendChild(document.createTextNode(poi.Description));
            detailsholder.appendChild(desc_holder);
        }
    },
    registerEvent: function (eventType, context, func) {
        if (!this.listeners[eventType]) {
            this.listeners[eventType] = [];
        }
        var obj = {
            func: func,
            context: context
        };
        this.listeners[eventType].push(obj);
    },
    unRegisterEvent: function (eventType, context, func) {
        var evts = this.listeners[eventType] ? this.listeners[eventType] : [];
        for (var i = 0; i < evts.length; ++i) {
            if (context == evts[i].context && func == evts[i].func) {
                evts.splice(i, 1);
                return true;
            }
        }
        return false;
    },
    notifyListeners: function (eventType, args) {
        var evts = this.listeners[eventType] ? this.listeners[eventType] : [];
        args = args ? args : [];
        var func, context;
        for (var i = 0; i < evts.length; ++i) {
            func = evts[i].func;
            context = evts[i].context;
            func.apply(context, args);
        }
    },
    EVENT_TYPES: ['completed', 'timeout', 'selected', 'selectedOnMap', 'selectedOnPanel', 'unselected', 'cleanResults', 'canceled', 'pageChanged', 'error'],
    CLASS_NAME: 'SAPO.Maps.Search'
});
SAPO.Maps.Geocoder = OpenLayers.Class({
    requester: null,
    url: 'http://services.sapo.pt/Maps/SearchJSON',
    whatsHereUrl: 'http://services.sapo.pt/Maps/GetWhatsHereJSON',
    initialize: function () {
        this.requester = SAPO.Maps.Request.prototype.getRequester();
    },
    getLocations: function (query, onCompleteCallback, onErrorCallback, opts) {
        var options = OpenLayers.Util.extend({
            bbox: null,
            resultsPerPage: 20,
            pageNumber: 1,
            context: null,
            searchForPOIS: false
        }, opts);
        var url = this.url + '?q=' + encodeURIComponent(query) + "&f=allnotmedia";
        if (options.searchForPOIS) {
            url += ';allpois';
        }
        url += '&recordsPerPage=' + options.resultsPerPage + '&pageNumber=' + options.pageNumber;
        if (options.bbox) {
            var bbox = opts.bbox.toArray();
            url += "&xMin=" + bbox[0] + "&yMin=" + bbox[1] + "&xMax=" + bbox[2] + "&yMax=" + bbox[3];
        }

        function timeout() {
            try {
                onErrorCallback.apply(this, [options.context]);
            } catch (e3) {}
        }
        this.requester.request(url, {
            timeout: 4,
            onComplete: this.processRequest.bindObj(this),
            onTimeout: timeout.bindObj(this),
            optOnComplete: {
                onComplete: onCompleteCallback,
                onTimeout: onErrorCallback,
                options: options
            }
        });
    },
    findWhatsHere: function (lonlat, zoom, onCompleteCallback, onErrorCallback, opts) {
        var options = OpenLayers.Util.extend({
            context: null
        }, opts);
        var url = this.whatsHereUrl + '?zoomlevel=' + zoom + '&latitude=' + lonlat.lat + '&longitude=' + lonlat.lon;

        function timeoutOrError() {
            try {
                onErrorCallback.apply(this, [options.context]);
            } catch (e3) {}
        }
        this.requester.request(url, {
            timeout: 4,
            onComplete: this.processRequestWhatsHere.bindObj(this),
            onTimeout: timeoutOrError,
            onError: timeoutOrError,
            optOnComplete: {
                onComplete: onCompleteCallback,
                onTimeout: onErrorCallback,
                options: options
            }
        });
    },
    processRequestWhatsHere: function (obj, args) {
        var pois = [];
        try {
            pois = obj.GetWhatsHereResponse.GetWhatsHereResult['a:POI'];
        } catch (e1) {
            if (args.onComplete) {
                this.notifyCallbacks(args.onComplete, this, [pois, args.options.context, pois.length]);
            }
            return;
        }
        if (!pois) {
            pois = [];
        } else {
            if (!pois.length) {
                pois = [pois];
            }
        }
        var poisArrAux = [];
        var poiAux = false;
        for (var i = 0; i < pois.length; ++i) {
            poiAux = new SAPO.Maps.Poi();
            poiAux.loadPOI('a', pois[i]);
            poisArrAux.push(poiAux);
        }
        if (args.onComplete) {
            this.notifyCallbacks(args.onComplete, this, [poisArrAux, args.options.context, poisArrAux.length]);
        }
    },
    processRequest: function (obj, args) {
        var pois = [],
            totalResults = 0;
        try {
            pois = obj.SearchResponse.SearchResult.POI;
            totalResults = Number(obj.SearchResponse.SearchResult.totalResults);
        } catch (e1) {
            if (args.onComplete) {
                this.notifyCallbacks(args.onComplete, this, [pois, args.options.context, totalResults]);
            }
            return;
        }
        if (!pois) {
            pois = [];
        } else {
            if (!pois.length) {
                pois = [pois];
            }
        }
        if (args.onComplete) {
            this.notifyCallbacks(args.onComplete, this, [pois, args.options.context, totalResults]);
        }
    },
    notifyCallbacks: function (callback, context, params) {
        if (!callback) {
            return;
        }
        try {
            callback.apply(context, params);
        } catch (e) {}
    },
    CLASS_NAME: 'SAPO.Maps.Geocoder'
});
SAPO.Maps.Directions = OpenLayers.Class({
    panel: null,
    map: null,
    language: null,
    route: null,
    events: null,
    syndicationObj: null,
    status: SAPO.Maps.Request.Status.STOP,
    request: null,
    currentStepIdx: 0,
    popup: null,
    borders: null,
    imagesURL: {
        start: "http://js.sapo.pt/Assets/Maps/Images/bandeira_verde.gif",
        end: "http://js.sapo.pt/Assets/Maps/Images/bandeira_vermelha.gif",
        left: "http://js.sapo.pt/Assets/Maps/Images/esquerda.gif",
        right: "http://js.sapo.pt/Assets/Maps/Images/direita.gif",
        front: "http://js.sapo.pt/Assets/Maps/Images/frente.gif"
    },
    initialize: function (map, panel, options) {
        this.events = {};
        this.syndicationObj = new SAPO.Communication.Syndication();
        this.map = map;
        if (panel) {
            this.panel = typeof (panel) == 'string' ? document.getElementById(panel) : panel;
        }
        OpenLayers.Util.extend(this, options);
        if (!this.language) {
            this.language = "pt";
        }
    },
    getDirections: function (start, end, options) {
        if (this.status == SAPO.Maps.Request.Status.REQUESTING) {
            throw 'SAPO.Maps.Directions: cannot query the server while the last request is waiting';
        }
        if (!options) {
            options = {};
        }
        options = OpenLayers.Util.extend({
            mode: 'fastest',
            description: 'text'
        }, options);
        var mode = false;
        switch (options.mode) {
        case "fastest":
            mode = "rapido";
            break;
        case "shortest":
            mode = "curto";
            break;
        case "walk":
            mode = "apeado";
            break;
        default:
            throw 'Unsuported parameter: ' + options.mode;
        }
        var requestURL = "http://services.sapo.pt/Maps/GetRoute/JSON?mode=" + mode + "&pts=" + start.lon + "," + start.lat + "," + end.lon + "," + end.lat;
        this.route = null;
        this.request = {
            cancel: false
        };
        var reqID = this.syndicationObj.push(requestURL, {
            timeout: 10,
            onComplete: this.onComplete.bindObj(this),
            onTimeout: this.onError.bindObj(this),
            optOnComplete: {
                status: this.request,
                description: options.description,
                mode: mode,
                showMapCheckbox: options.showMapCheckbox
            }
        });
        this.status = SAPO.Maps.Request.Status.REQUESTING;
        this.syndicationObj.run(reqID);
        try {
            this.notifyListeners('loading', []);
        } catch (e) {}
        if (this.panel) {
            SAPO.Maps.Utils.displayWaitIcon(this.panel);
        }
        return true;
    },
    onComplete: function (obj, args) {
        if (this.status != SAPO.Maps.Request.Status.REQUESTING || args.status.cancel) {
            return;
        }
        try {
            if (this.panel) {
                SAPO.Maps.Utils.removeWaitIcon(this.panel);
            }
            var route = obj;
            if (!route.segs || route.error_code <= 0) {
                this.status = SAPO.Maps.Request.Status.ERROR;
                try {
                    this.notifyListeners('noroute', [this]);
                } catch (e4) {}
                if (this.panel) {
                    var elem = document.createElement('div');
                    elem.className = 'search_results_smapi';
                    SAPO.Maps.Utils.displayMessageHTML(elem, "Não temos informação disponível para o itinerário entre os pontos indicados", "", "", SAPO.Maps.Utils.MessageType.WARNING);
                    this.panel.appendChild(elem);
                }
            }
            var steps = [];
            var lines, points, lonlat;
            for (var i = 0; i < route.segs.length; ++i) {
                points = [];
                lines = route.segs[i].lines;
                for (var j = 0; j < lines.length; ++j) {
                    lonlat = new OpenLayers.LonLat(lines[j].x, lines[j].y);
                    lonlat.transform(new OpenLayers.Projection("EPSG:900913"), new OpenLayers.Projection("EPSG:4326"));
                    points.push(lonlat);
                }
                if (i > 0 && route.segs[i].st === "") {
                    steps[steps.length - 1].distance += route.segs[i].m;
                    steps[steps.length - 1].duration += route.segs[i].t;
                    steps[steps.length - 1].points = (steps[steps.length - 1].points).concat(points);
                    continue;
                }
                steps.push(new SAPO.Maps.Directions.Step({
                    points: points,
                    direction: route.segs[i].dir,
                    location: route.segs[i].st.replace('&#65533;', '\''),
                    distance: route.segs[i].m,
                    duration: route.segs[i].t
                }));
            }
            this.route = new SAPO.Maps.Directions.Route(steps);
            if (args.mode === "apeado") {
                this.route.duration = obj.total.s;
            }
            this.status = SAPO.Maps.Request.Status.OK;
            if (this.panel) {
                this.buildHTML(this.panel);
                if (args.description == "textmap") {
                    for (var a = 0; a < this.route.getSteps().length; ++a) {
                        this.showText(a);
                        this.showMap(a);
                    }
                }
                if (args.description == "text") {
                    for (var b = 0; b < this.route.getSteps().length; ++b) {
                        this.showText(b);
                    }
                }
                if (args.description == "map") {
                    for (var c = 0; c < this.route.getSteps().length; ++c) {
                        this.showMap(c);
                    }
                }
                if (args.showMapCheckbox) {
                    for (var d = 0; d < this.route.getSteps().length; ++d) {
                        this.showCheckbox(d);
                    }
                }
            }
            if (this.map) {
                var polyline = this.getPolyline();
                var bounds = this.getBounds();
                this.map.addOverlay(polyline);
                SAPO.Maps.Utils.AdjustBoundsConsideringBorders(this.map, bounds, this.borders);
            }
            try {
                this.notifyListeners('completed', [this]);
            } catch (e2) {
                try {
                    this.notifyListeners('error', [this]);
                } catch (e3) {}
            }
        } catch (e1) {
            this.route = null;
            this.status = SAPO.Maps.Request.Status.ERROR;
            try {
                this.notifyListeners('error', [this]);
            } catch (e5) {}
        }
    },
    onError: function () {
        if (this.status != SAPO.Maps.Request.Status.REQUESTING) {
            return;
        }
        this.status = SAPO.Maps.Request.Status.ERROR;
        try {
            this.notifyListeners('timeout', [this]);
            if (this.panel) {
                SAPO.Maps.Utils.removeWaitIcon(this.panel);
                var elem = document.createElement('div');
                elem.className = 'search_results_smapi';
                SAPO.Maps.Utils.displayMessageHTML(elem, "Não temos informação disponível para o itinerário entre os pontos indicados", "", "", SAPO.Maps.Utils.MessageType.WARNING);
                this.panel.appendChild(elem);
            }
        } catch (e) {}
    },
    getStatus: function () {
        return this.status;
    },
    getBounds: function () {
        if (this.status != SAPO.Maps.Request.Status.OK) {
            return null;
        }
        return this.route.getBounds();
    },
    getPolyline: function () {
        if (this.status != SAPO.Maps.Request.Status.OK) {
            return null;
        }
        return this.route.getPolyline();
    },
    getDuration: function () {
        if (this.status != SAPO.Maps.Request.Status.OK) {
            return null;
        }
        return this.route.getDuration();
    },
    getDistance: function () {
        if (this.status != SAPO.Maps.Request.Status.OK) {
            return null;
        }
        return this.route.getDistance();
    },
    getRoute: function () {
        if (this.status != SAPO.Maps.Request.Status.OK) {
            return null;
        }
        return this.route;
    },
    getStartLonLat: function () {
        if (this.status != SAPO.Maps.Request.Status.OK) {
            return null;
        }
        return this.route.getSteps()[0].getStart();
    },
    getEndLonLat: function () {
        if (this.status != SAPO.Maps.Request.Status.OK) {
            return null;
        }
        var steps = this.route.getSteps();
        return steps[steps.length - 1].getEnd();
    },
    getDescription: function () {
        if (this.status != SAPO.Maps.Request.Status.OK) {
            return null;
        }
        return this.route.getDescription(this.language);
    },
    getSummaryHTML: function () {
        if (this.status != SAPO.Maps.Request.Status.OK) {
            return null;
        }
        var divNode = document.createElement("div");
        this.buildHTML(divNode);
        return divNode;
    },
    navigateTo: function (idxStep) {
        try {
            var tr = this.panel.childNodes[1].childNodes[1].childNodes[this.currentStepIdx + 1];
            if (tr.hasMap && tr.hasText) {
                tr.className = "iti_step_smapi iti_imageandtext_list_smapi";
            } else {
                if (tr.hasMap) {
                    tr.className = "iti_step_smapi iti_image_list_smapi";
                } else {
                    tr.className = "iti_step_smapi";
                }
            }
            tr = this.panel.childNodes[1].childNodes[1].childNodes[idxStep + 1];
            if (tr.hasMap && tr.hasText) {
                tr.className = "iti_step_smapi iti_imageandtext_list_smapi iti_selected_smapi";
                if (OpenLayers.Util.getBrowserName() === 'msie') {
                    tr.className += " iti_selected_smapi_ie";
                }
            } else {
                if (tr.hasMap) {
                    tr.className = "iti_step_smapi iti_image_list_smapi iti_selected_smapi";
                    if (OpenLayers.Util.getBrowserName() === 'msie') {
                        tr.className += " iti_selected_smapi_ie";
                    }
                } else {
                    tr.className = "iti_step_smapi iti_selected_smapi";
                    if (OpenLayers.Util.getBrowserName() === 'msie') {
                        tr.className += " iti_selected_smapi_ie";
                    }
                }
            }
        } catch (e2) {}
        this.currentStepIdx = idxStep;
        if (!this.map) {
            return;
        }
        var step = this.route.steps[idxStep];
        var stepBounds = new OpenLayers.Bounds(step.points[0].lon, step.points[0].lat, step.points[0].lon, step.points[0].lat);
        for (var i = 1; i < step.points.length; ++i) {
            stepBounds.extend(step.points[i]);
        }
        stepBounds.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
        var stepZoom = this.map.getZoomForExtent(stepBounds);
        this.map.zoomTo(stepZoom);
        this.map.panTo(this.route.getSteps()[idxStep].getStart().clone().transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913")));
        try {
            this.notifyListeners('stepSelected', [this, this.currentStepIdx]);
        } catch (e1) {}
    },
    unselectStep: function () {
        try {
            var tr = this.panel.childNodes[1].childNodes[1].childNodes[this.currentStepIdx + 1];
            if (tr.hasMap && tr.hasText) {
                tr.className = "iti_step_smapi iti_imageandtext_list_smapi";
            } else {
                if (tr.hasMap) {
                    tr.className = "iti_step_smapi iti_image_list_smapi";
                } else {
                    tr.className = "iti_step_smapi";
                }
            }
        } catch (e1) {
            return;
        }
        try {
            this.notifyListeners('stepUnselected', [this, this.currentStepIdx]);
        } catch (e2) {}
    },
    openPopup: function (idxStep) {
        if (!this.map) {
            return;
        }
        var _this = this;
        var step;
        try {
            step = this.route.getSteps()[idxStep];
        } catch (e1) {
            return;
        }
        var first = idxStep === 0 ? true : false;
        var last = idxStep == this.route.getSteps().length - 1 ? true : false;
        if (this.popup) {
            this.closePopup();
        }
        var content = "<div>" + step.getDescription("pt", {
            isFirstStep: first
        }) + "</div>";
        var popupAnchor = step.getStart().clone().transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
        this.popup = new SAPO.Maps.Popup.SapoPopup(popupAnchor.toShortString(), popupAnchor, null, content, true, function (popup) {
            SAPO.Maps.Directions.prototype.closePopup.apply(_this, []);
        });
        this.map.addPopup(this.popup);
        this.navigateTo(idxStep);
        try {
            this.notifyListeners('popupOpened', [this, this.currentStepIdx]);
        } catch (e2) {}
    },
    closePopup: function () {
        if (!this.map) {
            return;
        }
        if (this.popup) {
            this.map.removePopup(this.popup);
            this.popup = null;
        }
        this.unselectStep();
        try {
            this.notifyListeners('popupClosed', [this, this.currentStepIdx]);
        } catch (e) {}
    },
    showAllMaps: function () {
        if (this.status !== SAPO.Maps.Request.Status.OK) {
            return;
        }
        var length = this.route.getSteps().length;
        for (var i = 0; i < length; ++i) {
            this.showMap(i);
        }
    },
    hideAllMaps: function () {
        if (this.status !== SAPO.Maps.Request.Status.OK) {
            return;
        }
        var length = this.route.getSteps().length;
        for (var i = 0; i < length; ++i) {
            this.hideMap(i);
        }
    },
    showMap: function (idxStep) {
        var tr_step = this.panel.childNodes[1].childNodes[1].childNodes[idxStep + 1];
        var divMapStep = tr_step.childNodes[3].childNodes[1];
        if (!divMapStep) {
            return;
        }
        divMapStep.id = Math.random().toString();
        divMapStep.style.display = "block";
        divMapStep.style.width = "130px";
        divMapStep.style.height = "130px";
        if (!divMapStep.mapObject) {
            divMapStep.mapObject = new SAPO.Maps.Map(divMapStep.id);
            for (var i = 0; i < divMapStep.mapObject.controls.length; ++i) {
                if (divMapStep.mapObject.controls[i].CLASS_NAME === "SAPO.Maps.Control.Scale") {
                    divMapStep.mapObject.removeControl(divMapStep.mapObject.controls[i]);
                    break;
                }
            }
            for (var j = 0; i < divMapStep.mapObject.controls.length; ++i) {
                if (divMapStep.mapObject.controls[i].CLASS_NAME === "SAPO.Maps.Control.PermanentLink") {
                    divMapStep.mapObject.removeControl(divMapStep.mapObject.controls[i]);
                    break;
                }
            }
            var polyline = this.getPolyline().clone();
            divMapStep.mapObject.addOverlay(polyline);
            divMapStep.mapObject.setMapCenter(this.route.getSteps()[idxStep].getStart(), 17);
        }
        tr_step.hasMap = true;
        tr_step.childNodes[3].className = "iti_showMap_checkbox";
        tr_step.childNodes[3].childNodes[0].childNodes[0].checked = true;
    },
    hideMap: function (idxStep) {
        var tr_step = this.panel.childNodes[1].childNodes[1].childNodes[idxStep + 1];
        var divMapStep = tr_step.childNodes[3].childNodes[1];
        if (!divMapStep) {
            return;
        }
        divMapStep.style.display = "none";
        tr_step.hasMap = false;
        if (!tr_step.hasCheckbox) {
            tr_step.childNodes[3].className = "hide";
        }
        tr_step.childNodes[3].childNodes[0].childNodes[0].checked = false;
    },
    showText: function (idxStep) {
        var tr_step = this.panel.childNodes[1].childNodes[1].childNodes[idxStep + 1];
        if (!tr_step) {
            return;
        }
        tr_step.hasText = true;
        tr_step.childNodes[1].className = "iti_direction_text_smapi";
    },
    hideText: function (idxStep) {
        var tr_step = this.panel.childNodes[1].childNodes[1].childNodes[idxStep + 1];
        if (!tr_step) {
            return;
        }
        tr_step.hasText = false;
        tr_step.childNodes[1].className = "hide";
    },
    showCheckbox: function (idxStep) {
        var tr_step = this.panel.childNodes[1].childNodes[1].childNodes[idxStep + 1];
        if (!tr_step) {
            return;
        }
        tr_step.childNodes[3].childNodes[0].style.display = "block";
        tr_step.hasCheckbox = true;
        tr_step.childNodes[3].className = "iti_showMap_checkbox";
    },
    hideCheckbox: function (idxStep) {
        var tr_step = this.panel.childNodes[1].childNodes[1].childNodes[idxStep + 1];
        if (!tr_step) {
            return;
        }
        tr_step.childNodes[3].childNodes[0].style.display = "none";
        tr_step.hasCheckbox = false;
        if (!tr_step.hasMap) {
            tr_step.childNodes[3].className = "hide";
        }
    },
    buildHTML: function (node) {
        if (this.status != SAPO.Maps.Request.Status.OK) {
            return null;
        }
        var _this = this;
        while (node.hasChildNodes()) {
            node.removeChild(node.childNodes[0]);
        }
        node.className = "iti_results_smapi";
        node.style.position = "relative";
        if (OpenLayers.Util.getBrowserName() === 'msie') {
            node.className += " iti_results_smapi_ie";
        }
        var steps = this.route.getSteps();
        var div_header = document.createElement("div");
        div_header.className = "iti_results_header_smapi";
        var div_estimated_time = document.createElement("div");
        div_estimated_time.className = "iti_estimated_smapi";
        var p_distance = document.createElement("p");
        var p_estimated_time = document.createElement("p");
        if (this.language === "pt") {
            p_distance.innerHTML = "Dist&acirc;ncia: ";
            p_estimated_time.innerHTML = "Tempo Estimado: ";
        }
        if (this.language === "en") {
            p_distance.innerHTML = "Distance: ";
            p_estimated_time.innerHTML = "Estimated Time: ";
        }
        var route_distance = this.route.getDistance();
        p_distance.innerHTML += "<span>" + (route_distance > 1000 ? (route_distance / 1000).toFixed(1).toString() + "km" : route_distance.toString() + "m") + "</span";
        var route_duration = this.route.getDuration();
        if (route_duration < 60) {
            p_estimated_time.innerHTML += "<span>" + Math.round(route_duration).toString() + "s</span>";
        } else {
            if (route_duration < 3600) {
                p_estimated_time.innerHTML += "<span>" + (route_duration / 60).toFixed(0).toString() + "min</span>";
            } else {
                var hours = Math.floor(route_duration / 3600);
                var minutes = ((route_duration % 3600) / 60).toFixed(0);
                p_estimated_time.innerHTML += "<span>" + hours + "h " + minutes + "min</span>";
            }
        }
        div_estimated_time.appendChild(p_distance);
        div_estimated_time.appendChild(p_estimated_time);
        div_header.appendChild(div_estimated_time);
        node.appendChild(div_header);
        var table_list = document.createElement("table");
        table_list.className = "iti_result_list_smapi";
        var tableHeader_list = document.createElement("thead");
        tableHeader_list.style.height = "0px";
        var tableFooter_list = document.createElement("tfoot");
        tableFooter_list.style.height = "0px";
        var tableBody_list = document.createElement("tbody");
        tableBody_list.style.height = "0px";
        table_list.appendChild(tableHeader_list);
        table_list.appendChild(tableBody_list);
        table_list.appendChild(tableFooter_list);
        var tr_start = document.createElement("tr");
        tr_start.className = "iti_Points_smapi";
        var td_img_start = document.createElement("td");
        td_img_start.colSpan = '5';
        td_img_start.className = "iti_start_image_smapi";
        var span_start = document.createElement("span");
        span_start.innerHTML = steps[0].getLocation();
        td_img_start.appendChild(span_start);
        tr_start.appendChild(td_img_start);
        tableBody_list.appendChild(tr_start);
        var tr_step, td_step_text_img, img_step_img, td_step_text_description, td_step_text_length, td_step_checkbox_map, input_checkbox, label_checkbox, p_checkbox, div_step_map, a_step, span_step1, span_step2;
        for (var i = 0; i < steps.length; ++i) {
            tr_step = document.createElement("tr");
            tr_step.className = "iti_step_smapi";
            div_step_map = document.createElement("div");
            div_step_map.className = "iti_direction_preview_smapi";
            td_step_text_img = document.createElement("td");
            td_step_text_img.className = "iti_direction_img_smapi";
            img_step_img = document.createElement("img");
            td_step_text_description = document.createElement("td");
            td_step_text_description.className = "iti_direction_text_smapi";
            td_step_text_length = document.createElement("td");
            td_step_text_length.className = "iti_meters_smapi";
            a_step = document.createElement("a");
            a_step.href = "#";
            span_step1 = document.createElement("span");
            span_step2 = document.createElement("span");
            if (OpenLayers.Util.getBrowserName() === 'msie') {
                td_step_text_description.className += " iti_direction_text_smapi_ie";
                td_step_text_img.className += " iti_direction_img_smapi_ie";
                td_step_text_length.className += " iti_meters_smapi_ie";
            }
            if (this.language === "pt") {
                if (i === 0) {
                    img_step_img.src = "http://imgs.sapo.pt/fotos_gis/site/iti_continue.gif";
                    span_step1.innerHTML = "Siga";
                    a_step.appendChild(span_step1);
                    if (steps[i].getLocation() !== "") {
                        a_step.innerHTML += " por ";
                        span_step2.innerHTML = steps[i].getLocation();
                        a_step.appendChild(span_step2);
                    }
                } else {
                    switch (steps[i].direction) {
                    case 0:
                        img_step_img.src = "http://imgs.sapo.pt/fotos_gis/site/iti_continue.gif";
                        span_step1.innerHTML = "Continue";
                        a_step.appendChild(span_step1);
                        if (steps[i].getLocation() !== "") {
                            a_step.innerHTML += " para ";
                            span_step2.innerHTML = steps[i].getLocation();
                            a_step.appendChild(span_step2);
                        }
                        break;
                    case 1:
                        img_step_img.src = "http://imgs.sapo.pt/fotos_gis/site/iti_turn_left.gif";
                        span_step1.innerHTML = "Vire &agrave; esquerda";
                        a_step.appendChild(span_step1);
                        if (steps[i].getLocation() !== "") {
                            a_step.innerHTML += " para ";
                            span_step2.innerHTML = steps[i].getLocation();
                            a_step.appendChild(span_step2);
                        }
                        break;
                    case -1:
                        img_step_img.src = "http://imgs.sapo.pt/fotos_gis/site/iti_turn_right.gif";
                        span_step1.innerHTML = "Vire &agrave; direita";
                        a_step.appendChild(span_step1);
                        if (steps[i].getLocation() !== "") {
                            a_step.innerHTML += " para ";
                            span_step2.innerHTML = steps[i].getLocation();
                            a_step.appendChild(span_step2);
                        }
                        break;
                    }
                }
            }
            if (this.language === "en") {
                if (i === 0) {
                    img_step_img.src = "http://imgs.sapo.pt/fotos_gis/site/iti_continue.gif";
                    span_step1.innerHTML = "Go";
                    a_step.appendChild(span_step1);
                    if (steps[i].getLocation() !== "") {
                        a_step.innerHTML += " through ";
                        span_step2.innerHTML = steps[i].getLocation();
                        a_step.appendChild(span_step2);
                    }
                } else {
                    switch (steps[i].direction) {
                    case 0:
                        img_step_img.src = "http://imgs.sapo.pt/fotos_gis/site/iti_continue.gif";
                        span_step1.innerHTML = "Continue";
                        a_step.appendChild(span_step1);
                        if (steps[i].getLocation() !== "") {
                            a_step.innerHTML += " to ";
                            span_step2.innerHTML = steps[i].getLocation();
                            a_step.appendChild(span_step2);
                        }
                        break;
                    case 1:
                        img_step_img.src = "http://imgs.sapo.pt/fotos_gis/site/iti_turn_left.gif";
                        span_step1.innerHTML = "Turn left";
                        a_step.appendChild(span_step1);
                        if (steps[i].getLocation() !== "") {
                            a_step.innerHTML += " to ";
                            span_step2.innerHTML = steps[i].getLocation();
                            a_step.appendChild(span_step2);
                        }
                        break;
                    case -1:
                        img_step_img.src = "http://imgs.sapo.pt/fotos_gis/site/iti_turn_right.gif";
                        span_step1.innerHTML = "Turn right";
                        a_step.appendChild(span_step1);
                        if (steps[i].getLocation() !== "") {
                            a_step.innerHTML += " to ";
                            span_step2.innerHTML = steps[i].getLocation();
                            a_step.appendChild(span_step2);
                        }
                        break;
                    }
                }
            }
            td_step_text_length.innerHTML = steps[i].getDistance() > 1000 ? (steps[i].getDistance() / 1000).toFixed(1).toString() + "km" : steps[i].getDistance().toString() + "m";
            td_step_text_description.appendChild(a_step);
            td_step_checkbox_map = document.createElement("td");
            p_checkbox = document.createElement("p");
            td_step_checkbox_map.className = "iti_showMap_checkbox";
            OpenLayers.Event.observe(td_step_checkbox_map, 'click', OpenLayers.Event.stop);
            input_checkbox = document.createElement("input");
            input_checkbox.id = "__SAPO_MAPS_DIRECTIONS_" + (new Date().getTime()).toString();
            try {
                if (this.language === "pt") {
                    label_checkbox = document.createElement('<label for="' + input_checkbox.id + '"></label>');
                    label_checkbox.appendChild(document.createTextNode(" ver mapa"));
                }
                if (this.language === "en") {
                    label_checkbox = document.createElement('<label for="' + input_checkbox.id + '"></label>');
                    label_checkbox.appendChild(document.createTextNode(" show map"));
                }
            } catch (e1) {
                label_checkbox = document.createElement('label');
                label_checkbox.setAttribute('for', input_checkbox.id);
                if (this.language === "pt") {
                    label_checkbox.appendChild(document.createTextNode(" ver mapa"));
                }
                if (this.language === "en") {
                    label_checkbox.appendChild(document.createTextNode(" show map"));
                }
            }
            label_checkbox.onclick = function (e) {
                OpenLayers.Event.stop(e ? e : window.event, true);
            };
            input_checkbox.type = "checkbox";
            input_checkbox.idxStep = i;
            input_checkbox.onclick = function (e) {
                if (this.checked) {
                    _this.showMap(this.idxStep);
                } else {
                    _this.hideMap(this.idxStep);
                }
                OpenLayers.Event.stop(e ? e : window.event, true);
            };
            p_checkbox.appendChild(input_checkbox);
            p_checkbox.appendChild(label_checkbox);
            p_checkbox.style.display = "none";
            td_step_checkbox_map.appendChild(p_checkbox);
            td_step_checkbox_map.appendChild(div_step_map);
            td_step_text_img.appendChild(img_step_img);
            tr_step.appendChild(td_step_text_img);
            tr_step.appendChild(td_step_text_description);
            tr_step.appendChild(td_step_text_length);
            tr_step.appendChild(td_step_checkbox_map);
            tableBody_list.appendChild(tr_step);
            tr_step.idxStep = i;
            tr_step.onclick = function () {
                _this.openPopup(this.idxStep);
            };
        }
        var tr_end = document.createElement("tr");
        tr_end.className = "iti_Points_smapi";
        var td_img_end = document.createElement("td");
        td_img_end.colSpan = 5;
        td_img_end.className = "iti_end_image_smapi";
        td_img_end.innerHTML = steps[steps.length - 1].getLocation();
        tr_end.appendChild(td_img_end);
        tableBody_list.appendChild(tr_end);
        node.appendChild(table_list);
        return node;
    },
    clear: function () {
        if (this.status == SAPO.Maps.Request.Status.REQUESTING) {
            throw 'Directions: cannot clear the info until the request is pending';
        }
        this.clearLine();
        this.clearPanel();
        try {
            this.notifyListeners('clear', [this]);
        } catch (e) {}
    },
    clearLine: function () {
        var polyline = this.getPolyline();
        if (polyline && this.map) {
            this.map.removeOverlay(polyline);
            this.closePopup();
        }
    },
    clearPanel: function () {
        if (this.panel) {
            while (this.panel.hasChildNodes()) {
                this.panel.removeChild(this.panel.childNodes[0]);
            }
            var classes = this.panel.className.split(' ');
            this.panel.className = "";
            if (classes.length === 0) {
                return;
            }
            for (var i = 0; i < classes.length; ++i) {
                if (classes[i] === "iti_results_smapi" || classes[i] === "iti_results_smapi_ie") {
                    continue;
                }
                this.panel.className += classes[i];
            }
        }
    },
    cancel: function () {
        if (this.status != SAPO.Maps.Request.Status.REQUESTING) {
            return;
        }
        this.status = SAPO.Maps.Request.Status.CANCELED;
        this.request.cancel = true;
        try {
            this.notifyListeners('canceled', [this]);
        } catch (e) {}
    },
    registerEvent: function (eventType, context, func) {
        if (!this.events[eventType]) {
            this.events[eventType] = [];
        }
        var obj = {
            func: func,
            context: context
        };
        this.events[eventType].push(obj);
    },
    unRegisterEvent: function (eventType, context, func) {
        var evts = this.events[eventType] ? this.events[eventType] : [];
        for (var i = 0; i < evts.length; ++i) {
            if (context == evts[i].context && func == evts[i].func) {
                evts.splice(i, 1);
                return true;
            }
        }
        return false;
    },
    notifyListeners: function (eventType, args) {
        var evts = this.events[eventType] ? this.events[eventType] : [];
        args = args ? args : [];
        var func, context;
        for (var i = 0; i < evts.length; ++i) {
            func = evts[i].func;
            context = evts[i].context;
            func.apply(context, args);
        }
    },
    EVENT_TYPES: ['completed', 'error', 'clear', 'canceled', "noroute", "loading", "timeout", "stepSelected", "stepUnselected", "popupOpened", "popupClosed"],
    CLASS_NAME: "SAPO.Maps.Directions"
});
SAPO.Maps.Directions.Step = OpenLayers.Class({
    points: null,
    distance: 0,
    duration: 0,
    location: null,
    direction: null,
    initialize: function (opts) {
        this.direction = opts.direction;
        this.location = opts.location;
        this.distance = opts.distance;
        this.duration = opts.duration;
        this.points = opts.points;
    },
    getPoints: function () {
        return this.points;
    },
    getDescription: function (language, options) {
        var description = null;
        if (!language) {
            language = "pt";
        }
        if (language === "pt") {
            if (options && options.isFirstStep === true) {
                description = this.location === "" ? "" : SAPO.Maps.Lang.pt.directions_first_step_description + this.location;
            } else {
                switch (this.direction) {
                case 0:
                    description = this.location === "" ? SAPO.Maps.Lang.pt.directions_step_forward : SAPO.Maps.Lang.pt.directions_step_forward_description + this.location;
                    break;
                case 1:
                    description = this.location === "" ? SAPO.Maps.Lang.pt.directions_step_left : SAPO.Maps.Lang.pt.directions_step_left_description + this.location;
                    break;
                case -1:
                    description = this.location === "" ? SAPO.Maps.Lang.pt.directions_step_right : SAPO.Maps.Lang.pt.directions_step_right_description + this.location;
                }
            }
        }
        if (language === "en") {
            if (options && options.isFirstStep === true) {
                description = this.location === "" ? "" : SAPO.Maps.Lang.en.directions_first_step_description + this.location;
            } else {
                switch (this.direction) {
                case 0:
                    description = this.location === "" ? SAPO.Maps.Lang.en.directions_step_forward : SAPO.Maps.Lang.en.directions_step_forward_description + this.location;
                    break;
                case 1:
                    description = this.location === "" ? SAPO.Maps.Lang.en.directions_step_left : SAPO.Maps.Lang.en.directions_step_left_description + this.location;
                    break;
                case -1:
                    description = this.location === "" ? SAPO.Maps.Lang.en.directions_step_right : SAPO.Maps.Lang.en.directions_step_right_description + this.location;
                }
            }
        }
        return description;
    },
    getDistance: function () {
        return this.distance;
    },
    getDuration: function () {
        return this.duration;
    },
    getLocation: function () {
        return this.location;
    },
    getDirection: function () {
        return this.direction;
    },
    getStart: function () {
        return this.points[0];
    },
    getEnd: function () {
        return this.points[this.points.length - 1];
    },
    CLASS_NAME: "SAPO.Maps.Directions.Step"
});
SAPO.Maps.Directions.Route = OpenLayers.Class({
    steps: null,
    distance: 0,
    duration: 0,
    polyline: null,
    initialize: function (steps) {
        this.steps = steps;
    },
    getSteps: function () {
        return this.steps;
    },
    getDistance: function () {
        if (this.distance !== 0) {
            return this.distance;
        }
        for (var i = 0; i < this.steps.length; ++i) {
            this.distance += this.steps[i].getDistance();
        }
        return this.distance;
    },
    getDuration: function () {
        if (this.duration !== 0) {
            return this.duration;
        }
        for (var i = 0; i < this.steps.length; ++i) {
            this.duration += this.steps[i].getDuration();
        }
        return this.duration;
    },
    getDescription: function (language) {
        var description = [];
        if (!language) {
            language = "pt";
        }
        for (var i = 0; i < this.steps.length; ++i) {
            description.push(this.steps[i].getDescription(language));
        }
        return description;
    },
    getBounds: function () {
        if (!this.polyline) {
            this.getPolyline();
        }
        return this.polyline.getBounds();
    },
    getPolyline: function () {
        if (this.polyline) {
            return this.polyline;
        }
        var points = [];
        for (var i = 0; i < this.steps.length; ++i) {
            points = points.concat(this.steps[i].points);
        }
        this.polyline = new SAPO.Maps.Polyline(points, {
            strokeColor: "#0000FF",
            strokeOpacity: 0.5,
            strokeWidth: 5
        });
        return this.polyline;
    },
    CLASS_NAME: "SAPO.Maps.Directions.Route"
});
SAPO.Maps.Itineraries = OpenLayers.Class({
    status: null,
    map: null,
    panel: null,
    directions: null,
    search: null,
    listeners: null,
    request: null,
    from: null,
    to: null,
    startSelected: false,
    endSelected: false,
    language: null,
    mode: null,
    description: null,
    showMapCheckbox: false,
    borders: null,
    numberOfPagesShown: 5,
    allowPaging: true,
    indexToSelect: null,
    indexToShowDetails: null,
    div: null,
    initialize: function (map, panel, options) {
        this.language = 'pt';
        this.mode = 'fastest';
        OpenLayers.Util.extend(this, options);
        this.status = SAPO.Maps.Request.Status.STOP;
        this.map = map;
        if (panel) {
            this.panel = typeof (panel) == 'string' ? document.getElementById(panel) : panel;
        }
        this.search = new SAPO.Maps.Search(this.map, this.panel, {
            borders: this.borders,
            openDetailsWhenClick: false,
            numberOfPagesShown: this.numberOfPagesShown
        });
        this.directions = new SAPO.Maps.Directions(map, panel, options);
        this.listeners = {};
        this.directions.registerEvent('completed', this, this.completedDirections);
        this.directions.registerEvent('timeout', this, this.timeout);
        this.directions.registerEvent('noroute', this, this.itineraryNotFound);
        this.directions.registerEvent('popupOpened', this, this.directionsStepSelected);
        this.directions.registerEvent('popupClosed', this, this.directionsStepUnselected);
        this.search.registerEvent('completed', this, this.completedSearch);
        this.search.registerEvent('selectedOnMap', this, this.resultSelectedOnMap);
        this.search.registerEvent('selectedOnPanel', this, this.resultSelectedOnPanel);
        this.search.registerEvent('unselected', this, this.unselectSearchResult);
        this.search.registerEvent('timeout', this, this.timeout);
        this.search.registerEvent('pageChanged', this, this.pageChanged);
    },
    getItinerary: function (from, to, options) {
        if (!from || !to) {
            throw 'Itineraries: Invalid arguments';
        }
        if (this.status == SAPO.Maps.Request.Status.REQUESTING) {
            throw 'Itineraries: Cannot query the server while the last request is waiting';
        }
        this.prepareRequest();
        OpenLayers.Util.extend(this, options);
        this.status = SAPO.Maps.Request.Status.REQUESTING;
        this.from = from;
        this.to = to;
        this.requestPOIS(true);
    },
    getStatus: function () {
        return this.status;
    },
    getStartingPOIS: function () {
        if (!this.startSelected && this.status === SAPO.Maps.Request.Status.REQUESTING) {
            return this.search.getPOIS();
        }
        return this.startSelected;
    },
    getEndingPOIS: function () {
        if (!this.endSelected && this.status === SAPO.Maps.Request.Status.REQUESTING) {
            return this.search.getPOIS();
        }
        return this.endSelected;
    },
    goToPage: function (page) {
        if (this.search.getStatus() === SAPO.Maps.Request.Status.REQUESTING || this.search.getStatus() === SAPO.Maps.Request.Status.OK) {
            return;
        }
        this.search.goToPage(page);
    },
    selectStartPOI: function (idx, page) {
        if (this.startSelected) {
            return;
        }
        if (page && page !== this.search.getCurrentPage()) {
            this.indexToSelect = idx;
            this.goToPage(page);
        } else {
            var pois = this.search.getPOIS();
            if (idx >= pois.length) {
                return;
            }
            this.startSelected = pois[idx];
            try {
                this.notifyListeners('startSelected', [pois[idx], idx, page]);
            } catch (e5) {
                try {
                    this.notifyListeners('error', [this, e5]);
                } catch (e6) {}
            }
            this.requestPOIS(false);
        }
    },
    selectEndPOI: function (idx, page) {
        if (this.endSelected) {
            return;
        }
        if (page && page !== this.search.getCurrentPage()) {
            this.indexToSelect = idx;
            this.goToPage(page);
        } else {
            var pois = this.search.getPOIS();
            if (idx >= pois.length) {
                return;
            }
            this.endSelected = pois[idx];
            try {
                this.notifyListeners('endSelected', [pois[idx], idx, page]);
            } catch (e5) {
                try {
                    this.notifyListeners('error', [this, e5]);
                } catch (e6) {}
            }
            this.requestDirections();
        }
    },
    clear: function (silent) {
        if (this.panel && this.div) {
            this.panel.removeChild(this.div);
            this.div = null;
        }
        this.search.clear();
        this.directions.clear();
        if (!silent) {
            try {
                this.notifyListeners('clean', [this]);
            } catch (e5) {
                try {
                    this.notifyListeners('error', [this, e5]);
                } catch (e6) {}
            }
        }
    },
    cancel: function () {
        this.search.cancel();
        this.directions.cancel();
        this.status = SAPO.Maps.Request.Status.CANCELED;
        try {
            this.notifyListeners('canceled', [this]);
        } catch (e5) {
            try {
                this.notifyListeners('error', [this, e5]);
            } catch (e6) {}
        }
    },
    getDirections: function () {
        if (this.status == SAPO.Maps.Request.Status.OK) {
            return this.directions;
        }
        return null;
    },
    getSearch: function () {
        return this.search;
    },
    selectResult: function (idx, page) {
        if (this.status !== SAPO.Maps.Request.Status.OK && this.status !== SAPO.Maps.Request.Status.REQUESTING) {
            return;
        }
        if (!this.startSelected || !this.endSelected) {
            if (page && page !== this.search.getCurrentPage()) {
                this.indexToShowDetails = idx;
                this.goToPage(page);
            } else {
                this.search.openDetails(idx);
            }
            try {
                this.notifyListeners('resultSelect', [idx, this.search.getCurrentPage()]);
            } catch (e5) {
                try {
                    this.notifyListeners('error', [this, e5]);
                } catch (e6) {}
            }
        } else {
            if (this.status === SAPO.Maps.Request.Status.OK) {
                this.directions.openPopup(idx);
            }
        }
    },
    unselectResult: function (idx) {
        if (this.status !== SAPO.Maps.Request.Status.OK && this.status !== SAPO.Maps.Request.Status.REQUESTING) {
            return;
        }
        if (this.status === SAPO.Maps.Request.Status.OK) {
            this.directions.closePopup(idx);
        } else {
            this.search.unselectResult(idx);
            try {
                this.notifyListeners('resultUnselect', [idx]);
            } catch (e5) {
                try {
                    this.notifyListeners('error', [this, e5]);
                } catch (e6) {}
            }
        }
    },
    getResultSelected: function () {
        if (this.status === SAPO.Maps.Request.Status.OK) {
            return this.directions.currentStepIdx;
        }
        return this.search.getSelectedIndex();
    },
    requestPOIS: function (isStart) {
        this.clear(isStart);
        var query = isStart ? this.from : this.to;
        var isCoords = SAPO.Maps.Utils.checkQuery(query);
        this.search.search(query, {
            allowPaging: this.allowPaging,
            displaySingleResult: false
        });
    },
    requestDirections: function () {
        this.clear(false);
        var start = new OpenLayers.LonLat(this.startSelected.Longitude, this.startSelected.Latitude);
        var end = new OpenLayers.LonLat(this.endSelected.Longitude, this.endSelected.Latitude);
        this.directions.getDirections(start, end, {
            language: this.language,
            mode: this.mode,
            description: this.description,
            showMapCheckbox: this.showMapCheckbox
        });
    },
    prepareRequest: function () {
        this.clear(true);
        this.from = null;
        this.to = null;
        this.startSelected = false;
        this.endSelected = false;
        this.description = "text";
        this.showMapCheckbox = false;
    },
    completedSearch: function (s, pois) {
        var isStart = !this.startSelected;
        if (pois.length === 0) {
            this.status = SAPO.Maps.Request.ERROR;
            try {
                this.notifyListeners('noresults', isStart);
            } catch (e) {
                try {
                    this.notifyListeners('error', [this, e]);
                } catch (e1) {}
            }
            return;
        }
        if (pois.length > 1 && this.panel) {
            var msg = isStart ? 'Seleccione o ponto de partida' : 'Seleccione o ponto de chegada';
            var elem = document.createElement('h1');
            elem.className = 'itineraries_results_smapi_h1';
            elem.innerHTML = msg;
            this.panel.insertBefore(elem, this.panel.firstChild);
            this.div = elem;
        }
        var eventType = isStart ? 'startingPOIS' : 'endingPOIS';
        try {
            this.notifyListeners(eventType, [this, pois]);
        } catch (e2) {
            try {
                this.notifyListeners('error', [this, e2]);
            } catch (e3) {}
        }
        if (pois.length == 1) {
            this.resultSelectedOnPanel(this.search, pois[0], 0, this.search.getCurrentPage());
        }
    },
    resultSelectedOnMap: function (s, poi, idx, page) {
        s.openDetails(idx);
        try {
            this.notifyListeners('resultSelect', [idx, page]);
        } catch (e5) {
            try {
                this.notifyListeners('error', [this, e5]);
            } catch (e6) {}
        }
    },
    resultSelectedOnPanel: function (s, poi, idx, page) {
        var isStart = !this.startSelected;
        var eventType = '';
        if (isStart) {
            eventType = 'startSelected';
            this.startSelected = poi;
            this.requestPOIS(false);
        } else {
            eventType = 'endSelected';
            this.endSelected = poi;
            if (this.startSelected.Latitude === this.endSelected.Latitude && this.startSelected.Longitude === this.endSelected.Longitude) {
                var elem = document.createElement('div');
                elem.className = 'search_results_smapi';
                SAPO.Maps.Utils.displayMessageHTML(elem, "Não é possível calcular um itinerário com o mesmo ponto de partida e chegada.", "", "", SAPO.Maps.Utils.MessageType.WARNING);
                this.panel.appendChild(elem);
                this.status = SAPO.Maps.Request.Status.ERROR;
            } else {
                this.requestDirections();
            }
        }
        try {
            this.notifyListeners(eventType, [poi, idx, page]);
        } catch (e5) {
            try {
                this.notifyListeners('error', [this, e5]);
            } catch (e6) {}
        }
    },
    unselectSearchResult: function (s, poi, idx, page) {
        try {
            this.notifyListeners('resultUnselect', [idx, page]);
        } catch (e5) {
            try {
                this.notifyListeners('error', [this, e5]);
            } catch (e6) {}
        }
    },
    pageChanged: function (s, page) {
        if (this.indexToSelect !== null) {
            if (!this.startSelected) {
                this.selectStartPOI(this.indexToSelect);
            } else {
                this.selectEndPOI(this.indexToSelect);
            }
            this.indexToSelect = null;
        }
        if (this.indexToShowDetails !== null) {
            this.selectResult(this.indexToShowDetails);
            this.indexToShowDetails = null;
        }
        try {
            this.notifyListeners('pageChanged', [page]);
        } catch (e5) {
            try {
                this.notifyListeners('error', [this, e5]);
            } catch (e6) {}
        }
    },
    completedDirections: function () {
        this.status = SAPO.Maps.Request.Status.OK;
        try {
            this.notifyListeners('complete', [this.directions]);
        } catch (e5) {
            try {
                this.notifyListeners('error', [this, e5]);
            } catch (e6) {}
        }
    },
    timeout: function () {
        this.status = SAPO.Maps.Request.Status.ERROR;
        try {
            this.notifyListeners('timeout', [this]);
        } catch (e5) {
            try {
                this.notifyListeners('error', [this, e5]);
            } catch (e6) {}
        }
    },
    itineraryNotFound: function () {
        this.status = SAPO.Maps.Request.Status.ERROR;
        try {
            this.notifyListeners('itinerarynotfound', [this]);
        } catch (e5) {
            try {
                this.notifyListeners('error', [this, e5]);
            } catch (e6) {}
        }
    },
    directionsStepSelected: function (directions, StepIdx) {
        this.selectedResult = StepIdx;
        try {
            this.notifyListeners('resultSelect', [StepIdx]);
        } catch (e5) {
            try {
                this.notifyListeners('error', [this, e5]);
            } catch (e6) {}
        }
    },
    directionsStepUnselected: function (directions, StepIdx) {
        this.selectedResult = null;
        try {
            this.notifyListeners('resultUnselect', [StepIdx]);
        } catch (e5) {
            try {
                this.notifyListeners('error', [this, e5]);
            } catch (e6) {}
        }
    },
    registerEvent: function (eventType, context, func) {
        if (!this.listeners[eventType]) {
            this.listeners[eventType] = [];
        }
        var obj = {
            func: func,
            context: context
        };
        this.listeners[eventType].push(obj);
    },
    unRegisterEvent: function (eventType, context, func) {
        var evts = this.listeners[eventType] ? this.listeners[eventType] : [];
        for (var i = 0; i < evts.length; ++i) {
            if (context == evts[i].context && func == evts[i].func) {
                evts.splice(i, 1);
                return true;
            }
        }
        return false;
    },
    notifyListeners: function (eventType, args) {
        var evts = this.listeners[eventType] ? this.listeners[eventType] : [];
        args = args ? args : [];
        var func, context;
        for (var i = 0; i < evts.length; ++i) {
            func = evts[i].func;
            context = evts[i].context;
            func.apply(context, args);
        }
    },
    EVENT_TYPES: ['startingPOIS', 'endingPOIS', 'complete', 'error', 'timeout', 'startSelected', 'endSelected', 'clean', 'canceled', 'noresults', 'itinerarynotfound', 'resultSelect', 'resultUnselect', 'pageChanged'],
    CLASS_NAME: 'SAPO.Maps.Itineraries'
});
OpenLayers.Tile.Image.prototype.destroy = function () {
    if (this.imgDiv) {
        if (this.layerAlphaHack) {
            OpenLayers.Event.stopObservingElement(this.imgDiv.childNodes[0].id);
        } else {
            OpenLayers.Event.stopObservingElement(this.imgDiv.id);
        }
        if (this.imgDiv.parentNode == this.frame) {
            this.frame.removeChild(this.imgDiv);
            this.imgDiv.map = null;
        }
        this.imgDiv.urls = null;
    }
    this.imgDiv = null;
    if ((this.frame) && (this.frame.parentNode == this.layer.div)) {
        this.layer.div.removeChild(this.frame);
    }
    this.frame = null;
    if (this.backBufferTile) {
        this.backBufferTile.destroy();
        this.backBufferTile = null;
    }
    this.layer.events.unregister("loadend", this, this.resetBackBuffer);
    OpenLayers.Tile.prototype.destroy.apply(this, arguments);
};
OpenLayers.Tile.Image.prototype.initImgDiv = function () {
    var offset = this.layer.imageOffset;
    var size = this.layer.getImageSize();
    if (this.layerAlphaHack) {
        this.imgDiv = OpenLayers.Util.createAlphaImageDiv(null, offset, size, null, "relative", null, null, null, true);
    } else {
        this.imgDiv = OpenLayers.Util.createImage(null, offset, size, null, "relative", null, null, true);
    }
    this.imgDiv.className = 'olTileImage';
    this.frame.style.zIndex = this.isBackBuffer ? 0 : 1;
    this.frame.appendChild(this.imgDiv);
    this.layer.div.appendChild(this.frame);
    if (this.layer.opacity !== null) {
        OpenLayers.Util.modifyDOMElement(this.imgDiv, null, null, null, null, null, null, this.layer.opacity);
    }
    this.imgDiv.map = this.layer.map;
    var onload = function () {
            if (this.isLoading) {
                this.isLoading = false;
                this.events.triggerEvent("loadend");
            }
        };
    if (this.layerAlphaHack) {
        OpenLayers.Event.observe(this.imgDiv.childNodes[0], 'load', OpenLayers.Function.bind(onload, this));
    } else {
        OpenLayers.Event.observe(this.imgDiv, 'load', OpenLayers.Function.bind(onload, this));
    }
    var onerror = function () {
            if (this.imgDiv) {
                if (this.imgDiv._attempts > OpenLayers.IMAGE_RELOAD_ATTEMPTS) {
                    onload.call(this);
                }
            }
        };
    OpenLayers.Event.observe(this.imgDiv, "error", OpenLayers.Function.bind(onerror, this));
};
OpenLayers.Tile.Image.prototype.renderTile = function () {
    if (!this.layer.map) {
        return;
    }
    if (!this.imgDiv) {
        this.initImgDiv();
    }
    this.imgDiv.viewRequestID = this.layer.map.viewRequestID;
    if (this.layer.url instanceof Array) {
        this.imgDiv.urls = this.layer.url.slice();
    }
    this.url = this.layer.getURL(this.bounds);
    OpenLayers.Util.modifyDOMElement(this.frame, null, this.position, this.size);
    var imageSize = this.layer.getImageSize();
    if (this.layerAlphaHack) {
        OpenLayers.Util.modifyAlphaImageDiv(this.imgDiv, null, null, imageSize, this.url);
    } else {
        OpenLayers.Util.modifyDOMElement(this.imgDiv, null, null, imageSize);
        this.imgDiv.src = this.url;
    }
    return true;
};
OpenLayers.Control.Navigation.prototype.currZoom = null;
OpenLayers.Control.Navigation.prototype.currCenter = null;
OpenLayers.Control.Navigation.prototype.wheelChange = function (evt, deltaZ) {
    if (!this.currZoom) {
        this.currZoom = this.map.getZoom();
    }
    var newZoom = this.currZoom + deltaZ;
    if (!this.map.isValidZoomLevel(newZoom)) {
        return;
    }
    var size = this.map.getSize();
    var deltaX = size.w / 2 - evt.xy.x;
    var deltaY = evt.xy.y - size.h / 2;
    var newRes = this.map.baseLayer.getResolutionForZoom(newZoom);
    var zoomPoint = this.map.getLonLatFromPixel(evt.xy);
    var newCenter = new OpenLayers.LonLat(zoomPoint.lon + deltaX * newRes, zoomPoint.lat + deltaY * newRes);
    this.currZoom = newZoom;
    this.currCenter = newCenter;
    this.initTimerToLoadTiles();
};
OpenLayers.Control.Navigation.prototype.wheelIdTimer = null;
OpenLayers.Control.Navigation.prototype.reloadTime = 100;
OpenLayers.Control.Navigation.prototype.initTimerToLoadTiles = function () {
    var _this = this;
    if (this.wheelIdTimer) {
        return;
    }
    this.wheelIdTimer = window.setTimeout(function () {
        _this.map.setCenter(_this.currCenter, _this.currZoom);
        window.clearTimeout(_this.wheelIdTimer);
        _this.wheelIdTimer = null;
        _this.currZoom = null;
    }, this.reloadTime);
};
OpenLayers.Control.Navigation.prototype.borders = null;
OpenLayers.Control.Navigation.prototype.initialize = function (options) {
    if (options && options.borders) {
        this.borders = options.borders;
    } else {
        this.borders = {
            left: 0,
            top: 0,
            bottom: 0,
            right: 0
        };
    }
    this.handlers = {};
    OpenLayers.Control.prototype.initialize.apply(this, arguments);
};
OpenLayers.Control.Navigation.prototype.defaultDblClick = function (evt) {
    var zoomPoint = this.map.getLonLatFromContainerPixel(evt.xy);
    this.map.setMapCenter(zoomPoint, this.map.zoom + 1);
    var res = this.map.baseLayer.getResolutionForZoom(this.map.zoom);
    var deltaLonLat = new OpenLayers.LonLat(((this.borders.left - this.borders.right) / 2) * res, ((this.borders.top - this.borders.bottom) / 2) * res);
    deltaLonLat.transform(new OpenLayers.Projection("EPSG:900913"), new OpenLayers.Projection("EPSG:4326"));
    var zoomPoint_corrected = new OpenLayers.LonLat(zoomPoint.lon - deltaLonLat.lon, zoomPoint.lat + deltaLonLat.lat);
    this.map.setMapCenter(zoomPoint_corrected);
};
OpenLayers.Control.Navigation.prototype.defaultDblRightClick = function (evt) {
    var zoomPoint = this.map.getLonLatFromContainerPixel(evt.xy);
    this.map.setMapCenter(zoomPoint, this.map.zoom - 1);
    var res = this.map.baseLayer.getResolutionForZoom(this.map.zoom);
    var deltaLonLat = new OpenLayers.LonLat(((this.borders.left - this.borders.right) / 2) * res, ((this.borders.top - this.borders.bottom) / 2) * res);
    deltaLonLat.transform(new OpenLayers.Projection("EPSG:900913"), new OpenLayers.Projection("EPSG:4326"));
    var zoomPoint_corrected = new OpenLayers.LonLat(zoomPoint.lon - deltaLonLat.lon, zoomPoint.lat + deltaLonLat.lat);
    this.map.setMapCenter(zoomPoint_corrected);
};
OpenLayers.Control.KeyboardDefaults.prototype.destroy = function () {
    if (this.handler) {
        this.handler.destroy();
    }
    this.handler = null;
    OpenLayers.Control.prototype.destroy.apply(this, arguments);
};
OpenLayers.Control.KeyboardDefaults.prototype.borders = null;
OpenLayers.Control.KeyboardDefaults.prototype.setFocusFunc = null;
OpenLayers.Control.KeyboardDefaults.prototype.remFocusFunc = null;
OpenLayers.Control.KeyboardDefaults.prototype.activate = function () {
    OpenLayers.Control.prototype.activate.apply(this, arguments);
    this.setFocusFunc = OpenLayers.Function.bindAsEventListener(this.setFocus, this);
    this.remFocusFunc = OpenLayers.Function.bindAsEventListener(this.remFocus, this);
    OpenLayers.Event.observe(document.body, 'click', this.remFocusFunc, false);
    OpenLayers.Event.observe(this.map.div, 'click', this.setFocusFunc, false);
};
OpenLayers.Control.KeyboardDefaults.prototype.deactivate = function () {
    OpenLayers.Control.prototype.deactivate.apply(this, arguments);
    OpenLayers.Event.stopObserving(document.body, 'click', this.remFocusFunc, false);
    OpenLayers.Event.stopObserving(this.map.div, 'click', this.setFocusFunc, false);
};
OpenLayers.Control.KeyboardDefaults.prototype.focus = true;
OpenLayers.Control.KeyboardDefaults.prototype.setFocus = function (e) {
    document.activeElement.blur();
    this.map.div.focus();
    this.focus = true;
    OpenLayers.Event.stop(e);
};
OpenLayers.Control.KeyboardDefaults.prototype.remFocus = function (e) {
    this.focus = false;
};
OpenLayers.Control.KeyboardDefaults.prototype.defaultKeyPress = function (evt) {
    if (!this.focus || document.body !== document.activeElement) {
        return;
    }
    var size = false;
    switch (evt.keyCode) {
    case OpenLayers.Event.KEY_LEFT:
        this.map.pan(-this.slideFactor, 0);
        OpenLayers.Event.stop(evt);
        break;
    case OpenLayers.Event.KEY_RIGHT:
        this.map.pan(this.slideFactor, 0);
        OpenLayers.Event.stop(evt);
        break;
    case OpenLayers.Event.KEY_UP:
        this.map.pan(0, -this.slideFactor);
        OpenLayers.Event.stop(evt);
        break;
    case OpenLayers.Event.KEY_DOWN:
        this.map.pan(0, this.slideFactor);
        OpenLayers.Event.stop(evt);
        break;
    case 33:
        size = this.map.getSize();
        this.map.pan(0, -0.75 * size.h);
        OpenLayers.Event.stop(evt);
        break;
    case 34:
        size = this.map.getSize();
        this.map.pan(0, 0.75 * size.h);
        OpenLayers.Event.stop(evt);
        break;
    case 35:
        size = this.map.getSize();
        this.map.pan(0.75 * size.w, 0);
        OpenLayers.Event.stop(evt);
        break;
    case 36:
        size = this.map.getSize();
        this.map.pan(-0.75 * size.w, 0);
        OpenLayers.Event.stop(evt);
        break;
    case 43:
    case 61:
    case 187:
    case 107:
        this.wheelChange(1);
        OpenLayers.Event.stop(evt);
        break;
    case 45:
    case 109:
    case 189:
    case 95:
        this.wheelChange(-1);
        OpenLayers.Event.stop(evt);
        break;
    }
};
OpenLayers.Control.KeyboardDefaults.prototype.wheelChange = function (deltaZ) {
    var newZoom = this.map.getZoom() + deltaZ;
    if (!this.map.isValidZoomLevel(newZoom)) {
        return;
    }
    if (!this.borders) {
        this.map.zoomTo(newZoom);
        return;
    }
    var size = this.map.getSize();
    var right = size.w - this.borders.right;
    var bottom = size.h - this.borders.bottom;
    var pixel_center_x = ((right - this.borders.left) / 2) + this.borders.left;
    var pixel_center_y = ((bottom - this.borders.top) / 2) + this.borders.top;
    var mapCenterConsideringBorders = new OpenLayers.Pixel(pixel_center_x, pixel_center_y);
    var deltaX = size.w / 2 - pixel_center_x;
    var deltaY = pixel_center_y - size.h / 2;
    var newRes = this.map.baseLayer.getResolutionForZoom(newZoom);
    var zoomPoint = this.map.getLonLatFromPixel(mapCenterConsideringBorders);
    var newCenter = new OpenLayers.LonLat(zoomPoint.lon + deltaX * newRes, zoomPoint.lat + deltaY * newRes);
    this.map.setCenter(newCenter, newZoom);
};
OpenLayers.Renderer.VML.prototype.drawLine = function (node, geometry, closeLine) {
    this.setNodeDimension(node, geometry);
    var resolution = this.getResolution();
    var numComponents = geometry.components.length;
    var parts = new Array(numComponents);
    var comp, x, y, lastx = false,
        lasty = false;
    var bounds = this.map.getExtent();
    var bounds = this.map.getExtent();
    var w = (bounds.right - bounds.left) / 2;
    var h = (bounds.top - bounds.bottom) / 2;
    bounds.left -= w;
    bounds.right += w
    bounds.top += h;
    bounds.bottom -= h;
    var prev_out = true;
    var drawAll = true;
    var comp2 = false;
    var extent = this.map.getExtent();
    for (var i = 0; i < numComponents; i++) {
        comp = geometry.components[i];
        x = (comp.x / resolution - this.offset.x);
        y = (comp.y / resolution - this.offset.y);
        if ((lastx !== false && lasty !== false) && (Math.abs(lastx - x) < 5 && Math.abs(lasty - y) < 5)) {
            continue;
        }
        if (bounds.containsLonLat({
            lon: comp.x,
            lat: comp.y
        }) == false) {
            if (!prev_out) {
                prev_out = true;
            } else {
                if (i + 1 >= numComponents) continue;
                comp2 = geometry.components[i + 1];
                if (bounds.containsLonLat({
                    lon: comp2.x,
                    lat: comp2.y
                }) == false) {
                    drawAll = false;
                    continue;
                }
            }
        } else {
            prev_out = false;
        }
        lastx = x;
        lasty = y;
        parts[i] = " " + x.toFixed() + "," + y.toFixed() + " l ";
    }
    var end = (closeLine) ? " x e" : " e";
    node.path = "m" + parts.join("") + end;
    return drawAll ? node : null;
};
OpenLayers.Renderer.SVG.prototype.getComponentsString = function (components, separator) {
    var renderCmp = [];
    var complete = true;
    var len = components.length;
    var strings = [];
    var str, component, j;
    var x = false,
        y = false,
        lastx = false,
        lasty = false;
    var resolution = this.getResolution();
    for (var i = 0; i < len; i++) {
        component = components[i];
        renderCmp.push(component);
        x = (component.x / resolution + this.left);
        y = (this.top - component.y / resolution);
        if ((lastx !== false && lasty !== false) && (Math.abs(lastx - x) < 5 && Math.abs(lasty - y) < 5)) {
            continue;
        }
        if (this.inValidRange(x, y)) {
            str = x + "," + y;
        } else {
            str = false;
        }
        if (str) {
            strings.push(str);
            lastx = x;
            lasty = y;
        } else {
            if (i > 0) {
                if (this.getShortString(components[i - 1])) {
                    strings.push(this.clipLine(components[i], components[i - 1]));
                }
            }
            if (i < len - 1) {
                if (this.getShortString(components[i + 1])) {
                    strings.push(this.clipLine(components[i], components[i + 1]));
                }
            }
            complete = false;
        }
    }
    return {
        path: strings.join(separator || ","),
        complete: complete
    };
};
OpenLayers.Handler.Click.prototype.rightclick = function (evt) {
    if (this.passesTolerance(evt)) {
        if (this.rightclickTimerId !== null) {
            this.clearTimer();
            if (this.rightclickTimerId !== null) {
                window.clearTimeout(this.rightclickTimerId);
                this.rightclickTimerId = null;
            }
            this.callback('dblrightclick', [evt]);
            return !this.stopDouble;
        } else {
            var clickEvent = this.double ? OpenLayers.Util.extend({}, evt) : this.callback('rightclick', [evt]);
            var delayedRightCall = OpenLayers.Function.bind(this.delayedRightCall, this, clickEvent);
            this.rightclickTimerId = window.setTimeout(delayedRightCall, this.delay);
        }
    }
    return !this.stopSingle;
};
(function () {
    SAPO.logReferer("http://js.sapo.pt/Bundles/SAPOMapsAPI-1.0.js", {
        s: location.hostname,
        swakt: "21BEB5BC-135C-4CCF-852B-48645361B128",
        etype: "libsapojs-maps-view"
    });
})();
SAPO.Maps.HTMLLayer = OpenLayers.Class(OpenLayers.Layer, {
    isBaseLayer: false,
    chartsOverlay: null,
    drawn: false,
    initialize: function (name, options) {
        OpenLayers.Layer.prototype.initialize.apply(this, arguments);
        this.chartsOverlay = {};
    },
    destroy: function () {},
    moveTo: function (bounds, zoomChanged, dragging) {
        OpenLayers.Layer.prototype.moveTo.apply(this, arguments);
        if (zoomChanged || !this.drawn) {
            for (var c in this.chartsOverlay) {
                this.updatePosition(this.chartsOverlay[c]);
            }
            this.drawn = true;
        }
    },
    addCharts: function (charts) {
        if (!(charts instanceof Array)) {
            charts = [charts];
        }
        var chart = false;
        for (var i = 0, len = charts.length; i < len; ++i) {
            chart = charts[i];
            this.chartsOverlay[chart.id] = chart;
            this.drawChart(chart);
            chart.setLayer(this);
        }
    },
    removeCharts: function (charts) {
        if (!charts || charts.length === 0) {
            return;
        }
        if (!(charts instanceof Array)) {
            charts = [charts];
        }
        var chart = false;
        for (var i = 0, len = charts.length; i < len; ++i) {
            chart = charts[i];
            if (!this.charts[chart.id]) {
                continue;
            }
            delete this.charts[chart.id];
            this.div.removeChild(chart._htmlElement);
            chart._htmlElement = null;
            chart._drawn = false;
            chart.removed();
        }
    },
    clearCharts: function () {
        if (this.chartsOverlay !== null) {
            for (var c in this.chartsOverlay) {
                this.removeCharts(this.chartsOverlay[c]);
            }
        }
    },
    drawChart: function (chart) {
        var lonlat = chart.getLonLat().clone().transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
        var px = this.map.getLayerPxFromLonLat(lonlat);
        var chartElement = chart.draw(px);
        if (!chart._drawn) {
            this.div.appendChild(chartElement);
            chart._htmlElement = chartElement;
            chart._drawn = true;
        }
    },
    updatePosition: function (chart) {
        var lonlat = chart.getLonLat().clone().transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
        var px = this.getViewPortPxFromLonLat(lonlat);
        chart.moveTo(px);
    },
    CLASS_NAME: 'SAPO.Maps.LayerCharts'
});
SAPO.Maps.PieChart = OpenLayers.Class({
    id: null,
    div: null,
    marginToMultiply: 5,
    raphael: null,
    chart: null,
    layer: null,
    lonlat: null,
    labels: null,
    values: null,
    chartRadius: 10,
    options: null,
    initialize: function (lonlat, labels, values, chartRadius, options) {
        this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_");
        this.options = OpenLayers.Util.extend({
            animation: 'none',
            fontOpacity: 1,
            fontOpacityToFadeIn: 1,
            fontOpacityToFadeOut: 0,
            chartSeparatorStroke: 'black',
            chartSeparatorStrokeWidth: 3,
            labelPosition: 'inner'
        }, options);
        OpenLayers.Util.extend(this, {
            lonlat: lonlat,
            labels: labels,
            values: values,
            chartRadius: chartRadius
        });
        this.div = document.createElement('div');
    },
    hide: function () {
        this.div.style.display = 'none';
    },
    show: function () {
        this.div.style.display = 'block';
    },
    getLonLat: function () {
        return this.lonlat;
    },
    getValues: function () {
        return this.values;
    },
    getLabels: function () {
        return this.labels;
    },
    getChartRadius: function () {
        return this.chartRadius;
    },
    getOptions: function () {
        return this.options;
    },
    setLonLat: function (lonlat) {
        this.lonlat = lonlat;
        if (this.layer) {
            var ll = this.lonlat.clone().transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
            var px = this.layer.getViewPortPxFromLonLat(ll);
            this.moveTo(px);
        }
    },
    setRadius: function (radius) {
        this.chartRadius = radius;
        if (this.layer) {
            this.chart.remove();
            this.layer.addCharts(this);
        }
    },
    setGraphicInformation: function (values, labels) {
        this.labels = labels;
        this.values = values;
        if (this.layer) {
            this.layer.addCharts(this);
        }
    },
    setOptions: function (options) {
        OpenLayers.Util.extend(this.options, options);
        if (this.layer) {
            this.layer.addCharts(this);
        }
    },
    moveTo: function (px) {
        var size = this.getChartRadius() * this.marginToMultiply;
        this.div.style.left = (px.x - (size / 2)) + 'px';
        this.div.style.top = (px.y - (size / 2)) + 'px';
    },
    setLayer: function (layer) {
        this.layer = layer;
    },
    removed: function () {
        this.chart.remove();
        this.layer = null;
        this.chart = null;
    },
    draw: function (px) {
        var size = this.getChartRadius() * this.marginToMultiply;

        function go() {
            this.raphael = Raphael(this.div, size, size);
            this.chart = this.raphael.pieChart(size / 2, size / 2, this.getChartRadius(), this.getValues(), this.getLabels(), this.getOptions());
        }
        window.setTimeout(go.bind(this), 0);
        this.div.style.height = size + 'px';
        this.div.style.width = size + 'px';
        this.div.style.position = 'absolute';
        this.moveTo(px);
        return this.div;
    },
    CLASS_NAME: 'SAPO.Maps.PieChart'
});
SAPO.Maps.PieChart.ChartValues = OpenLayers.Class({
    value: 0,
    color: null,
    gradient: null,
    initialize: function (obj) {
        OpenLayers.Util.extend(this, obj);
    },
    CLASS_NAME: 'SAPO.Maps.PieChart.ChartValues'
});
SAPO.Maps.PieChart.ChartLabels = OpenLayers.Class({
    label: null,
    color: null,
    fontSize: null,
    fontFamily: null,
    bold: false,
    initialize: function (obj) {
        OpenLayers.Util.extend(this, obj);
    },
    CLASS_NAME: 'SAPO.Maps.PieChart.ChartValues'
});
Raphael.fn.pieChart = function (cx, cy, r, values, labels, options) {
    if (!options) {
        options = {};
    }
    options = OpenLayers.Util.extend({
        animation: '>',
        fontOpacity: 1,
        fontOpacityToFadeIn: 1,
        fontOpacityToFadeOut: 0,
        chartSeparatorStroke: 'black',
        chartSeparatorStrokeWidth: 3,
        labelPosition: 'inner'
    }, options);
    var paper = this,
        rad = Math.PI / 180,
        chart = this.set();

    function sector(cx, cy, r, startAngle, endAngle, params) {
        var x1 = cx + r * Math.cos(-startAngle * rad),
            x2 = cx + r * Math.cos(-endAngle * rad),
            y1 = cy + r * Math.sin(-startAngle * rad),
            y2 = cy + r * Math.sin(-endAngle * rad);
        return paper.path(params, ["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]);
    }
    var angle = 0,
        total = 0,
        start = 0,
        process = function (j) {
            var value = values[j],
                angleplus = 360 * value.value / total,
                popangle = angle + (angleplus / 2),
                color = "hsb(" + start + ", 1, .5)",
                ms = 500,
                delta = 30,
                bcolor = "hsb(" + start + ", 1, 1)",
                params = {
                    stroke: options.stroke,
                    "stroke-width": options.chartSeparatorStrokeWidth
                };
            if (value.gradient) {
                params.gradient = "90-" + value.color + "-" + value.gradient;
            } else {
                if (value.color) {
                    params.fill = value.color;
                } else {
                    params.gradient = "90-" + bcolor + "-" + color;
                }
            }
            var p = sector(cx, cy, r, angle, angle + angleplus, params),
                txt = textRender(options.labelPosition, r, delta, popangle, rad, cx, cy, labels[j], options);
            if (options.animation != 'none') {
                p.mouseover(function () {
                    p.animate({
                        scale: [1.1, 1.1, cx, cy]
                    }, ms, options.animation);
                    txt.animate({
                        opacity: 1
                    }, ms);
                }).mouseout(function () {
                    p.animate({
                        scale: [1, 1, cx, cy]
                    }, ms, options.animation);
                    txt.animate({
                        opacity: 0
                    }, ms);
                });
            }
            angle += angleplus;
            chart.push(p);
            chart.push(txt);
            start += 0.1;
        };
    textRender = function (labelPosition, radius, delta, popangle, rad, cx, cy, label, commonStyle) {
        var text = false,
            extraDelta = radius / 10 + 5;
        var color = label.color ? label.color : 'black',
            opacity = commonStyle.fontOpacity,
            fontFamily = label.fontFamily,
            fontSize = label.fontSize,
            fontWeight = label.bold ? "bold" : "normal";
        switch (labelPosition) {
        case 'inner':
            text = paper.text(cx + (delta + extraDelta) * Math.cos(-popangle * rad), cy + (delta + extraDelta) * Math.sin(-popangle * rad), label.label).attr({
                fill: color,
                opacity: opacity,
                "font-family": fontFamily,
                "font-weight": fontWeight,
                "font-size": fontSize
            });
            break;
        case 'outer':
            text = paper.text(cx + (radius + delta + 55) * Math.cos(-popangle * rad), cy + (radius + delta + 25) * Math.sin(-popangle * rad), label.label).attr({
                fill: color,
                opacity: opacity,
                "font-family": fontFamily,
                "stroke-width": fontWeight,
                "font-size": fontSize
            });
            break;
        }
        return text;
    };
    for (var i = 0, ii = values.length; i < ii; i++) {
        total += values[i].value;
    }
    for (var j = 0; j < ii; j++) {
        process(j);
    }
    return chart;
};