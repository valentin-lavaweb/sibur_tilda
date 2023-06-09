<script>
import { useGameStore } from '@/stores/interface-interaction.js';

export default {
  name: "login",
  data() {
    let interaction = useGameStore();
    return{
        login: null,
        password: null,
        interaction: interaction,
    }
  },
  components:{

  },
  methods: {
    async authAdmin(){
        try{
            await this.interaction.login(this.login, this.password)
        }
        catch(e){
            console.error(e);
            return alert(e.message);
        }
    }
  },
  mounted() {

  },
  computed:{
    
  },
  watch:{

  },
};
</script>


<template>
    <div class="login-container">
        <div class="login-block">
            <div class="login-header">
                СИБУР Awards/Вход в админ панель
            </div>
            <form>
                <label for="login">Login</label>
                <input type="text" placeholder="введите логин" id="login"
                    v-model="login">

                <label for="password">Password</label>
                <input type="password" placeholder="введите пароль" id="password"
                    v-model="password">

                <div class="container-btn">
                    <button @click.prevent="authAdmin()">
                        войти
                    </button>
                </div>
            </form>
        </div>
  </div>
</template>

<style scoped>

.login-container{
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 50;
}
.login-block{
    width: 625px;
    min-height: 200px;
    height: fit-content;
    background: var(--white);
    flex-direction: column;
    justify-content: flex-start;
    border-radius: 20px;
    overflow: hidden;
}
.login-header{
    width: 100%;
    height: 100px;
    background-color: var(--nipigasColorMain);
    padding: 0 0 0 40px;
    align-items: flex-start;
    font-size: 24px;
    font-weight: 700;
}

form{
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    height: fit-content;
    width: 300px;
}
form *{
    font-weight: 700;
    color: var(--nipigasColorMain);
    letter-spacing: 0.5px;
    outline: none;
    border: none;
}

label{
    display: block;
    margin-top: 30px;
    font-size: 16px;
    font-weight: 500;
}
input{
    display: block;
    height: 50px;
    width: 100%;
    background-color: rgba(255,255,255,0.07);
    border: 1px solid var(--nipigasColorMain);
    border-radius: 10px;
    padding: 0 30px 0 15px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
}
::placeholder{
    color: rgba(188, 188, 188, 1);
}
.container-btn{
    width: 100%;
    margin: 20px 0 40px 0;
}
button{
    position: relative;
    display: flex;
    background-color: var(--nipigasColorMain);
    color: var(--white);
    padding: 5px 40px;
    font-size: 14px;
    font-weight: 400;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.25s ease;
}
button:hover{
    background-color: var(--nipigasColorMain-hover);
}


@media (max-width: 1440px) {
}
@media (max-width: 1024px) {

}
@media (max-width: 980px) {

}
@media (max-width: 768px) {

}
@media (max-width: 640px) {
    .login-block{
        width: 90vw;
    }
    .login-header{
        font-size: 18px;
        padding: 0 20px;
    }
}
@media (max-width: 480px) {

}
@media (max-width: 420px) {
    form{
        width: 250px;
    }
}
@media (max-width: 380px) {

}
</style>