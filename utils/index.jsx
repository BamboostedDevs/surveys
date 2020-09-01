const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

/* 

Example dictionary - single survey

Property "type":
    ["text","textArea", "number", "date", "choise", "multipleChoice"];

*/

const example = {
  title: "Example survey",
  description:
    "This is just a simple example survey showing all possible inputs.",
  form: [
    {
      title: "What is your email address?",
      type: "text",
      description: "email",
    },
    {
      title: "What do u like to do in your free time?",
      type: "textArea",
    },
    {
      title: "Fav number?",
      type: "number",
    },
    {
      title: "Bday?",
      type: "date",
    },
    {
      title: "Do u like fish?",
      type: "choice",
      options: ["Yes", "No"],
    },
    {
      title: "What do u like?",
      type: "multipleChoice",
      options: ["Cars", "Sport", "Coffe", "Life"],
    },
    {
      title: "What do u like?",
      type: "multipleChoice",
      options: ["Cars", "Sport", "Coffe", "Life"],
    },
    {
      title: "What do u like?",
      type: "multipleChoice",
      options: ["Cars", "Sport", "Coffe", "Life"],
    },
    {
      title: "What do u like?",
      type: "multipleChoice",
      options: ["Cars", "Sport", "Coffe", "Life"],
    },
    {
      title: "What do u like?",
      type: "multipleChoice",
      options: ["Cars", "Sport", "Coffe", "Life"],
    },
    {
      title: "What do u like?",
      type: "multipleChoice",
      options: ["Cars", "Sport", "Coffe", "Life"],
    },
  ],
};

const copy = (payload) => {
  navigator.clipboard.writeText(payload);
};

export const validateEmail = (email) => {
  const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  return expression.test(String(email).toLowerCase());
};

export { capitalize, example, copy };
