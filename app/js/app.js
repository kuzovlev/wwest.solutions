(function() {
   'use strict';

   // Bootstrap validation script start //
   window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
         form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
               event.preventDefault();
               event.stopPropagation();
            }
            form.classList.add('was-validated');
         }, false);
      });
   }, false);
   // Bootstrap validation script end //

   document.querySelector('.navbar-toggler').addEventListener('click', (e)=>{
      const menuSelector = e.currentTarget.getAttribute('data-target');
      document.querySelector(menuSelector).classList.toggle('show');
   });

   const dropdownButtons = Array.from(document.getElementsByClassName('btn__dropdown'));
   dropdownButtons.forEach((item)=>{
      item.addEventListener('click', (e)=>{
         let shownItems = dropdownButtons.filter((item) => item.classList.contains('show'));
         const targetItem = e.target.getAttribute('id');
         const dropdownMenu = item.nextElementSibling;
         dropdownMenu.style.width = item.offsetWidth+'px';
         document.getElementById(targetItem).classList.toggle('show');
         shownItems.length > 0 ? shownItems[0].classList.remove('show') : null;
      });
   });

   const sortingButton = document.getElementById("sorting-button");
   sortingButton.addEventListener('click', ()=>{
      document.querySelector('.sort-options').classList.toggle('show');
   });

   const sortingOptions = Array.from(document.querySelectorAll('.sort-options li'));
   let chosenOption = sortingOptions.filter(item=>item.classList.contains('chosen'));
   sortingOptions.forEach(item=>{
      item.addEventListener('click', (e)=>{
         e.preventDefault();
         const optionText = e.target.innerText;
         const optionSort = e.target.getAttribute('data-sort');
         sortingButton.setAttribute('data-sort', optionSort);
         sortingButton.innerText = optionText;
         chosenOption[0].classList.toggle('chosen');
         chosenOption[0] = e.currentTarget;
         e.currentTarget.classList.toggle('chosen');
         document.querySelector('.sort-options').classList.toggle('show');
      });
   });

   const accordionBlock = document.getElementById('accordionQuestion');
   accordionBlock.addEventListener('click', function(e) {
      const items = document.querySelectorAll('.accordion-item');
      const target = e.target.closest('.accordion-item');
      if (e.target.tagName === "BUTTON") {
         if (!target.classList.contains('shown-item')) {
            Array.from(items).forEach(item => {
               item.classList.remove('shown-item')
            });
            target.classList.add('shown-item');

         } else {
            target.classList.remove('shown-item');
         }
      }
   });

   const manufacturer = new Set(Array.from(document.querySelectorAll('.card-body h6')).map(item=>{
      return item.textContent.slice(4).match(/(\w+)/)[0];
   }));

   function getElementsToFilter (element = "") {
      return new Set(Array.from(document.querySelectorAll('.card-body h6 .' + element)).map(item => {
         return item.innerText;
      }));
   }
   const years = getElementsToFilter('year');
   const models = getElementsToFilter('model');

   const fillDropdowns = (element, content) => {
      const dropdown = document.querySelector('.dropdown.'+element).querySelector('.dropdown-menu');
      content.forEach(item=>{
         dropdown.insertAdjacentHTML('afterbegin', `<li><a class="dropdown-item" href="#">${item}</a></li>`)
      });
   };

   fillDropdowns('make', manufacturer);
   fillDropdowns('year', years);
   fillDropdowns('model', models);
})();