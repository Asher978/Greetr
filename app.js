/**
 * set language
 * grab the login click button
 * onClick event set greeting on the h1 selector
 */
$("#login").click(function () {
  const loginGrtr = G$("Ash", "S");
  $("#logindiv").hide();
  loginGrtr
    .setLang($("#lang").val())
    .generateHtmlGreeting("#greeting", true)
    .log();
});
