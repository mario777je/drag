document.addEventListener('DOMContentLoaded', function () {
    const draggables = document.querySelectorAll('.draggable-shape');
    const droppables = document.querySelectorAll('.droppable-shape');
    const pentagon=document.querySelector("#pentagon")
    let shapesRemaining = draggables.length;
    const messageElement = createMessageElement('');  // Create the message element at the start


    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });

    droppables.forEach(droppable => {
        droppable.addEventListener('dragover', dragOver);
        droppable.addEventListener('dragleave', dragLeave);
        droppable.addEventListener('drop', drop);
    });

    function dragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.id);
        setElementStyle(event.target);  // Apply styles during drag start
    }

    function dragOver(event) {
        event.preventDefault();
        pentagon.style.clipPath ='polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)'
    }

    function dragLeave(event) {
        event.preventDefault();
        const dropzone = event.target;
        resetDroppableSize(dropzone);
    }

    function drop(event) {
        event.preventDefault();
        const id = event.dataTransfer.getData('text');
        const draggableElement = document.getElementById(id);
        const dropzone = event.target;

        if (dropzone.dataset.id === draggableElement.id) {
            dropzone.replaceWith(draggableElement);
            shapesRemaining--;

            if (draggableElement.id === 'octagon') {
                draggableElement.style.boxShadow = 'none';
            }

            if (shapesRemaining === 0) {
                document.querySelector('aside .draggable-section').innerHTML = '<p>You Win!</p>';
            }

            displayMessage('Correct!', 'main', 'black');
        } else {
            displayMessage('Try Again!', 'main', 'red');
        }

        resetElementStyle(draggableElement);  // Reset styles after drop
    }

    function setElementStyle(element) {
        const id = element.id;
        if (id === 'triangle') {
            element.style.clipPath = 'polygon(50% 0%, 100% 100%, 0% 100%)';
        } else if (id === 'circle') {
            element.style.clipPath = 'circle(50%)';
        } else if (id === 'diamond') {
            element.style.clipPath = 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
        } else if (id === 'pentagon') {
            element.style.clipPath = 'polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)';
        } else {
            element.style.clipPath = 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)';
        }
    }

    function resetElementStyle(element) {
        element.style.clipPath = '';  // Reset clip-path after drop
    }

    function resetDroppableSize(element) {
        element.style.width = '70px';
        element.style.height = '70px';
    }

    function createMessageElement(text) {
        const main = document.querySelector('main');
        const messageElement = document.createElement('h2');
        messageElement.textContent = text;
        main.appendChild(messageElement);
        return messageElement;
    }

    function displayMessage(text, parentSelector, color) {
        messageElement.textContent = text;
        messageElement.style.color = color;
        setTimeout(() => {
            messageElement.textContent = '';
        }, 3000);
    }
});
