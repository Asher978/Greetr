(function (global, $) {
  var Greetr = function (firstName, lastName, language) {
    return new Greetr.init(firstName, lastName, language);
  };

  /**
   * variables not exposed outside
   */
  const supportedLangs = ["en", "es"];
  const greetings = {
    en: "Hello",
    es: "Hola",
  };
  const formGreetings = {
    en: "Greetings",
    es: "Saludos",
  };
  const logMessages = {
    en: "Logged in",
    es: "Inició sesión",
  };

  /**
   * Greetr prototype methods
   */
  Greetr.prototype = {
    /**
     *
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
    log: function (console) {
      if (console) {
        console.log(logMessages[this.language] + ": " + this.fullName());
      }

      return this;
    },
    setLang: function (lang) {
      this.language = lang;
      this.validate();
      return this;
    },
  };

  Greetr.init = function (firstName, lastName, language) {
    var self = this;
    self.firstName = firstName || "";
    self.lastName = lastName || "";
    self.language = language || "en";
  };

  Greetr.init.prototype = Greetr.prototype;
  global.Greetr = global.G$ = Greetr;
})(window, jQuery);
