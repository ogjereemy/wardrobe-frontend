<script setup>
import WelcomeItem from './WelcomeItem.vue'
// import ClothingIcon from './icons/IconClothing.vue'
// import OrganizeIcon from './icons/IconOrganize.vue'
// import CategoriesIcon from './icons/IconCategories.vue'
// import CommunityIcon from './icons/IconCommunity.vue'
// import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <div class="container text-center my-5">
    <div class="welcome-header mb-4">
      <h1 class="fw-bold">Welcome to the Wardrobe Management System</h1>
      <p class="lead">Organize your wardrobe with ease and style!</p>
    </div>
    <div class="row justify-content-center">
      <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
        <WelcomeItem class="card shadow-sm p-3">
          <template #icon>
            <ClothingIcon />
          </template>
          <template #heading>Manage Your Wardrobe</template>

          Keep track of your wardrobe with ease. Our app allows you to add, edit, and delete
          clothing items, making it simple to organize everything in one place.
        </WelcomeItem>
      </div>

      <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
        <WelcomeItem class="card shadow-sm p-3">
          <template #icon>
            <OrganizeIcon />
          </template>
          <template #heading>Organize by Categories</template>

          Organize your clothing into categories like tops, bottoms, shoes, and accessories. Use the
          filter and search features to find specific items quickly.
        </WelcomeItem>
      </div>

      <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
        <WelcomeItem class="card shadow-sm p-3">
          <template #icon>
            <CategoriesIcon />
          </template>
          <template #heading>Custom Filters</template>

          Tailor your wardrobe management experience with custom filters based on item type, color,
          and other attributes. Stay organized by easily sorting your items.
        </WelcomeItem>
      </div>

      <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
        <WelcomeItem class="card shadow-sm p-3">
          <template #icon>
            <CommunityIcon />
          </template>
          <template #heading>Connect with the Community</template>

          Join our community to share style tips and wardrobe management ideas with others. Ask
          questions, share your experiences, and get inspired.
        </WelcomeItem>
      </div>

      <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
        <WelcomeItem class="card shadow-sm p-3">
          <template #icon>
            <SupportIcon />
          </template>
          <template #heading>Support Our Project</template>

          Help us improve the Wardrobe Management System by providing feedback or becoming a
          contributor. Together, we can make wardrobe organization even easier!
        </WelcomeItem>
      </div>
    </div>
  </div>
</template>

<style scoped>
.welcome-header h1 {
  font-size: 2.5rem;
  color: #333;
}

.welcome-header p {
  font-size: 1.25rem;
  color: #555;
}

.card {
  border-radius: 0.75rem;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Icon styling */
.card [slot='icon'] {
  font-size: 2rem;
  margin-bottom: 15px;
}
</style>
