<template lang="html">
  <div class="Explore">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :md="20">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="n in 10" :key="n">
            <el-card class="resource-card">
              <p slot="header">
                <i class="fa fa-clipboard"></i>
                <span>Titulo</span>
                <i style="float: right;" class="fa fa-gear"></i>
              </p>
                    
              <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, alias harum? Reprehenderit excepturi, quaerat perferendis modi fugit commodi atque debitis ut. Sit excepturi aspernatur libero distinctio nobis ducimus vitae quod.
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
};
</script>

<style>
.Explore {
  padding: 20px;
  height: calc(100vh - 60px);
}

.resource-card {
  margin: 15px 0;
  max-width: 350px;
}
</style>
