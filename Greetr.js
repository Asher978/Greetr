(function (global, $) {
  // 'new' an object
  var Greetr = function (firstName, lastName, language) {
    return new Greetr.init(firstName, lastName, language);
  };

  /**
   * variables hidden within the scope of IIFE
   */

  // supported Languages
  const supportedLangs = ["en", "es"];

  // informal greetings
  const greetings = {
    en: "Hello",
    es: "Hola",
  };

  // formal greetings
  const formGreetings = {
    en: "Greetings",
    es: "Saludos",
  };

  // logger messages
  const logMessages = {
    en: "Logged in",
    es: "Inició sesión",
  };

  /**
   * Greetr prototype methods
   */
  Greetr.prototype = {
    /**
     * @returns string - full name
     */
    fullName: function () {
      return this.firstName + " " + this.lastName;
    },
    /**
     * checks if language is supported in `supportedLangs` array
     */
    validate: function () {
      if (supportedLangs.indexOf(this.language) === -1) {
        throw "Invalid Language!";
      }
    },

    /**
     *
     * @returns string - joins greeting and first name
     */
    greeting: function () {
      return greetings[this.language] + " " + this.firstName + "!";
    },

    /**
     *
     * @returns string - Formal greeting with full name
     */
    formalGreeting: function () {
      return formGreetings[this.language] + ", " + this.fullName() + "!";
    },

    /**
     *
     * @param {Boolean} formal
     * @returns greeting based on the boolean
     */
    greet: function (formal) {
      var msg;

      if (formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }

      if (console) {
        console.log(msg);
      }

      return this;
    },
    log: function () {
      if (global.console) {
        global.console.log(logMessages[this.language] + ": " + this.fullName());
      }
      return this;
    },
    setLang: function (lang) {
      this.language = lang;
      this.validate();
      return this;
    },

    /**
     *
     * @param {HTMLElementEventMap} domSelector
     * @param {Boolean} formal
     * @returns
     *
     * creates the greeting based on boolean and insert
     * into the DOM selector
     */
    generateHtmlGreeting: function (domSelector, formal) {
      // throw an error if jQuery isn't present
      if (!$) throw "jQuery not loaded!";

      // throw an error if jQuery selector isn't present
      if (!domSelector) throw "Missing jQuery Selector!";

      /**
       * create msg string based on formal boolean
       * TODO: re-factor this to a private fn
       */
      let msg;
      if (formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }

      // insert greeting into the dom selector
      $(domSelector).html(msg);

      return this;
    },
  };
  /**
   *
   * @param {String} firstName
   * @param {String} lastName
   * @param {String} language
   * creation of the actual object, allowing to 'new' an object
   * without calling the 'new' keyword
   */
  Greetr.init = function (firstName, lastName, language) {
    var self = this;
    self.firstName = firstName || "";
    self.lastName = lastName || "";
    self.language = language || "en";

    // validate if the language passed in the arguments is supported
    self.validate();
  };

  // trick borrowed from jQuery to avoid using the `new` keyword
  Greetr.init.prototype = Greetr.prototype;

  // attach Greetr to the global (window) & provide a shorthand
  // `$G()` to ease our poor fingers
  global.Greetr = global.G$ = Greetr;
})(window, jQuery);
