/**
 * Created by ZhuGongpu on 16/8/25.
 */

const getCurrentDate = () => {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

module.exports = {
    getCurrentDate
};