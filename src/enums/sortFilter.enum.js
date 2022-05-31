class SortFilterEnum {
    enums = {
        FRESH_IDEAS: 'Свежие',
        DISCUSSED_IDEAS: 'Обсуждаемые',
        LIKED_IDEAS: 'Залайканные',
        NEGATIVE_IDEAS: 'Отрицательные'
    }

    arraySortEnums() {
        return  Object.values(this.enums).join(", ").split(", ");
    }
}

module.exports.SortFilterEnum = new SortFilterEnum();
