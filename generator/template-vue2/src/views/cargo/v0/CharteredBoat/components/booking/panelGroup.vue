<template>
  <el-row :gutter="40" class="panel-group">
    <el-col v-for="(panel, index) in data" :key="index" :xs="8" :sm="8" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="onClickBookingPanel()">
        <!--        <div class="card-panel-icon-wrapper icon-people">-->
        <!--          <svg-icon icon-class="TEU" class-name="card-panel-icon" />-->
        <!--        </div>-->
        <div class="card-panel-description">
          <div class="card-panel-text">
            <span :style="{color:panel.color}">{{ panel.statusName }}</span>
          </div>
          <count-to :start-val="0" :end-val="Number(panel.count)" :duration="1200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <!--    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">-->
    <!--      <div class="card-panel" @click="onClickBookingPanel()">-->
    <!--        &lt;!&ndash;        <div class="card-panel-icon-wrapper icon-message">&ndash;&gt;-->
    <!--        &lt;!&ndash;          <svg-icon icon-class="message" class-name="card-panel-icon" />&ndash;&gt;-->
    <!--        &lt;!&ndash;        </div>&ndash;&gt;-->
    <!--        <div class="card-panel-description">-->
    <!--          <div class="card-panel-text">-->
    <!--            被驳回-->
    <!--          </div>-->
    <!--          <count-to :start-val="0" :end-val="127" :duration="1400" class="card-panel-num"/>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </el-col>-->
    <!--    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">-->
    <!--      <div class="card-panel" @click="onClickBookingPanel()">-->
    <!--        &lt;!&ndash;        <div class="card-panel-icon-wrapper icon-money">&ndash;&gt;-->
    <!--        &lt;!&ndash;          <svg-icon icon-class="money" class-name="card-panel-icon" />&ndash;&gt;-->
    <!--        &lt;!&ndash;        </div>&ndash;&gt;-->
    <!--        <div class="card-panel-description">-->
    <!--          <div class="card-panel-text">-->
    <!--            已通过-->
    <!--          </div>-->
    <!--          <count-to :start-val="0" :end-val="4252000" :duration="960" class="card-panel-num"/>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </el-col>-->
    <!--    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">-->
    <!--      <div class="card-panel" @click="onClickBookingPanel()">-->
    <!--        &lt;!&ndash;        <div class="card-panel-icon-wrapper icon-shopping">&ndash;&gt;-->
    <!--        &lt;!&ndash;          <svg-icon icon-class="peoples" class-name="card-panel-icon" />&ndash;&gt;-->
    <!--        &lt;!&ndash;        </div>&ndash;&gt;-->
    <!--        <div class="card-panel-description">-->
    <!--          <div class="card-panel-text">-->
    <!--            草稿箱-->
    <!--          </div>-->
    <!--          <count-to :start-val="0" :end-val="25" :duration="260" class="card-panel-num"/>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </el-col>-->
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  props: {
    data: { type: Array, default: () => [] }
  },
  methods: {
    onClickBookingPanel(type) {
      // todo-yxs at 2021/6/23 Desc:
      // this.$emit('onClickBookingPanel', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 20px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      text-align: center;
      //float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 16px;
      }
    }
  }
}
</style>
