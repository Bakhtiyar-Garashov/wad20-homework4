<template>
    <header>
        <nav>
            <div class="logo-container">
                <router-link :to="{name: 'posts'}">
                    <img src="../assets/logo.png" alt="postIt">
                </router-link>
            </div>
            <div class="search-container">
                <input type="text" name="search">
                <button type="button">Search</button>
            </div>
            <div class="avatar-container">
                <img class="avatar" :src="user.avatar" @click="toggleDropDown">
                <div class="drop-down-container" v-show="dropdownVisible">
                    <span id="user-name">{{user | profileName}}</span>
                    <span id="user-email">{{user.email}}</span>
                    <span class="separator"></span>
                    <span v-for="item in menu" :key="item.name">
                        <router-link :to="{name: item.name}">{{item.label}}</router-link>
                    </span>
                    <span class="separator"></span>
                    <span>
                        <a href="#" @click="logout">Log Out</a>
                    </span>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>

    export default {
        name: 'Header',
        data: function () {
            return {
                dropdownVisible: false,
                menuItems: [
                    {
                        name: 'posts',
                        label: 'Posts'
                    },
                    {
                        name: 'profiles',
                        label: 'Profiles'
                    }
                ]
            }
        },
        computed: {
            menu: function() {
                let current = this.$router.currentRoute;

                return this.menuItems.filter(item => item.name !== current.name)
            },
            user: function () {
                return this.$store.getters.user
            }
        },
        methods: {
            toggleDropDown: function () {
                this.dropdownVisible = !this.dropdownVisible
            },
            logout: function () {
                this.$store.dispatch('SET_USER', null);
                this.$router.push({name: 'login'});
            }
        },
        filters: {
            profileName: function (profile) {
                return profile.firstname + ' ' + profile.lastname;
            }
        }
    }
</script>
<style scoped>
    header {
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 1;
    }

    header:hover {
        box-shadow: 0 -20px 30px #4d4d4d;
    }

    nav {
        display: flex;
        background-color: #ffffff;
        align-items: center;
    }

    nav div {
        height: 30px;
        flex-grow: 4;
        padding: 10px;
    }

    nav div img {
        height: 100%;
        width: 30px;
        margin-left: 15px;
        border-radius: 100%;
        object-fit: cover;
        object-position: top center;
        cursor: pointer;
    }

    nav div.search-container > input {
        box-sizing: border-box;
        height: 30px;
        width: 80%;
        margin: 0;
        padding: 5px;
        border: 1px solid #e0e0e0;
        text-align: left;
    }

    nav div.search-container > button {
        height: 30px;
        width: 20%;
        margin: 0;
        padding: 5px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }

    nav div.avatar-container {
        margin-right: 15px;
        text-align: right;
    }

    .drop-down-container {
        position: absolute;
        min-width: 150px;
        height: auto;
        background-color: #ffffff;
        padding: 10px;
        right: 0;
        top: 50px;
        text-align: left;
    }

    .drop-down-container span {
        display: block;
    }

    .drop-down-container span.separator {
        border-bottom: 1px solid #d7d7d7;
        margin: 10px -10px;
    }


</style>
