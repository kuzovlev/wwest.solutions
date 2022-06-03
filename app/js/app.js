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
   })

})();