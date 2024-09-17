<script setup lang="ts">
import { computed, ref } from 'vue';


const emit = defineEmits(['update:selected'])
const props = defineProps({
    selected: String,
    resetItem: String,
    placeholder: String,
    variantSize: Boolean,
    variantStyle: Boolean,
    enablePanel: Boolean,
    options: Array,
})

const visible = ref(false)
const togglePanel = () => {
    visible.value = !visible.value
}

const dataOptions = computed(()=>{
    return props.options?.filter(i => i !== null).map( i => i?.toString())
})

const selectedItem = (item) => {
    togglePanel()
    emit('update:selected', item)
}
</script>
<template>
    <div class="UIbtn-container">
        <button 
            @click="togglePanel()"
            class="UIbtn default normal"
            :class="{secondary: props.variantStyle, large: props.variantSize}"
            type="button" 
            >
            <slot/>
        </button>
        
        <Teleport to="body">
            <div class="backdrop" v-if="visible && props.enablePanel" @click="togglePanel()"></div>
        </Teleport>
        <transition name="openPopup" mode="out-in">
            <div 
                v-if="visible && props.enablePanel"
                class="panel default" 
                :class="{secondary: props.variantStyle}"
                >
                <span
                    class="option_item"
                    @click="selectedItem(undefined)"
                >
                {{ props.resetItem }}
                </span>
                <span 
                    v-for="(item, key) in dataOptions" 
                    :key="key"
                    class="option_item"
                    @click="selectedItem(item)"
                >
                {{ props.placeholder }} {{item}}
                </span>
            </div>
        </transition>
    </div>
</template>
<style lang="css" scoped>
.UIbtn-container{
    position: relative;
    @media (max-width: 480px){
        width: 100%;
    }
}
.UIbtn{
    position: relative;
    height: 54px;
    border: none;
    outline: none;
    padding: 0 30px;
    border-radius: 5px;
    white-space: nowrap;
    font-size: 20px;
    font-weight: 700;
    text-align: left;
    color: var(--white);
    transition: all 0.25s ease;
    cursor: pointer;

    @media (max-width: 1440px){
        height: 3.75vw;
        padding: 0 2.08vw;
        font-size: 1.39vw;
    }
    @media (max-width: 1024px){
        height: 40px;
        padding: 0 20px;
        font-size: 18px;
    }
}

.UIbtn.normal{
    min-width: 166px;
    @media (max-width: 1440px){
        min-width: 11.53vw;
    }
    @media (max-width: 1024px){
        min-width: unset;
    }
    @media (max-width: 480px){
        min-width: 100%;
    }
}
.UIbtn.large{
    min-width: 258px;
    @media (max-width: 1440px){
        min-width: 17.92vw;
    }
    @media (max-width: 1024px){
        min-width: unset;
    }
    @media (max-width: 480px){
        min-width: 100%;
    }
}

.UIbtn.default{
    background-color: var(--nipigasColorMain);
}
.UIbtn.default:hover{
    background-color: var(--nipigasColorMain-hover);
}
.UIbtn.default:active{
    background-color: var(--nipigasColorMain);
}
.UIbtn.secondary{
    background-color: var(--nipigasColorAdditional);
}
.UIbtn.secondary:hover{
    background-color: var(--nipigasColorAdditional-hover);
}
.UIbtn.secondary:active{
    background-color: var(--nipigasColorAdditional);
}

.backdrop{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vw;
    z-index: 1;
}

.panel{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px 0px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    border-radius: 5px;
    transform: translateY(calc(100% + 5px));
    z-index: 2;

    @media (max-width: 1440px){
        padding: 0.69vw 0px;
        gap: 0.69vw;
    }

    @media (max-width: 1024px){
        padding: 8px 0px;
        gap: 8px;
    }
}
.panel.default{
    background-color: var(--nipigasColorMain);
}
.panel.secondary{
    background-color: var(--nipigasColorAdditional);
}

.option_item{
    width: calc(100% - 30px);
    padding: 2px 15px;
    font-size: 15px;
    font-weight: 700;
    border-radius: 5px;
    user-select: none;
    cursor: pointer;
    transition: all 0.25s ease;

    @media (max-width: 1440px){
        width: calc(100% - 2.08vw);
        padding: 0.14vw 1.04vw;
        font-size: 1.04vw;
    }
    @media (max-width: 1024px){
        width: calc(100% - 16px);
        padding: 2px 12px;
        font-size: 14px;
    }
}

.panel.default .option_item:hover{
    background-color: var(--nipigasColorMain-hover);
}
.panel.secondary .option_item:hover{
    background-color: rgb(255, 78, 65);
}
.panel.default .option_item:active{
    background-color: var(--nipigasColorMain);
}
.panel.secondary .option_item:active{
    background-color: var(--nipigasColorAdditional);
}
</style>