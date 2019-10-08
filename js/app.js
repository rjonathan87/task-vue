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

            // revisar campo vacío
            if (valueTask != '') {
                this.AddTask(valueTask.trim());
            }
        },
        AddTask(taskAdd, status = false){
            this.taskArr.push({
                "name": taskAdd,
                "status": status
            });
            
            //actualiza el localStorage
            this.addDB();
            // this.listTask();
            this.task = '';
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
        deleteTask(index){
            let taskName = this.taskArr[index].name;
            if(confirm(`Desea eliminar ${taskName}?`)){
                this.taskArr.splice(index,1);
                this.addDB();
            }
        },
        editTask(index){
            this.taskArr[index].status = !this.taskArr[index].status;
            this.addDB();
        },
        setFocus(){
            document.getElementById("task").focus();
        }
    },
    mounted() {
        this.setFocus();
        this.checkDB();
        // this.listTask();
    }
});