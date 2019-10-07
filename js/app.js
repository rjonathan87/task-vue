let app = new Vue({
    el: "#app",
    data: {
        task: "",
        taskArr: []
    },
    methods: {
        btnAddTask(e){
            e.preventDefault();
            let valueTask = e.target.form[0].value;
            this.AddTask(valueTask);
        },
        AddTask(taskAdd, status = false){
            this.taskArr.push({
                "name": taskAdd,
                "status": status
            });
            
            //actualiza el localStorage
            this.addDB();
            document.getElementById("task").value = '';
        },

        // Agrega datos en el localStorage
        addDB(){
            localStorage.setItem('localDB', JSON.stringify(this.taskArr));
        },

        // Sirve para llenar el array después de una actualización,
        // solo si el localStorage tiene datos
        // Llena el array si el localStorage tiene datos
        checkDB(){
            if (localStorage.getItem('localDB') != null) {
                // console.log("con datos");
                let taskList = JSON.parse(localStorage.getItem('localDB'));
                
                taskList.forEach(element => {
                    this.AddTask(element.name, element.status);
                });
            }else{
                this.taskArr = [];
            }
        },
        setFocus(){
            document.getElementById("task").focus();
        }
    },
    mounted() {
        this.setFocus();
        this.checkDB();
    }
})