from app.models.flashcard import Flashcard

def bulk_save_objects(data, deck_id, db):
    flashcards = [
        Flashcard(
            front=card["question"],
            back=card["answer"],
            deck_id=deck_id
        )
        for card in data["flashcards"]
    ]

    db.add_all(flashcards)
    db.commit()
    return "Success!"

