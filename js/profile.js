$(() => {
   handleEdit()
})

const handleEdit = () => {
    $(".edit-button").click(function() {
        const element = $(this).attr('class').split(' ')[0]

        if (isOnEdit(element)) {
            $(this).children('i').removeClass('fa-save').addClass('fa-edit')
            $(`input.${element}, select.${element}`).first().prop('disabled', true)
        }
        else {
            $(this).children('i').removeClass('fa-edit').addClass('fa-save')
            $(`input.${element}, select.${element}`).first().prop('disabled', false)
        }
    })
}

const isOnEdit = (element) => {
    const classes = $(`.${element}`).children('i').last().prop('class')
    return classes.split(' ')[1] == 'fa-save'
}