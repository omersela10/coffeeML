
def coffee_match_user_choices(predict, user_choices):
    coffee_type = user_choices["coffee_type"] 
    type_of_cup = str(user_choices["type_of_cup"]).lower()
    is_match = True
    if coffee_type != predict["coffee_type"]:
        is_match = False
    if type_of_cup != predict["type_of_cup"]:
        is_match = False
    return is_match

def coffee_quality(predict):
    coffee_type = predict["coffee_type"]
    crema = predict["crema"]
    served_way = predict["served_way"]
    quality = 0

    if coffee_type == "black":
        if served_way =="true":
            quality = 3
        else:
            quality = 1
    elif coffee_type == "cappuccino":
        if crema == "true":
            quality = quality + 2
        if served_way == "true":
            quality = quality + 1
        if quality == 0:
            quality = 1
    elif coffee_type == "espresso":
        if crema == "true":
            quality = quality + 2
        if served_way == "true":
            quality = quality + 1
        if quality == 0:
            quality = 1

    return quality
