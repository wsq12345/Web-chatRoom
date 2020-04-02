<template>
    <div>
         <div class="emoji-content">
              <div class="emoji-tabs">
                <div class="emoji-container" ref="emoji">
                  <div class="emoji-block" :style="{width: Math.ceil(emoji.people.length / 5) * 48 + 'px'}">
                    <span v-for="(item, index) in emoji.people" :key="index" @click="getEmoji(index)">{{item}}</span>
                  </div>
                  <!-- <div class="emoji-block" :style="{width: Math.ceil(emoji.nature.length / 5) * 48 + 'px'}">
                    <span v-for="(item, index) in emoji.nature" :key="index" @click="getEmoji(index)">{{item}}</span>
                  </div>
                  <div class="emoji-block" :style="{width: Math.ceil(emoji.items.length / 5) * 48 + 'px'}">
                    <span v-for="(item, index) in emoji.items" :key="index" @click="getEmoji(index)">{{item}}</span>
                  </div>
                  <div class="emoji-block" :style="{width: Math.ceil(emoji.place.length / 5) * 48 + 'px'}">
                    <span v-for="(item, index) in emoji.place" :key="index" @click="getEmoji(index)">{{item}}</span>
                  </div>
                  <div class="emoji-block" :style="{width: Math.ceil(emoji.single.length / 5) * 48 + 'px'}">
                    <span v-for="(item, index) in emoji.single" :key="index" @click="getEmoji(index)">{{item}}</span>
                  </div> -->
                </div>
              </div>
            </div>
    </div>
</template>

<script>
import emoji from '../utils/emoji'
// import Bus from '../utils/bus'
export default {
    data(){
        return{
            emoji:emoji
        }
    },
    methods:{
        getEmoji(index){
            this.$emit('addEmoji',this.emoji.people[index]);
        }
    }
}
</script>

<style lang="less" scoped>
     .emoji-content {
        margin: 50px;
        width: 375px;
        height: 210px;
        border-top: 1px solid #f3f3f3;
        overflow: hidden;
        background-color: #fff;

        .emoji-container {
          width: 10000px;
        }

        .emoji-tabs {
          overflow: auto;

          .emoji-block {
            width: 1170px;
            height: 200px;
            float: left;

            span {
              display: inline-block;
              cursor: pointer;
              font-size: 26px;
              min-width: 48px;
              line-height: 39px;
              text-align: center;
              list-style: none;
            }
          }
        }
    }
</style>