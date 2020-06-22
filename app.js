class Contact {
  constructor(firstName, lastName, phone, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.email = email;
    this.id = Contact.incrementId()
  }  

  static incrementId() {
    if (!this.latestId) this.latestId = 1;
    else this.latestId++
    return this.latestId
 }
}



class UI {
  addContactToList(contact) {
    const tableList = document.getElementById('contact-list');
    const row = document.createElement('tr');
    row.id = `${contact.id}`;
    // row.className = 'list';
    row.innerHTML = `
      <td>${contact.firstName}</td>
      <td>${contact.lastName}</td>
      <td>${contact.phone}</td>
      <td>${contact.email}</td> 
      <td>
          <a href="#" class="edit card-link" id="${contact.id}"><i class="fa fa-pencil"></i></a>
          <a href="#" class="delete card-link" id="${contact.id}"><i class="fa fa-remove"></i></a>
      </td>
    `;

    // let ID;
    // if(contact.length > 0) {
    //   ID = contact[contact.length -1].id + 1;
    // } else {
    //   ID = 0;
    // }

    // let ID = document.getElementsByClassName('test');
    // for (let i = 0; i <ID.length; i++) {
    //   ID[i].id = `${contact.id}` + (i + 1);
    // }

    tableList.appendChild(row);
  }

  showAlert(message, className) {
    const div = document.createElement('div');
    div.className = className;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.contactContainer');
    const form = document.querySelector('#contact-form');
    container.insertBefore(div, form);

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
    let contacts;
    if(localStorage.getItem('contacts') === null) {
      contacts = [];
    } else {
      contacts = JSON.parse(localStorage.getItem('contacts'));
    }

    return contacts;
  }

  static displayContacts() {
    const contacts = Storage.getContacts();

    contacts.forEach((contact) => {
      const ui = new UI;

      ui.addContactToList(contact);
    });
  }

  static addContact(contact) {
    const contacts = Storage.getContacts();

    contacts.push(contact);

    localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  static removeContact(contactItem) {
    console.log(contactItem);
    const contacts = Storage.getContacts();

    contacts.forEach((contact, index) => {
      if(contact.contactItem === contactItem) {
        contacts.splice(index, 1);
      }
    });

    localStorage.setItem('contacts', JSON.stringify(contacts));
  }
}





// Event listener for add contact
document.getElementById('contact-submit').addEventListener('click', function(e) {
  const firstName = document.getElementById('firstname').value;
  const lastName = document.getElementById('lastname').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  // const id = document.getElementById('id').value;

  const contact = new Contact(firstName, lastName, phone, email);
  const ui = new UI();

  if (firstName === '' && lastName === '' && phone === '' && email === '') {
    ui.showAlert('Please fill in any field', 'alert alert-danger');
  } else {
    ui.addContactToList(contact);
    Storage.addContact(contact);
    ui.showAlert('Contact Added!', 'alert alert-success');
    ui.clearFields();
  }

  e.preventDefault();
});



// Event listener for delete
document.getElementById('contact-list').addEventListener('click', function(e) {
  const ui = new UI();

  if (e.target.parentElement.classList.contains('delete')) {
    if(confirm('Are you sure?')) {
      ui.deleteContact(e.target);
      Storage.removeContact(e.target.parentElement.parentElement.parentElement.id.textContent);
      ui.showAlert('Contact Deleted!', 'alert alert-success');      
    }
  }
  
  e.preventDefault();
});


// DOM load event
document.addEventListener('DOMContentLoaded', Storage.displayContacts);