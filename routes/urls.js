const express = require("express");
const router = express.Router();
const URL = require("../models/URL"); // Make sure this path is correct

// @route    GET /api/urls
// @desc     Get all URLs
// @access   Public
router.get("/", async (req, res) => {
  try {
    const urls = await URL.find().populate('createdBy', 'name email'); // Optional: populate user info
    res.json(urls);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route    POST /api/urls
// @desc     Create a new URL entry
// @access   Public
router.post("/", async (req, res) => {
  const { company, url, notes, createdBy } = req.body;

  try {
    const newUrl = new URL({
      company,
      url,
      notes,
      createdBy
    });

    await newUrl.save();
    res.status(201).json(newUrl);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.put("/:id", async (req, res) => {
  const { company, url, urlStatus, crawlingStatus, notes } = req.body;

  try {
    // Build update object
    const updateFields = {
      company,
      url,
      urlStatus,
      crawlingStatus,
      notes
    };

    // Find and update the URL
    const updatedUrl = await URL.findByIdAndUpdate(
      req.params.id,
      updateFields,
      {
        new: true, // return updated doc
        runValidators: true // validate before update
      }
    );

    if (!updatedUrl) {
      return res.status(404).json({ msg: "URL not found" });
    }

    res.json(updatedUrl);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route    POST /api/urls/:id/crawl
// @desc     Trigger crawling for a specific URL entry
// @access   Public
router.post("/:id/crawl", async (req, res) => {
  try {
    const urlDoc = await URL.findById(req.params.id);

    if (!urlDoc) {
      return res.status(404).json({ msg: "URL not found" });
    }

    // Simulate crawl start
    urlDoc.crawlingStatus = 'in-progress';
    await urlDoc.save();

    // Later, you can integrate actual crawling logic here
    // For now, simulate completion after delay
    setTimeout(async () => {
      urlDoc.crawlingStatus = 'completed';
      urlDoc.lastCrawledAt = new Date();
      await urlDoc.save();
      console.log(`Finished crawling ${urlDoc.url}`);
    }, 2000); // Simulate async crawl taking 2 seconds

    res.json({
      msg: `Crawling started for ${urlDoc.url}`,
      url: urlDoc
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route    DELETE /api/urls/:id
// @desc     Delete a URL by ID
// @access   Public
router.delete("/:id", async (req, res) => {
  try {
    const urlDoc = await URL.findById(req.params.id);

    if (!urlDoc) {
      return res.status(404).json({ msg: "URL not found" });
    }

    await URL.findByIdAndDelete(req.params.id);

    res.json({ msg: "URL removed successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;