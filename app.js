"use strict";

class TaskList {
  constructor() {
    this.taskNumber = 0;
    document
      .querySelector("#task-form")
      .addEventListener("submit", this.addTaskToList.bind(this));
    document
      .querySelector(".collection")
      .addEventListener("click", this.removeTask.bind(this));
    document
      .querySelector(".clear-tasks")
      .addEventListener("click", this.clearTasks.bind(this));
    document
      .querySelector("#filter")
      .addEventListener("input", this.filterTasks.bind(this));
    window.addEventListener("DOMContentLoaded", this.getItemsFromLocalStorage);
  }

  addTaskToList(e) {
    e.preventDefault();
    this.taskNumber++;
    this.input = document.querySelector("#task");
    TaskList.createElements(this.taskNumber, this.input.value);
    this.storeToLocalStorage(this.taskNumber, this.input.value);
    this.input.value = "";
  }

  static createElements(taskNumber, inputValue) {
    //create <li> element in DOM
    const liTaskElement = document.createElement("li");
    liTaskElement.classList.add("collection-item");
    liTaskElement.dataset.key = `${taskNumber}`;
    liTaskElement.innerText = `${inputValue}`;
    //create <a> element in DOM
    const linkTaskElement = document.createElement("a");
    linkTaskElement.classList.add("delete-item", "secondary-content");
    linkTaskElement.setAttribute("href", "#");
    //create <i> element in DOM
    const deleteIconElement = document.createElement("i");
    deleteIconElement.classList.add("fa", "fa-remove");
    deleteIconElement.dataset.key = `${taskNumber}`;
    //append child element to parent element
    document.querySelector(".collection").appendChild(liTaskElement);
    liTaskElement.appendChild(linkTaskElement);
    linkTaskElement.appendChild(deleteIconElement);
  }

  removeTask(e) {
    e.preventDefault();
    if (e.target.classList.contains("fa-remove")) {
      const indexOfItem = e.target.dataset.key;
      document.querySelector(`li[data-key="${indexOfItem}"]`).remove();
      this.taskNumber--;
      this.removeFromLocalStorage(indexOfItem);
    }
  }

  clearTasks(e) {
    e.preventDefault();
    document
      .querySelectorAll(".collection-item")
      .forEach(task => task.remove());
    this.taskNumber = 0;
    localStorage.clear();
  }

  filterTasks(e) {
    e.preventDefault();
    function filterIndex(filterValue){
    document.querySelectorAll("li").forEach(element => {
      console.log(
        element.textContent
          .toLowerCase()
          .indexOf(filterValue.value.toLowerCase())
      );
      element.style.display =
        element.textContent
          .toLowerCase()
          .indexOf(filterValue.value.toLowerCase()) != -1
          ? "block"
          : "none";
    });
  }
  filterIndex(document.querySelector("#filter"));
  }

  storeToLocalStorage(taskKey, taskInput) {
    taskKey = JSON.stringify(taskKey);
    taskInput = JSON.stringify(taskInput);
    localStorage.setItem(taskKey, taskInput);
  }

  removeFromLocalStorage(item) {
    localStorage.removeItem(`${item}`);
  }

  getItemsFromLocalStorage() {
    if (localStorage.length === 0) return;
    Object.keys(localStorage).forEach(function(key) {
      const localStorageValue = JSON.parse(localStorage.getItem(key));
      const localStorageKey = key;
      TaskList.createElements(localStorageKey, localStorageValue);
    });
  }
}

const newTaskList = new TaskList();
