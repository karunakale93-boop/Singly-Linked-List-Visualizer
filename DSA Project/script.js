class Node 
{
    constructor(data) 
{
        this.data = data;
        this.next = null;
    }
}
class SinglyLinkedList 
{
    constructor() 
{
        this.head = null;
}
    insertAtBeginning(data) 
    {
        let newNode = new Node(data);
        newNode.next = this.head;
        this.head = newNode;
    }
    insertAtEnd(data) 
    {
        let newNode = new Node(data);
        if (!this.head)
    {
            this.head = newNode;
            return;
    }
        let temp = this.head;
        while (temp.next) 
    {
        temp = temp.next;
    }
        temp.next = newNode;
    }
    insertAtPosition(data, pos) 
{
        let newNode = new Node(data);
        if (pos === 0) 
        {
            newNode.next = this.head;
            this.head = newNode;
            return true;
        }
        let temp = this.head;
        let i = 0;
        while (temp && i < pos - 1) 
        {
            temp = temp.next;
            i++;
        }
        if (!temp) return false;
        newNode.next = temp.next;
        temp.next = newNode;
        return true;
    }
    deleteAtPosition(pos) 
    {
        if (!this.head) return false;
        if (pos === 0)
        {
            this.head = this.head.next;
            return true;
        }
        let temp = this.head;
        let i = 0;
        while (temp.next && i < pos - 1) 
        {
            temp = temp.next;
            i++;
        }
        if (!temp.next) return false;
        temp.next = temp.next.next;
        return true;
    }
    search(data) 
    {
        let temp = this.head;
        let pos = 0;
        while (temp) 
        {
            if (temp.data == data) return pos;
            temp = temp.next;
            pos++;
        }
        return -1;
    }
}
let list = new SinglyLinkedList();
function getValue() 
{
    return document.getElementById("value").value;
}
function getPosition() 
{
    return parseInt(document.getElementById("position").value);
}
function showMessage(msg) 
{
    document.getElementById("output").innerText = msg;
}
function isInvalid(val) 
{
    return val === "" || isNaN(val);
}
function renderList() 
{
    let listDiv = document.getElementById("list");
    let html = "";
    let temp = list.head;
    while (temp !== null) 
    {
        html += `
        <div class="node-box">
            <div class="node">${temp.data}</div>
            <div class="arrow">→</div>
        </div>`;
        temp = temp.next;
    }
    html += `
    <div class="node-box">
        <div class="node null-node">NULL</div>
    </div>`;
    listDiv.innerHTML = html;
}
function highlightNode(index) 
{
    renderList();
    let nodes = document.querySelectorAll("#list .node");
    if (nodes[index]) 
    {
        nodes[index].style.background = "#4caf50";
        nodes[index].style.transform = "scale(1.1)";
    }
}
function insertStart() 
{
    let val = getValue();
    if (isInvalid(val)) return showMessage("Invalid input");
    list.insertAtBeginning(parseInt(val));
    showMessage("Inserted at beginning");
    renderList();
}
function insertEnd() 
{
    let val = getValue();
    if (isInvalid(val)) return showMessage("Invalid input");
    list.insertAtEnd(parseInt(val));
    showMessage("Inserted at end");
    renderList();
}
function insertAtPos() 
{
    let val = getValue();
    let pos = getPosition();
    if (isInvalid(val) || isNaN(pos) || pos < 0)
        return showMessage("Invalid input");
    let res = list.insertAtPosition(parseInt(val), pos);
    showMessage(res ? "Inserted at position " + pos : "Invalid position");
    renderList();
}
function deleteNode() 
{
    let pos = getPosition();
    if (isNaN(pos) || pos < 0)
        return showMessage("Invalid position");
    let res = list.deleteAtPosition(pos);
    showMessage(res ? "Deleted at position " + pos : "Invalid position");
    renderList();
}
function searchNode() 
{
    let val = getValue();
    if (isInvalid(val)) return showMessage("Invalid input");
    let pos = list.search(parseInt(val));
    if (pos !== -1) 
    {
        showMessage("Found at position " + pos);
        highlightNode(pos);
    } else 
    {
        showMessage("Not found");
        renderList();
    }
}
renderList();