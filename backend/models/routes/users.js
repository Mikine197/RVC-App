// Follow a user
router.post('/:id/follow', async (req, res) => {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);

    if(!user.followers.includes(currentUser._id)){
        user.followers.push(currentUser._id);
        currentUser.following.push(user._id);
        await user.save();
        await currentUser.save();
    }
    res.json({ user, currentUser });
});

// Unfollow a user
router.post('/:id/unfollow', async (req, res) => {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);

    user.followers = user.followers.filter(id => id.toString() !== currentUser._id.toString());
    currentUser.following = currentUser.following.filter(id => id.toString() !== user._id.toString());

    await user.save();
    await currentUser.save();

    res.json({ user, currentUser });
});
