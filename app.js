class Contact {
  constructor(firstName, lastName, phone, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.email = email;
  }
}



class UI {
  addContactToList(contact) {
    const tableList = document.getElementById('contact-list');
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${contact.firstName}</td>
      <td>${contact.lastName}</td>
      <td>${contact.phone}</td>
      <td>${contact.email}</td> 
      <td>
          <a href="#" class="edit card-link"><i class="fa fa-pencil"></i></a>
          <a href="#" class="delete card-link"><i class="fa fa-remove"></i></a>
      </td>
    `;

    tableList.appendChild(row);
  }

  showAlert(message, className) {
    const div = document.createElement('div');
    div.className = className;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.contactContainer');
    const banana = document.querySelector('#contact-form');
    container.insertBefore(div, banana);

    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  deleteContact(target) {
    target.parentElement.parentElement.parentElement.remove();
  }

  clearFields() {
    document.getElementById('firstname').value = '';
    document.getElementById('lastname').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';
  }
}




class Storage {
  static getContacts() {

  }

  static displayContacts() {

  }

  static addContact() {

  }

  static removeContact() {

  }
}




// Event listener for add contact
document.getElementById('contact-submit').addEventListener('click', function(e) {
  const firstName = document.getElementById('firstname').value;
  const lastName = document.getElementById('lastname').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;

  const contact = new Contact(firstName, lastName, phone, email);
  const ui = new UI();

  if (firstName, lastName, phone, email === '') {
    ui.showAlert('Please fill in any field', 'alert alert-danger');
  } else {
    ui.addContactToList(contact);
    ui.showAlert('Contact Added!', 'alert alert-success');
    ui.clearFields();
  }

  e.preventDefault();
});



// Event listener for delete
document.getElementById('contact-list').addEventListener('click', function(e) {
  const ui = new UI();
  if (e.target.parentElement.classList.contains('delete')) {
    ui.deleteContact(e.target);
    ui.showAlert('Contact Deleted!', 'alert alert-success');
  }
  
  e.preventDefault();
});