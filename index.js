// list of all invocies
let invoices = new Array();
// list of invoices being displayed
let displayInvoices = new Array();
// an invoice object to display
class Invoice {
  recipient;
  amount;
  date;
  amValid;
  constructor(data) {
    if (!data) return;
    this.recipient = data.get("recipient");
    this.amount = data.get("amount");
    this.date = data.get("date");
    this.amValid = () => isValid(this);
  }
}
// a validation function to be used by the invoices
const isValid = (i) => {
  //require all fields to be present
  return i.recipient && i.amount && i.date;
};
// add a new invoice to our list
function addInvoice() {
  //get the data about the invoice
  const data = new FormData(document.getElementById("addInvoiceForm"));
  //make sure that all the requiured data is present

  //add the new invoice to the list
  ifValidPush(new Invoice(data), (i) => invoices.push(i));
  displayInvoices = Array.from(invoices);
  //refresh the list
  refreshList();
  clearAddInvoiceForm();
}
// clear the new invoice form
function clearAddInvoiceForm() {
  const form = document.getElementById("addInvoiceForm");
  Array.from(form.children).forEach((c) =>
    c.type == "submit" ? "" : (c.value = "")
  );
}
// A function the validates the invoice before pushing it to the array.
function ifValidPush(invoice, push) {
  // if the invoice is valid we add it
  if (invoice.amValid()) push(invoice);
  else alert("something is missing from the new invoice");
}

// A function that orders the list by specific fields
function orderBy(fieldName) {
  console.log("ordering");
  switch (fieldName) {
    case "recipient":
      // create a new array object from the ordered list
      displayInvoices = Array.from(
        //order the invoices by comparing the first letter of the recipient
        displayInvoices.sort((a, b) =>
          a.recipient.toLowerCase()[0] < b.recipient.toLowerCase()[0] ? -1 : 1
        )
      );
      break;
    case "amount":
      // order the list by comparing the amounts
      displayInvoices = Array.from(
        invoices.sort((a, b) => b.amount - a.amount)
      );
      break;
    case "date":
      displayInvoices = Array.from(
        // order the list by comparing the dates
        displayInvoices.sort((a, b) => new Date(a.date) - new Date(b.date))
      );
      break;
  }
  // refresh the list being displayed
  refreshList();
}

refreshList = () => {
  //Remove all existing invoices from list
  Array.from(document.getElementsByClassName("invoice-list-item")).forEach(
    (e) => e.remove()
  );
  // Get the list of invoices
  const list = document.getElementById("invoice-list");
  //Add new items to the list for each invoice to be displayed
  displayInvoices.forEach((i) => {
    list.appendChild(getInvoiceItem(i));
  });
};

// Gets a new invoice item element to be displayed in out html list
getInvoiceItem = (invoice) => {
  // create the container div
  const div = document.createElement("div");
  div.classList.add("invoice-list-item");

  // create the recipient paragraph
  const recipientP = document.createElement("p");
  recipientP.appendChild(document.createTextNode(invoice.recipient));

  // create the amount paragraph
  const amountP = document.createElement("p");
  amountP.appendChild(document.createTextNode(invoice.amount));

  // create the date paragraph
  const dateP = document.createElement("p");
  dateP.appendChild(document.createTextNode(invoice.date));

  // add all the paragraphs to the div
  div.appendChild(recipientP);
  div.appendChild(amountP);
  div.appendChild(dateP);
  return div;
};

// Filter the list to only the most expensive invoice
function showMostExpensive() {
  displayInvoices = new Array();
  if (invoices.sort((a, b) => b.amount - a.amount)[0])
    displayInvoices.push(invoices.sort((a, b) => b.amount - a.amount)[0]);
  refreshList();
}
// filter the invoices based on recipient name
function filterInvoices() {
  var value = document.getElementById("filterByRecipient").value;
  if (!value) return;
  displayInvoices = Array.from(
    invoices.filter((i) =>
      i.recipient.toLowerCase().includes(value.toLowerCase())
    )
  );
  refreshList();
}

// clear all filters and show all invoices.
function clearFilter() {
  displayInvoices = Array.from(invoices);
  refreshList();
}

// load some invoices into the list when the dom is ready
window.addEventListener("DOMContentLoaded", (event) => {
  invoices.push({
    recipient: "Brynja",
    amount: 1,
    date: "2021-10-30",
  });
  invoices.push({
    recipient: "Andri",
    amount: 3,
    date: "2021-10-31",
  });
  invoices.push({
    recipient: "Charlize",
    amount: 2,
    date: "2021-10-29",
  });
  displayInvoices = Array.from(invoices);
  refreshList();
});
