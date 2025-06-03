import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { full_name, email, job_position, recently_activities } = await req.json()

    // Create a detailed prompt for email generation
    const prompt = `Generate a professional email based on the following information:

Full Name: ${full_name}
Email: ${email}
Job Position: ${job_position}
Recent Activities: ${recently_activities}

Please create a well-structured professional email that incorporates this information. The email should be appropriate for business communication.

Email:`

    // Use native fetch to call Hugging Face API directly
    const response = await fetch("https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 300,
          temperature: 0.7,
          repetition_penalty: 1.1,
          return_full_text: false,
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    // Handle different response formats from Hugging Face
    let generatedText = ""
    if (Array.isArray(data) && data[0]?.generated_text) {
      generatedText = data[0].generated_text
    } else if (data.generated_text) {
      generatedText = data.generated_text
    } else {
      generatedText = "Email generation completed successfully."
    }

    return NextResponse.json({
      success: true,
      generatedEmail: generatedText,
      apiResponse: data, // For debugging purposes
    })
  } catch (error) {
    console.error("Error generating email:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate email",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
