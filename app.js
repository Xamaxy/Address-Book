class Contact {
  constructor(firstName, lastName, phone, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.email = email;
    this.id = String(Date.now());
  }  
}



class UI {
  addContactToList(contact) {
    const tableList = document.getElementById('contact-list');
    const row = document.createElement('tr');
    row.className = 'contact-item';
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

  validateEmail() {
    const email = document.getElementById('email').value;
    const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

    return re.test(email);
  
    // if(!re.test(email)){
    //   return 1;
    // } else {
    //   this.showAlert('Please enter a valid email format', 'alert alert-danger');
    // }
  }

  validatePhone(){
    const phone = document.getElementById('phone').value;
    const re = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

    return re.test(phone);
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

  static removeContact(id) {    
    const contacts = Storage.getContacts();

    contacts.forEach((contact, index) => {
      if(contact.id === id) {
        contacts.splice(index, 1);
      }
    });

    localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  // Option B for removal
  // static removeContact(contactItem) {
  //   const newcontactList = Storage.getContacts().filter( contact => contact.id.toString() !== contactItem.toString())

  //   localStorage.setItem('contacts', JSON.stringify(contacts));
  // }

}



// Event listener for add contact
document.getElementById('contact-submit').addEventListener('click', function(e) {
  const firstName = document.getElementById('firstname').value;
  const lastName = document.getElementById('lastname').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;

  const contact = new Contact(firstName, lastName, phone, email);
  const ui = new UI();

  if (firstName === '' && lastName === '' && phone === '' && email === '') {
    ui.showAlert('Please fill in any field', 'alert alert-danger');
  } else {
      if ((ui.validateEmail(email) === true || email === '') && (ui.validatePhone(phone) === true || phone === '')) {
        ui.addContactToList(contact);
        Storage.addContact(contact);
        ui.showAlert('Contact Added!', 'alert alert-success');
        ui.clearFields();  
      } else {
        ui.showAlert('Please enter a valid email or phone format', 'alert alert-danger');
      }      
    }

  e.preventDefault();
});



// // Event listener for add contact
// document.getElementById('contact-submit').addEventListener('click', function(e) {
//   const firstName = document.getElementById('firstname').value;
//   const lastName = document.getElementById('lastname').value;
//   const phone = document.getElementById('phone').value;
//   const email = document.getElementById('email').value;

//   const contact = new Contact(firstName, lastName, phone, email);
//   const ui = new UI();

//   if (firstName === '' && lastName === '' && phone === '' && email === '') {
//     ui.showAlert('Please fill in any field', 'alert alert-danger');
//   } else {
//     if(ui.validateEmail(email) === true || email === '') {
//       ui.addContactToList(contact);
//       Storage.addContact(contact);
//       ui.showAlert('Contact Added!', 'alert alert-success');
//       ui.clearFields();      
//     } else { 
//       // if(ui.validateEmail(email) === false)      
//       ui.showAlert('Please enter a valid email format', 'alert alert-danger');
//     }
//   }

//   e.preventDefault();
// });




// Event listener for delete
document.getElementById('contact-list').addEventListener('click', function(e) {
  const ui = new UI();

  if (e.target.parentElement.classList.contains('delete')) {    
    if(confirm('Are you sure?')) {
      ui.deleteContact(e.target);
      Storage.removeContact(e.target.parentElement.id);
      ui.showAlert('Contact Deleted!', 'alert alert-success');      
    }
  }
  
  e.preventDefault();
});



// DOM load event
document.addEventListener('DOMContentLoaded', Storage.displayContacts);



// Event listener for search
document.getElementById('filter').addEventListener('keyup', filterContacts);

function filterContacts(e) {
  const text = e.target.value.toLowerCase();
  const tableList = document.getElementById('contact-list');
  const tr = tableList.getElementsByTagName('tr');

  for ( i = 0; i < tr.length; i++ ) {
    // let td, txtValue;
    td = tr[i].getElementsByTagName('td')[0];
    txtValue = td.textContent || td.innerText;
    if (txtValue.toLowerCase().indexOf(text) > -1) {
      console.log(td);
      tr[i].style.display = '';
    } else {
      tr[i].style.display = 'none';
    }
  }
}







// OVO RADI na firstname zbog [0]
// function filterContacts(e) {
//   const text = e.target.value.toLowerCase();
//   const tableList = document.getElementById('contact-list');
//   const tr = tableList.getElementsByTagName('tr');

//   for ( i = 0; i < tr.length; i++ ) {
//     // let td, txtValue;
//     td = tr[i].getElementsByTagName('td')[0];
//     txtValue = td.textContent || td.innerText;
//     if (txtValue.toLowerCase().indexOf(text) > -1) {
//       console.log(td);
//       tr[i].style.display = '';
//     } else {
//       tr[i].style.display = 'none';
//     }
//   }
// }