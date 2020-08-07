class Contact {
  constructor(firstName, lastName, phone, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.email = email;
    this.id = String(Date.now());
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

  static updateContact(updatedContact) {
    const contacts = Storage.getContacts();

    contacts.forEach((contact, index) => {
      if(contact.id === updatedContact.id){
        contacts.splice(index, 1, updatedContact);
      }
    });

    localStorage.setItem('contacts', JSON.stringify(contacts));
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

  updateContact(updatedContact) {
    // tr?
    const contactItems = document.querySelectorAll('.contact-item');
    // ?
    // contactItems = Array.from(contactItems);

    contactItems.forEach(contact => {
      const itemID = document.getElementById('id').value; 
      console.log(itemID);
        if(itemID === updatedContact.id) {
          console.log(true);
          
          // OVO RADI
          contact.firstName = updatedContact.firstName;
          contact.lastName = updatedContact.lastName;
          contact.phone = updatedContact.phone;
          contact.email = updatedContact.email;
          contact.id = updatedContact.id;          


          // contact.innerHTML = `
          //   <td>${updatedContact.firstName}</td>
          //   <td>${updatedContact.lastName}</td>
          //   <td>${updatedContact.phone}</td>
          //   <td>${updatedContact.email}</td> 
          //   <td>
          //     <a href="#" class="edit card-link" id="${updatedContact.id}"><i class="fa fa-pencil"></i></a>
          //     <a href="#" class="delete card-link" id="${updatedContact.id}"><i class="fa fa-remove"></i></a>
          //   </td>
          // `;
        }
    });
   
  }

  showContacts() {
    let output = '';
    const contacts = Storage.getContacts();
    contacts.forEach(contact => {
      output += `
        <tr class="contact-item">
          <td>${contact.firstName}</td>
          <td>${contact.lastName}</td>
          <td>${contact.phone}</td>
          <td>${contact.email}</td> 
          <td>
            <a href="#" class="edit card-link" id="${contact.id}"><i class="fa fa-pencil"></i></a>
            <a href="#" class="delete card-link" id="${contact.id}"><i class="fa fa-remove"></i></a>
          </td>
        </tr>
    `;
    });
    const tableList = document.getElementById('contact-list');
    tableList.innerHTML = output;
  }

  // populateUI() {
  //   const contacts = Storage.getContacts();

  //   contacts.forEach(contact => {
  //     const tableList = document.getElementById('contact-list');
  //     console.log(tableList)
  //     const row = document.createElement('tr');
  //     row.className = 'contact-item';
  //     row.innerHTML = `
  //       <td>${contact.firstName}</td>
  //       <td>${contact.lastName}</td>
  //       <td>${contact.phone}</td>
  //       <td>${contact.email}</td> 
  //       <td>
  //         <a href="#" class="edit card-link" id="${contact.id}"><i class="fa fa-pencil"></i></a>
  //         <a href="#" class="delete card-link" id="${contact.id}"><i class="fa fa-remove"></i></a>
  //       </td>
  //     `;
  
  //     tableList.appendChild(row);
  //   })
  // }
  
  
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

  clearEditState() {
    document.getElementById('contact-submit').style.display = 'block';
    document.getElementById('cancel').style.display = 'none';
    document.getElementById('contact-update').style.display = 'none';
  }

  validateEmail() {
    const email = document.getElementById('email').value;
    const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

    return re.test(email);
  }

  validatePhone(){
    const phone = document.getElementById('phone').value;
    const re = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

    return re.test(phone);
  }

  fillForm(data) {
    document.getElementById('firstname').value = data.firstName;
    document.getElementById('lastname').value = data.lastName;
    document.getElementById('phone').value = data.phone;
    document.getElementById('email').value = data.email;
    document.getElementById('id').value = data.id;    
  }

  editState() {
    document.getElementById('contact-submit').style.display = 'none';
    document.getElementById('cancel').style.display = 'block';
    document.getElementById('contact-update').style.display = 'block';
  }
  
  // changeFormState(type) {
  //   contactSubmit = document.getElementById('contact-submit');

  //   if(type === 'edit') {
  //     this.contactSubmit.textContent = 'Update Contact';
  //     this.contactSubmit.className = 'contact-submit btn btn-warning btn-block';

  //     // Create cancel button
  //     const button = document.createElement('button');
  //     button.className = 'contact-cancel btn btn-light btn-block';
  //     button.appendChild(document.createTextNode('Cancel Edit'));

  //     // Get parent
  //     const contactForm = document.querySelector('.contact-form');
  //     // Get element to insert before
  //     const formEnd = document.querySelector('.form-end');
  //     // Insert cancel button
  //     contactForm.insertBefore(button, formEnd);
  //   } else {
  //     this.contactSubmit.textContent = 'Post It';
  //     this.contactSubmit.className = 'contact-submit btn btn-primary btn-block';
  //     // Remove cancel btn if it is there
  //     if(document.querySelector('.contact-cancel')) {
  //       document.querySelector('.contact-cancel').remove();
  //     }
  //     // Clear ID from hidden field
  //     this.clearIdInput();
  //     // Clear text
  //     this.clearFields();
  //   }
  // }

  // clearIdInput() {
  //   document.getElementById('id').value = '';
  // }
}



// Event listener for add contact
document.getElementById('contact-submit').addEventListener('click', function(e) {
  const firstName = document.getElementById('firstname').value;
  const lastName = document.getElementById('lastname').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const id = document.getElementById('id').value;

  const contact = new Contact(firstName, lastName, phone, email, id);
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






// Event listener for delete
document.getElementById('contact-list').addEventListener('click',  e => {
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



// Event listener for search/filter
document.getElementById('filter').addEventListener('keyup',  e => {
  const text = e.target.value.toLowerCase();
  let contactItems = document.querySelectorAll('#contact-list tr');

  contactItems = Array.from(contactItems);

  contactItems.forEach(function(contact) {
    const item = contact.textContent;
    if(item.toLowerCase().indexOf(text) !=-1){
      contact.style.display = '';
    } else {
      contact.style.display = 'none';
    }
  })
});



//  PROBATI PREPRAVITI FOR FUN DA PREPOZNAJE CIJELI KONAKT
// document.getElementById('filter').addEventListener('keyup', filterContacts);

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


// Edit state
document.getElementById('contact-list').addEventListener('click', e => {
  const ui = new UI();

  if(e.target.parentElement.classList.contains('edit')) {
    const firstName = e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
    const lastName = e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
    const phone = e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.textContent;
    const email = e.target.parentElement.parentElement.previousElementSibling.textContent;
    const id = e.target.parentElement.id;
    
    const data = {
      firstName,
      lastName,
      phone,
      email,
      id
    }

    ui.fillForm(data);
    ui.editState();
    console.log(data.id);
  }

  e.preventDefault();
});

// Cancel button
document.getElementById('cancel').addEventListener('click', e => {
  const ui = new UI();
  ui.clearFields();
  ui.clearEditState();

  e.preventDefault();
});


// Update button
document.getElementById('contact-update').addEventListener('click', e => {
  const ui = new UI();

  const firstName = document.getElementById('firstname').value;
  const lastName = document.getElementById('lastname').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const id = document.getElementById('id').value;

  const updatedContact = {
    firstName,
    lastName,
    phone,
    email,
    id
  }


  if (firstName === '' && lastName === '' && phone === '' && email === '') {
    ui.showAlert('Please fill in any field', 'alert alert-danger');
  } else {
      if ((ui.validateEmail(email) === true || email === '') && (ui.validatePhone(phone) === true || phone === '')) {
        ui.updateContact(updatedContact);    
        Storage.updateContact(updatedContact);
        ui.showContacts();
        ui.showAlert('Contact updated!', 'alert alert-success');
        ui.clearFields();
        ui.clearEditState(); 
      } else {
        ui.showAlert('Please enter a valid email or phone format', 'alert alert-danger');
      }      
    }

  e.preventDefault();
});


// Sort contacts
document.getElementById('sort').addEventListener('click', e => {
  const ui = new UI();

  const contacts = Storage.getContacts();
  console.log(contacts)
  
  contacts.sort((a, b) => {
    const firstNameA = a[firstName].toLowerCase();
    const firstNameB = b[firstName].toLowerCase();
    if(firstNameA < firstNameB) {
      return -1;
    } 
    if(firstNameA > firstNameB) {
      return 1;
    }
    return 0;
  });
   
  ui.showContacts();

  e.preventDefault();
});

// DOM load event
document.addEventListener('DOMContentLoaded', Storage.displayContacts);
